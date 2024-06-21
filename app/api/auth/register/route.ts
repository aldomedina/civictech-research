import { hash } from 'bcrypt'
import { sql } from '@vercel/postgres'
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  name: z.string().min(1, { message: 'Name is required' }),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsedData = userSchema.parse(body)
    const { email, password, name } = parsedData
    const hashedPassword = await hash(password, 10)
    const response = await sql`
        INSERT INTO users (email, password, role, name)
        VALUES (${email}, ${hashedPassword}, ${'user'}, ${name})
    `
    return Response.json({ message: 'success' })
  } catch (e) {
    console.error(e)
    if (e instanceof z.ZodError) {
      return Response.json({ error: e.errors }, { status: 400 })
    }
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
