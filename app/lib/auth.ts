import prisma from '@/prisma/client'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import googleProvider from './providers/googleProvider'
import { handleGoogleCallback } from './callbacks/handleGoogleCallback'
import { buildLogMessage, createLog, getRequestContext } from './utils/log.utils'

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: false,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60 // 24 hours
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },

  providers: [googleProvider],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        switch (account?.provider) {
   

          case 'google':
            return await handleGoogleCallback(user, account, profile)

          default:
            return true
        }
      } catch (error) {
        return false
      }
    },

    async jwt({ token, user }) {
      if (user) {
        const context = await getRequestContext()

        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
            select: {
              id: true,
              role: true,
              firstName: true,
              lastName: true
            }
          })

          if (dbUser) {
            token.userId = dbUser.id
            token.role = dbUser.role
            if (dbUser.firstName && dbUser.lastName) {
              token.name = `${dbUser.firstName} ${dbUser.lastName}`.trim()
            }

            await createLog('info', await buildLogMessage('authenticated', user.email ?? 'unknown', context), {
              userId: dbUser.id,
              email: user.email,
              role: dbUser.role,
              request: context
            }).catch(() => null)
          }
        } catch (error) {
          await createLog('error', await buildLogMessage('JWT callback error', user.email ?? 'unknown', context), {
            error: error instanceof Error ? error.message : 'Unknown error',
            email: user.email,
            request: context
          }).catch(() => null)
        }
      }
      return token
    },

    async session({ session, token }) {
      if (token.userId && typeof token.userId === 'string') {
        session.user.id = token.userId
        session.user.role = token.role as string
      } else {
        const context = await getRequestContext()

        await createLog(
          'error',
          await buildLogMessage('Session callback error - missing userId', session.user.email ?? 'unknown', context),
          {
            email: session.user.email,
            tokenData: { userId: token.userId, role: token.role },
            request: context
          }
        ).catch(() => null)
      }

      return session
    }
  }
})
