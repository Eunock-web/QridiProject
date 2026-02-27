import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { Data } from '@api-starter-kit/backend/data'

/**
 * Example component showing how to use Tuyau API client
 * with full type safety and autocompletion
 */
export function UsersList() {
  const [users, setUsers] = useState<Data.User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        // This call is fully typed thanks to Tuyau!
        // You'll get autocomplete and type checking
        const response = await api.api.v1.users.$get()
        setUsers(response.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  )
}
