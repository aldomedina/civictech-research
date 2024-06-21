import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import { sql } from '@vercel/postgres'

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // add validation with zod
        const response = await sql`
         SELECT * FROM users WHERE email=${credentials?.email}
        `
        const user = response.rows[0]
        const isPasswordCorrect = await compare(credentials?.password || '', user.password)
        if (isPasswordCorrect) {
          return {
            id: user.id,
            email: user.email,
          }
        }
        return null
      },
    }),
  ],
})

export { handler as GET, handler as POST }
