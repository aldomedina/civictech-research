// /app/api/platforms/route.ts
import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // @ts-ignore
  const userId = session?.user?.id || ''

  const platformsQuery = await sql`SELECT * FROM platforms`
  const assessmentsQuery = await sql`SELECT * FROM assessments`
  const answersQuery = await sql`SELECT * FROM answers WHERE user_id = ${userId}`

  const platforms = platformsQuery.rows
  const assessments = assessmentsQuery.rows
  const answers = answersQuery.rows

  const platformsWithStatus = platforms.map((platform) => {
    const isComplete = assessments.length == answers.length

    return {
      id: platform.id,
      slug: platform.slug,
      name: platform.name,
      status: isComplete,
    }
  })

  return NextResponse.json(platformsWithStatus)
}
