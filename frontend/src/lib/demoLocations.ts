/**
 * Pre-resolved locations offered as one-click starting points on the MapPage.
 *
 * Every entry MUST match a cached `Location` row to within
 * `COORDINATE_TOLERANCE` (0.0001 deg, ~11 m) — see `resolveLocation` in
 * `backend/src/services/locationService.ts`, which looks the cache up by
 * coordinate proximity rather than by id. Rounding these values, or replacing
 * them with geocoded approximations, turns a cache hit into a fresh Solar API
 * call: the exact thing this list exists to avoid.
 */

/** A cached location a visitor can jump straight into. */
export type DemoLocation = {
  /** i18n key under `map.demoLocations.items`. */
  id: string
  lat: number
  lng: number
}

export const DEMO_LOCATIONS: DemoLocation[] = [
  { id: 'klangValleyHigh', lat: 2.9900349, lng: 101.4418573 },
  { id: 'klangValleyWest', lat: 2.985298550865087, lng: 101.4046323685198 },
  { id: 'klangValleyEast', lat: 3.0266291, lng: 101.5829716 },
  { id: 'sungaiPetani', lat: 6.098453399999999, lng: 100.341824 }
]
