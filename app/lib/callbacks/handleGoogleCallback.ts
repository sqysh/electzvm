import prisma from '@/prisma/client'
import { User as NextAuthUser } from 'next-auth'
import { Account } from 'next-auth'
import { User, Account as PrismaAccount } from '@prisma/client'
import { buildLogMessage, createLog, getRequestContext } from '../utils/log.utils'

interface GoogleProfile {
  sub?: string | null
  name?: string | null
  given_name?: string | null
  family_name?: string | null
  email?: string | null
  email_verified?: boolean | null
  picture?: string | null
  locale?: string | null
}

type UserWithAccounts = User & {
  accounts: PrismaAccount[]
}

export async function handleGoogleCallback(
  user: NextAuthUser,
  account: Account,
  profile?: GoogleProfile
): Promise<boolean> {
  const context = await getRequestContext()

  const existingUser = await prisma.user.findUnique({
    where: { email: user.email! },
    include: { accounts: true }
  })

  if (existingUser) {
    if (existingUser.role !== 'ADMIN' && existingUser.role !== 'SUPER_USER') {
      const message = await buildLogMessage(
        `was denied access — insufficient role (${existingUser.role})`,
        user.email ?? 'Unknown',
        context
      )
      await createLog('warn', message, {
        email: user.email,
        name: user.name,
        role: existingUser.role,
        provider: account?.provider,
        ...context
      })
      return false
    }
    await linkGoogleAccount(existingUser, account)
    await updateUserFromProfile(existingUser, profile)
    user.id = existingUser.id
  } else {
    const message = await buildLogMessage(`attempted sign-in but has no account`, user.email ?? 'Unknown', context)
    await createLog('warn', message, {
      email: user.email,
      name: user.name,
      provider: account?.provider,
      ...context
    })
    return false
  }

  const message = await buildLogMessage(`signed in successfully`, user.email ?? 'Unknown', context)
  await createLog('info', message, {
    email: user.email,
    name: user.name,
    role: existingUser.role,
    provider: account?.provider,
    ...context
  })

  return true
}

async function linkGoogleAccount(existingUser: User | UserWithAccounts, account: Account): Promise<void> {
  // Handle case where accounts might not be loaded (new user)
  const hasGoogleAccount =
    'accounts' in existingUser
      ? existingUser.accounts?.some(
          (acc) => acc.provider === 'google' && acc.providerAccountId === account.providerAccountId
        ) || false
      : false

  if (!hasGoogleAccount) {
    await prisma.account.create({
      data: {
        userId: existingUser.id,
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        access_token: account.access_token,
        expires_at: account.expires_at,
        id_token: account.id_token,
        refresh_token: account.refresh_token,
        scope: account.scope,
        token_type: account.token_type
      }
    })
  }
}

async function updateUserFromProfile(user: User, profile?: GoogleProfile): Promise<void> {
  if (profile?.name && (!user.firstName || !user.lastName)) {
    const [firstName, lastName] = profile.name.split(' ')

    await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName,
        lastName
      }
    })
  }
}
