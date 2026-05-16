import prisma from '@/prisma/client'
import { getMailchimpMembers } from '@/app/lib/actions/mailchimp/getMailchimpMembers'
import DashboardClient3 from './DashboardClient3'

export default async function DashboardPage() {
  const [news, inquiries, userCount, mailchimpResult, media, pins, pinAggregate] = await Promise.all([
    prisma.news.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.volunteerSubmission.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.user.count(),
    getMailchimpMembers(),
    prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, url: true, type: true },
      take: 9
    }),
    prisma.canvassPin.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.canvassPin.aggregate({ _sum: { doors: true }, _count: true })
  ])

  return (
    <DashboardClient3
      news={news}
      inquiries={inquiries}
      userCount={userCount}
      mailchimpCount={mailchimpResult.success ? mailchimpResult.data.length : 0}
      media={media}
      pinCount={pins.length}
      doorsKnocked={pinAggregate._sum.doors ?? 0}
      pins={pins}
    />
  )
}
