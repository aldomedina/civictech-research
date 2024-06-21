// /app/api/platforms/[platform_name]/summary.ts
import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request, { params }: { params: { platform_name: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // @ts-ignore
  const userId = session?.user?.id || ''
  const { platform_name } = params

  // Query to get the platform id from the slug
  const platformQuery = await sql`SELECT id FROM platforms WHERE slug = ${platform_name}`
  if (platformQuery.rows.length === 0) {
    return NextResponse.json({ error: 'Platform not found' }, { status: 404 })
  }
  const platformId = platformQuery.rows[0].id

  // Query to get the total number of assessments by category
  const totalAssessmentsQuery = await sql`
    SELECT type, COUNT(*) as total
    FROM assessments
    GROUP BY type
  `

  // Query to get the number of answered assessments by category for the given user
  const answeredAssessmentsQuery = await sql`
    SELECT a.type, COUNT(*) as count
    FROM assessments a
    JOIN answers ans ON a.id = ans.assessment_id
    WHERE ans.user_id = ${userId}
    GROUP BY a.type
  `

  const totalAssessments = totalAssessmentsQuery.rows
  const answeredAssessments = answeredAssessmentsQuery.rows

  // Combine the results into the desired format
  const result = ['before', 'during', 'after'].map((type) => {
    const total = totalAssessments.find((item) => item.type === type)?.total || 0
    const count = answeredAssessments.find((item) => item.type === type)?.count || 0
    return { type, total, count }
  })

  return NextResponse.json(result)
}
