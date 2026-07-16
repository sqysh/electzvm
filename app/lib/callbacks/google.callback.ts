import { User as NextAuthUser } from 'next-auth'
import { Account } from 'next-auth'
import { createLog } from '../actions/_infra/createLog'
import { stampUserGeoFromRequest } from '../actions/auth/stampUserGeoFromRequest'
import prisma from '@/prisma/client'

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

export async function handleGoogleCallback(
  user: NextAuthUser,
  __: Account,
  profile?: GoogleProfile
): Promise<boolean | string> {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email! }
  })

  if (!existingUser) return false

  if (existingUser.role !== 'ADMIN' && existingUser.role !== 'SUPER_USER') return false

  const details = await stampUserGeoFromRequest(existingUser.id)

  await Promise.all([
    prisma.user.update({
      where: { id: existingUser.id },
      data: {
        lastLoginAt: new Date(),
        lastGeoLatitude: details?.geoLatitude,
        lastGeoLongitude: details?.geoLongitude,
        lastGeoCity: details?.geoCity,
        lastGeoRegion: details?.geoRegion,
        lastGeoCountry: details?.geoCountry,
        firstName: profile?.given_name || existingUser.firstName,
        lastName: profile?.family_name || existingUser.lastName
      }
    }),
    createLog('info', 'Google sign-in', {
      userId: existingUser.id,
      email: existingUser.email,
      ip: details?.ip,
      device: details?.device,
      browser: details?.browser,
      os: details?.os,
      city: details?.geoCity,
      region: details?.geoRegion,
      country: details?.geoCountry
    })
  ])

  return true
}
