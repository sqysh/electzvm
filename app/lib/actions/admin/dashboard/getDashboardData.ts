import prisma from '@/prisma/client'
import { getMailchimpMembers } from '../mailchimp/getMailchimpMembers'

export async function getDashboardData() {
  const [news, inquiries, pins, pinAggregate, users, pages, endorsements, blastHistory] = await Promise.all([
    prisma.news.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.volunteerSubmission.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.canvassPin.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.canvassPin
      .aggregate({ _sum: { doors: true }, _count: true })
      .catch(() => ({ _sum: { doors: 0 }, _count: 0 })),
    prisma.user.findMany().catch(() => []),
    prisma.page.findMany({ orderBy: { slug: 'asc' } }).catch(() => []),
    prisma.endorsement.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.emailBlast.findMany({ orderBy: { sentAt: 'desc' } }).catch(() => [])
  ])

  let members: any[] = []
  try {
    const mailchimpResult = await getMailchimpMembers()
    members = mailchimpResult.success ? (mailchimpResult.data ?? []) : []
  } catch {}

  return {
    news,
    inquiries,
    pins: pins.map((p) => ({
      ...p,
      status: p.status as 'knocked' | 'no_answer' | 'interested' | 'hostile'
    })),
    members,
    pinAggregate,
    users,
    pages,
    endorsements,
    blastHistory
  }
}
