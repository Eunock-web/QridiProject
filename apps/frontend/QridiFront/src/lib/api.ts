import { createTuyau } from '@tuyau/core/client'
import { registry } from '@api-starter-kit/backend/registry'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333'

export const api = createTuyau({
  baseUrl: API_URL,
  registry,
})

/**
 * Create an authenticated API client for the API Guard (token-based)
 * Use this for SPAs or when frontend is on a different domain
 */
export function createAuthenticatedApi(token: string) {
  return createTuyau({
    baseUrl: API_URL,
    registry,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
