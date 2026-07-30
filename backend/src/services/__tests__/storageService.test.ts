import { beforeEach, describe, expect, it, vi } from 'vitest'

const s3SendMock = vi.hoisted(() => vi.fn())
const createPresignedUrlMock = vi.hoisted(() => vi.fn())

vi.mock('../../config/env.js', () => ({
  env: { R2_BUCKET: 'solar-assets' }
}))

vi.mock('../../config/r2.js', () => ({
  r2: { send: (...args: unknown[]) => s3SendMock(...args) }
}))

vi.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: (...args: unknown[]) => createPresignedUrlMock(...args)
}))

import { downloadFromStorage, getSignedUrl, uploadToStorage } from '../storageService.js'

const STORAGE_PATH = 'locations/10f3f3f6-112f-47bd-b121-8bfa7b41e1f1/monthly_flux.tif'
const R2_BUCKET = 'solar-assets'

describe('storageService', () => {
  beforeEach(() => {
    s3SendMock.mockReset()
    createPresignedUrlMock.mockReset()
  })

  it('uploads the exact storage path, configured bucket, and content type', async () => {
    const buffer = Buffer.from('solar-data')
    s3SendMock.mockResolvedValue({})

    await uploadToStorage(STORAGE_PATH, buffer, 'image/tiff')

    expect(s3SendMock).toHaveBeenCalledOnce()
    expect(s3SendMock.mock.calls[0]?.[0]).toMatchObject({
      input: { Bucket: R2_BUCKET, Key: STORAGE_PATH, Body: buffer, ContentType: 'image/tiff' }
    })
  })

  it('downloads object bytes as an ArrayBuffer using the exact storage path', async () => {
    const bytes = new Uint8Array([1, 2, 3])
    s3SendMock.mockResolvedValue({ Body: { transformToByteArray: vi.fn().mockResolvedValue(bytes) } })

    const result = await downloadFromStorage(STORAGE_PATH)

    expect(s3SendMock).toHaveBeenCalledOnce()
    expect(s3SendMock.mock.calls[0]?.[0]).toMatchObject({ input: { Bucket: R2_BUCKET, Key: STORAGE_PATH } })
    expect(result).toBeInstanceOf(ArrayBuffer)
    expect([...new Uint8Array(result)]).toEqual([1, 2, 3])
  })

  it('creates a private signed URL with the exact storage path and requested lifetime', async () => {
    createPresignedUrlMock.mockResolvedValue('https://signed.example/object')

    const result = await getSignedUrl(STORAGE_PATH, 900)

    expect(result).toBe('https://signed.example/object')
    expect(createPresignedUrlMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ input: { Bucket: R2_BUCKET, Key: STORAGE_PATH } }),
      { expiresIn: 900 }
    )
  })

  it('uses the existing 3600 second lifetime by default', async () => {
    createPresignedUrlMock.mockResolvedValue('https://signed.example/object')

    await getSignedUrl(STORAGE_PATH)

    expect(createPresignedUrlMock).toHaveBeenCalledWith(expect.anything(), expect.anything(), { expiresIn: 3600 })
  })

  it('wraps upload failures with the existing message shape', async () => {
    s3SendMock.mockRejectedValue(new Error('R2 unavailable'))

    await expect(uploadToStorage(STORAGE_PATH, Buffer.from('solar-data'), 'image/tiff')).rejects.toThrow(
      `Storage upload failed for ${STORAGE_PATH}: R2 unavailable`
    )
  })

  it('wraps download failures with the existing message shape', async () => {
    s3SendMock.mockRejectedValue(new Error('R2 unavailable'))

    await expect(downloadFromStorage(STORAGE_PATH)).rejects.toThrow(
      `Storage download failed for ${STORAGE_PATH}: R2 unavailable`
    )
  })

  it('wraps signed URL failures with the existing message shape', async () => {
    createPresignedUrlMock.mockRejectedValue(new Error('R2 unavailable'))

    await expect(getSignedUrl(STORAGE_PATH)).rejects.toThrow(
      `Failed to create signed URL for ${STORAGE_PATH}: R2 unavailable`
    )
  })
})
