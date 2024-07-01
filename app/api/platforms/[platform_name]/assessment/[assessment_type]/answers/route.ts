// /app/api/platforms/[platform_name]/assessment/[assessment_type]/answers.ts
import { sql } from '@vercel/postgres'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function POST(
  request: Request,
  { params }: { params: { platform_name: string; assessment_type: string } },
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  //@ts-ignore
  const userId = session?.user?.id || ''
  const { platform_name, assessment_type } = params
  const { assessment_id, answer } = await request.json()

  // Query to get the platform id from the slug
  const platformQuery = await sql`SELECT id FROM platforms WHERE slug = ${platform_name}`
  if (platformQuery.rows.length === 0) {
    return Response.json({ error: 'Platform not found' }, { status: 404 })
  }
  const platformId = platformQuery.rows[0].id

  // Upsert the answer
  await sql`
    INSERT INTO answers (assessment_id, user_id, platform_id, answer, created_at, last_updated)
    VALUES (${assessment_id}, ${userId}, ${platformId}, ${answer}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (assessment_id, user_id, platform_id)
    DO UPDATE SET answer = ${answer}, last_updated = CURRENT_TIMESTAMP
  `

  // Query to get the updated list of assessments filtered by assessment_type
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
}
