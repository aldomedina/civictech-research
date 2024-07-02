import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { sql } from '@vercel/postgres'

export async function getUserAndPlatformIds(request: Request, platform_name: string) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: 'Unauthorized', userId: null, platformId: null }
  }
  // @ts-ignore
  const userId = session?.user?.id || ''
  const platformQuery = await sql`SELECT id FROM platforms WHERE slug = ${platform_name}`
  if (platformQuery.rows.length === 0) {
    return { error: 'Platform not found', userId: null, platformId: null }
  }
  const platformId = platformQuery.rows[0].id

  return { userId, platformId, error: null }
}
