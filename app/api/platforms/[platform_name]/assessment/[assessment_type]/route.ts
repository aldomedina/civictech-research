import { getUserAndPlatformIds } from '@/lib/utils'
import { sql } from '@vercel/postgres'

export async function GET(
  request: Request,
  { params }: { params: { assessment_type: string; platform_name: string } },
) {
  const { userId, platformId, error } = await getUserAndPlatformIds(request, params.platform_name)
  if (error) {
    return Response.json({ error }, { status: 401 })
  }

  const { assessment_type } = params

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
