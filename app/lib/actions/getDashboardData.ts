import prisma from '@/prisma/client'
import { getMailchimpMembers } from './mailchimp/getMailchimpMembers'

export async function getDashboardData() {
  const [news, inquiries, pins, pinAggregate, users, pages, endorsements] = await Promise.all([
    prisma.news.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.volunteerSubmission.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.canvassPin.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.canvassPin.aggregate({ _sum: { doors: true }, _count: true }),
    prisma.user.findMany(),
    prisma.page.findMany({ orderBy: { slug: 'asc' } }),
    prisma.endorsement.findMany({ orderBy: { createdAt: 'desc' } })
  ])

  let members: any[] = []
  try {
    const mailchimpResult = await getMailchimpMembers()
    members = mailchimpResult.success ? (mailchimpResult.data ?? []) : []
  } catch {}

  return { news, inquiries, pins, pinAggregate, users, pages, members, endorsements }
}
