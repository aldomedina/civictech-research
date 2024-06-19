import notes_placeholder from '@/placeholders/notes'

export async function GET(request: Request, { params }: { params: {} }) {
  return Response.json({ notes: notes_placeholder })
}
