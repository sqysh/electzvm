import prisma from '@/prisma/client'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import googleProvider from './providers/google.provider'
import { handleGoogleCallback } from './callbacks/google.callback'
import { createLog } from './actions/_infra/createLog'
import { getRequestDetails } from './utils/_log.server.utils'
import { buildLogMessage } from './utils/_log.client.utils'

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: false,
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
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

    async session({ session, user }) {
      const context = await getRequestDetails()

      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            role: true,
            firstName: true,
            lastName: true
          }
        })

        if (dbUser) {
          session.user.id = dbUser.id
          session.user.role = dbUser.role
          if (dbUser.firstName && dbUser.lastName) {
            session.user.name = `${dbUser.firstName} ${dbUser.lastName}`.trim()
          }

          await createLog('info', buildLogMessage('authenticated', user.email ?? 'unknown', context), {
            userId: dbUser.id,
            email: user.email,
            role: dbUser.role,
            request: context
          }).catch(() => null)
        }
      } catch (error) {
        await createLog('error', buildLogMessage('Session callback error', user.email ?? 'unknown', context), {
          error: error instanceof Error ? error.message : 'Unknown error',
          email: user.email,
          request: context
        }).catch(() => null)
      }

      return session
    }
  }
})
