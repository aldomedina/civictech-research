import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { sql } from '@vercel/postgres'

export async function GET(request: Request, { params }: { params: { platform_name: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // @ts-ignore
  const userId = session?.user?.id || ''
  const { platform_name } = params
  const platformQuery = await sql`SELECT id FROM platforms WHERE slug = ${platform_name}`
  if (platformQuery.rows.length === 0) {
    return Response.json({ error: 'Platform not found' }, { status: 404 })
  }
  const platformId = platformQuery.rows[0].id

  const notesQuery = await sql`
    SELECT n.id, n.comment AS note, 'Note Title' AS title, n.last_update AS "lastUpdated"
    FROM notes n
    WHERE n.user_id = ${userId} AND n.platform_id = ${platformId}
    ORDER BY n.last_update DESC
  `

  const notes = notesQuery.rows.map((row) => ({
    id: row.id,
    note: row.note,
    title: row.title,
    lastUpdated: row.lastUpdated,
  }))
  return Response.json(notes)
}

export async function POST(request: Request, { params }: { params: { platform_name: string } }) {
  const session = await getServerSession(authOptions)
  // @ts-ignore
  const userId = session?.user?.id || ''
  const { platform_name } = params
  const { note } = await request.json()

  const platformQuery = await sql`SELECT id FROM platforms WHERE slug = ${platform_name}`
  if (platformQuery.rows.length === 0) {
    return Response.json({ error: 'Platform not found' }, { status: 404 })
  }
  const platformId = platformQuery.rows[0].id

  const insertNoteQuery = await sql`
    INSERT INTO notes (user_id, platform_id, comment, created_at, last_update)
    VALUES (${userId}, ${platformId}, ${note}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING id, comment AS note, 'Note Title' AS title, last_update AS "lastUpdated"
  `

  const newNote = insertNoteQuery.rows[0]

  return Response.json(newNote)
}

export async function PATCH(request: Request, { params }: { params: { platform_name: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // @ts-ignore
  const userId = session?.user?.id || ''
  const { platform_name } = params
  const { note, noteId: note_id } = await request.json()

  const platformQuery = await sql`SELECT id FROM platforms WHERE slug = ${platform_name}`
  if (platformQuery.rows.length === 0) {
    return Response.json({ error: 'Platform not found' }, { status: 404 })
  }
  const platformId = platformQuery.rows[0].id

  const updateNoteQuery = await sql`
    UPDATE notes
    SET comment = ${note}, last_update = CURRENT_TIMESTAMP
    WHERE id = ${note_id} AND user_id = ${userId} AND platform_id = ${platformId}
    RETURNING id, comment AS note, 'Note Title' AS title, last_update AS "lastUpdated"
  `

  if (updateNoteQuery.rows.length === 0) {
    return Response.json({ error: 'Note not found or not authorized' }, { status: 404 })
  }

  const updatedNote = updateNoteQuery.rows[0]

  return Response.json(updatedNote)
}

export async function DELETE(request: Request, { params }: { params: { platform_name: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  //@ts-ignore
  const userId = session?.user?.id || ''
  const { platform_name } = params
  const { noteId: note_id } = await request.json()

  const platformQuery = await sql`SELECT id FROM platforms WHERE slug = ${platform_name}`
  if (platformQuery.rows.length === 0) {
    return Response.json({ error: 'Platform not found' }, { status: 404 })
  }
  const platformId = platformQuery.rows[0].id

  const deleteNoteQuery = await sql`
    DELETE FROM notes
    WHERE id = ${note_id} AND user_id = ${userId} AND platform_id = ${platformId}
    RETURNING id
  `

  if (deleteNoteQuery.rows.length === 0) {
    return Response.json({ error: 'Note not found or not authorized' }, { status: 404 })
  }

  return Response.json({ message: 'Note deleted successfully' })
}
