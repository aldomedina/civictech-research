import assessment_placeholder from '@/placeholders/assessment'

export async function GET(
  request: Request,
  { params }: { params: { assessment_type: string; platform_name: string } },
) {
  if (!params.platform_name) Response.json({ message: 'Platform not found' }, { status: 404 })
  if (!params.assessment_type) Response.json({ message: 'Assessment type not found' }, { status: 404 })
  const data = assessment_placeholder.filter((item) => item.type === params.assessment_type)

  if (data) {
    return Response.json({ data })
  }
  Response.json({ message: 'Something went wrong' }, { status: 500 })
}
