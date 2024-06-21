import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import { sql } from '@vercel/postgres'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Adjunta el ID del usuario al token JWT
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Verifica que session.user esté definido
      if (session.user) {
        //@ts-ignore
        session.user.id = token.id
      }
      return session
    },
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
            name: user.name,
          }
        }
        return null
      },
    }),
  ],
}
