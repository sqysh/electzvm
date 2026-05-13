'use server'

import prisma from '@/prisma/client'

export async function getDashboardData() {
  const [news, inquiries, users] = await Promise.all([
    prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        isPublished: true
      }
    }),
    prisma.volunteerSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        mailingList: true,
        yardSign: true,
        doorKnocking: true
      }
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true
      }
    })
  ])

  return { news, inquiries, users }
}
