/**
 * Cloudflare R2 storage wrapper for generated Solar API assets.
 *
 * Centralises uploads, downloads, and signed URL creation for the shared
 * GeoTIFF/PNG bucket used by the location pipeline.
 */

import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl as createPresignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from '../config/env.js'
import { r2 } from '../config/r2.js'

/**
 * Uploads a blob to the shared storage bucket, replacing any existing object.
 *
 * @param storagePath - Bucket-relative object path
 * @param buffer - File contents to store
 * @param contentType - MIME type stored with the R2 object
 */
export async function uploadToStorage(storagePath: string, buffer: Buffer, contentType: string): Promise<void> {
  try {
    await r2.send(
      new PutObjectCommand({ Bucket: env.R2_BUCKET, Key: storagePath, Body: buffer, ContentType: contentType })
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Storage upload failed for ${storagePath}: ${message}`)
  }
}

/**
 * Downloads a blob from the shared storage bucket.
 *
 * @param storagePath - Bucket-relative object path
 * @returns Raw object bytes as an ArrayBuffer
 */
export async function downloadFromStorage(storagePath: string): Promise<ArrayBuffer> {
  try {
    const response = await r2.send(new GetObjectCommand({ Bucket: env.R2_BUCKET, Key: storagePath }))
    if (!response.Body) throw new Error('R2 response body is missing')

    return new Uint8Array(await response.Body.transformToByteArray()).buffer
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Storage download failed for ${storagePath}: ${message}`)
  }
}

/**
 * Creates a signed read URL for a storage object.
 *
 * @param storagePath - Bucket-relative object path
 * @param expiresIn - URL lifetime in seconds
 * @returns Temporary signed URL for reading the object
 */
export async function getSignedUrl(storagePath: string, expiresIn = 3600): Promise<string> {
  try {
    return await createPresignedUrl(r2, new GetObjectCommand({ Bucket: env.R2_BUCKET, Key: storagePath }), {
      expiresIn
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to create signed URL for ${storagePath}: ${message}`)
  }
}
