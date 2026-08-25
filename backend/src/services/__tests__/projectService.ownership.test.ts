/**
 * Cross-user authorization guard.
 *
 * Row-Level Security was removed with the Supabase migration, so a project is
 * protected only by every service function remembering to scope its query to the
 * caller. That is a convention, not a structure — a new function that forgets
 * would leak silently. These tests pin the convention down: each user-scoped
 * function must look the project up by owner, and must neither read back nor
 * mutate anything when the caller does not own it.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'

const { findFirst, findMany, update, deleteFn, getSignedUrl, loadReferenceGeoTransform } = vi.hoisted(() => ({
  findFirst: vi.fn(),
  findMany: vi.fn(),
  update: vi.fn(),
  deleteFn: vi.fn(),
  getSignedUrl: vi.fn(),
  loadReferenceGeoTransform: vi.fn()
}))

vi.mock('../../config/prisma.js', () => ({
  prisma: {
    project: { findFirst, findMany, update, delete: deleteFn }
  }
}))

vi.mock('../storageService.js', () => ({ getSignedUrl }))
vi.mock('../geoTiffService.js', () => ({ loadReferenceGeoTransform }))

import {
  deleteProject,
  getPdfProjectData,
  getProject,
  listProjects,
  saveAnalysis,
  saveLayout,
  updateLayoutPreferences
} from '../projectService.js'

const OWNER = 'user_a'
const ATTACKER = 'user_b'
const PROJECT = 'project_owned_by_a'

/** Every function that takes (userId, projectId) and must refuse a non-owner. */
const scopedReads = [
  { name: 'getProject', call: (userId: string) => getProject(userId, PROJECT) },
  { name: 'getPdfProjectData', call: (userId: string) => getPdfProjectData(userId, PROJECT) }
]

const scopedWrites = [
  { name: 'saveLayout', call: (userId: string) => saveLayout(userId, PROJECT, []) },
  { name: 'updateLayoutPreferences', call: (userId: string) => updateLayoutPreferences(userId, PROJECT, {}) },
  {
    name: 'saveAnalysis',
    call: (userId: string) => saveAnalysis(userId, PROJECT, {}, {} as never)
  }
]

describe('projectService cross-user isolation', () => {
  beforeEach(() => {
    findFirst.mockReset()
    findMany.mockReset()
    update.mockReset()
    deleteFn.mockReset()
    getSignedUrl.mockReset()
    loadReferenceGeoTransform.mockReset()
  })

  it.each([...scopedReads, ...scopedWrites])(
    '$name scopes its ownership lookup to the calling user',
    async ({ call }) => {
      findFirst.mockResolvedValue(null)

      await call(ATTACKER)

      expect(findFirst).toHaveBeenCalledOnce()
      const where = findFirst.mock.calls[0][0].where
      expect(where).toMatchObject({ id: PROJECT, userId: ATTACKER })
    }
  )

  it.each([...scopedReads, ...scopedWrites])('$name returns null for a non-owner', async ({ call }) => {
    findFirst.mockResolvedValue(null)

    await expect(call(ATTACKER)).resolves.toBeNull()
  })

  it.each(scopedWrites)('$name performs no write when the caller is not the owner', async ({ call }) => {
    findFirst.mockResolvedValue(null)

    await call(ATTACKER)

    expect(update).not.toHaveBeenCalled()
    expect(deleteFn).not.toHaveBeenCalled()
  })

  it('deleteProject refuses a non-owner and deletes nothing', async () => {
    findFirst.mockResolvedValue(null)

    await expect(deleteProject(ATTACKER, PROJECT)).resolves.toBeNull()

    expect(findFirst).toHaveBeenCalledWith({ where: { id: PROJECT, userId: ATTACKER } })
    expect(deleteFn).not.toHaveBeenCalled()
  })

  it('deleteProject deletes only after the ownership check passes', async () => {
    findFirst.mockResolvedValue({ id: PROJECT, userId: OWNER })

    await deleteProject(OWNER, PROJECT)

    expect(deleteFn).toHaveBeenCalledWith({ where: { id: PROJECT } })
  })

  it('listProjects filters by the calling user and never returns another owner rows', async () => {
    findMany.mockResolvedValue([])

    await listProjects(ATTACKER)

    expect(findMany).toHaveBeenCalledOnce()
    expect(findMany.mock.calls[0][0].where).toEqual({ userId: ATTACKER })
  })

  it('getPdfProjectData does not sign a storage URL for a non-owner', async () => {
    findFirst.mockResolvedValue(null)

    await getPdfProjectData(ATTACKER, PROJECT)

    expect(getSignedUrl).not.toHaveBeenCalled()
  })
})
