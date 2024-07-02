// /app/api/platforms/[platform_name]/assessments/[assessment_type]/route.ts

import { authOptions } from '@/lib/auth'
import assessment_placeholder from '@/placeholders/assessment'
import { getServerSession } from 'next-auth'
import { sql } from '@vercel/postgres'

export async function GET(
  request: Request,
  { params }: { params: { assessment_type: string; platform_name: string } },
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // @ts-ignore
  const userId = session?.user?.id || ''
  const { platform_name, assessment_type } = params
  const platformQuery = await sql`SELECT id FROM platforms WHERE slug = ${platform_name}`
  if (platformQuery.rows.length === 0) {
    return Response.json({ error: 'Platform not found' }, { status: 404 })
  }
  const platformId = platformQuery.rows[0].id

  const assessmentsQuery = await sql`
    SELECT a.id, a.type, a.assessment, a.description,
           COALESCE(ans.answer, '') AS answer, COALESCE(ans.comment, '') AS comment
    FROM assessments a
    LEFT JOIN answers ans ON a.id = ans.assessment_id AND ans.user_id = ${userId} AND ans.platform_id = ${platformId}
    WHERE a.type = ${assessment_type}
  `

  const assessments = assessmentsQuery.rows.map((row) => ({
    type: row.type,
    id: row.id,
    assessment: row.assessment,
    description: row.description,
    answer: row.answer,
    comment: row.comment,
  }))
  return Response.json(assessments)
  // Response.json({ message: 'Something went wrong' }, { status: 500 })
}
