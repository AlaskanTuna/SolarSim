/**
 * Demo-location seeding — guarantees the MapPage's one-click suggestions are
 * cache hits, never Solar API calls.
 *
 * Only promotes rows whose R2 objects provably exist: a `ready` row pointing at
 * absent storage fails worse than a clean cache miss. Everything else skips
 * with a log line instead of failing the seed.
 */

import { HeadObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Prisma } from '@prisma/client'

import { prisma } from '../backend/src/config/prisma.ts'

/**
 * MUST stay in sync with `DEMO_LOCATIONS` in `frontend/src/lib/demoLocations.ts`.
 * A drift here silently converts a cache hit into a Solar API call. The list
 * could not be imported directly: the seed runs as plain Node (type stripping)
 * with no path alias, and reaching into `frontend/src` would pull in React
 * types across the workspace boundary.
 */
const DEMO_LOCATIONS = [
  { id: 'klangValleyHigh', lat: 2.9900349, lng: 101.4418573 },
  { id: 'klangValleyWest', lat: 2.985298550865087, lng: 101.4046323685198 },
  { id: 'klangValleyEast', lat: 3.0266291, lng: 101.5829716 },
  { id: 'sungaiPetani', lat: 6.098453399999999, lng: 100.341824 }
] as const

/** Same tolerance `resolveLocation` uses to match a request against the cache. */
const COORDINATE_TOLERANCE = 0.0001

/** R2 objects a ready row must hold before it can serve the demo path. */
const REQUIRED_STORAGE_PATHS = ['rgbImageUrl', 'maskPath', 'monthlyFluxPath'] as const

function createR2Client(): S3Client {
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error('R2_ACCOUNT_ID, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY must be set to probe R2')
  }
  return new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY }
  })
}

async function objectExists(r2: S3Client, bucket: string, key: string): Promise<boolean> {
  try {
    await r2.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
    return true
  } catch (error) {
    if (
      (error as { name?: string }).name === 'NotFound' ||
      (error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode === 404
    ) {
      return false
    }
    throw error
  }
}

/**
 * Seeds the demo `Location` rows that make MapPage suggestions cache hits.
 * Skips — rather than fails — any location that cannot be proven complete.
 *
 * @returns Number of locations verified ready for the demo path
 */
export async function seedDemoLocations(): Promise<number> {
  const bucket = process.env.R2_BUCKET
  if (!bucket) {
    console.log('[Seed] R2_BUCKET is not set — skipping demo location seeding')
    return 0
  }

  let r2: S3Client
  try {
    r2 = createR2Client()
  } catch (error) {
    console.log(`[Seed] Skipping demo location seeding: ${(error as Error).message}`)
    return 0
  }

  let readyCount = 0

  for (const demo of DEMO_LOCATIONS) {
    const label = `${demo.id} (${demo.lat}, ${demo.lng})`

    // Idempotency: no unique constraint on (lat, lng), so dedupe the same way
    // `resolveLocation` looks the cache up — by coordinate proximity.
    const existing = await prisma.location.findFirst({
      where: {
        lat: { gte: demo.lat - COORDINATE_TOLERANCE, lte: demo.lat + COORDINATE_TOLERANCE },
        lng: { gte: demo.lng - COORDINATE_TOLERANCE, lte: demo.lng + COORDINATE_TOLERANCE }
      }
    })

    if (existing?.status === 'ready') {
      console.log(`[Seed] ${label} already cached as ${existing.id} — skipping`)
      readyCount++
      continue
    }
    if (existing) {
      console.log(`[Seed] ${label} exists as ${existing.id} (status: ${existing.status}) — skipping`)
      continue
    }

    // Rows rescued from the retired database are the intended source. A row
    // without its Solar API payload cannot serve the workbench, so it is not
    // seeded — there is no honest value to fabricate for `buildingInsightsJson`.
    const source = await prisma.location.findFirst({
      where: {
        status: 'ready',
        buildingInsightsJson: { not: Prisma.DbNull },
        lat: { gte: demo.lat - COORDINATE_TOLERANCE, lte: demo.lat + COORDINATE_TOLERANCE },
        lng: { gte: demo.lng - COORDINATE_TOLERANCE, lte: demo.lng + COORDINATE_TOLERANCE }
      }
    })

    if (!source) {
      console.log(
        `[Seed] ${label}: no rescued 'ready' Location row with building insights found in this database — skipping ` +
          '(the seed never fabricates Solar API payloads)'
      )
      continue
    }

    const storagePaths = REQUIRED_STORAGE_PATHS.map((field) => source[field]).filter((path): path is string => !!path)
    const missingFields = REQUIRED_STORAGE_PATHS.filter((field) => !source[field])
    if (storagePaths.length < REQUIRED_STORAGE_PATHS.length) {
      console.log(
        `[Seed] ${label}: rescued row ${source.id} is missing storage paths (${missingFields.join(', ')}) — skipping`
      )
      continue
    }

    const missingObjects: string[] = []
    for (const path of storagePaths) {
      if (!(await objectExists(r2, bucket, path))) missingObjects.push(path)
    }
    if (missingObjects.length > 0) {
      console.log(
        `[Seed] ${label}: rescued row ${source.id} points at ${missingObjects.length} missing R2 object(s) ` +
          `(${missingObjects.join(', ')}) — skipping so the cache misses cleanly instead of failing`
      )
      continue
    }

    await prisma.location.create({
      data: {
        lat: demo.lat,
        lng: demo.lng,
        status: source.status,
        imageryQuality: source.imageryQuality,
        // The source query filters for a non-null payload, hence the assertion.
        buildingInsightsJson: source.buildingInsightsJson!,
        rgbImageUrl: source.rgbImageUrl,
        monthlyFluxPath: source.monthlyFluxPath,
        maskPath: source.maskPath,
        annualFluxPath: source.annualFluxPath,
        dsmPath: source.dsmPath
      }
    })
    console.log(`[Seed] ${label}: cloned rescued row ${source.id} — R2 objects verified, marked ready`)
    readyCount++
  }

  return readyCount
}
