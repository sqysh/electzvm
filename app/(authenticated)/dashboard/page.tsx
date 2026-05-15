// import { getDashboardData } from '@/app/lib/actions/getDashboardData'
// import DashboardClient from './DashboardClient'

// export default async function DashboardPage() {
//   const { news, inquiries, users } = await getDashboardData()
//   return <DashboardClient news={news} inquiries={inquiries} users={users} />
// }

import prisma from '@/prisma/client'
import { getMailchimpMembers } from '@/app/lib/actions/mailchimp/getMailchimpMembers'
import DashboardClient2 from './DashboardClient2'
// import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const [news, inquiries, userCount, mailchimpResult, media] = await Promise.all([
    prisma.news.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.volunteerSubmission.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.user.count(),
    getMailchimpMembers(),
    prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, url: true, type: true },
      take: 9
    })
  ])

  return (
    <DashboardClient2
      news={news}
      inquiries={inquiries}
      userCount={userCount}
      mailchimpCount={mailchimpResult.success ? mailchimpResult.data.length : 0}
      media={media}
    />
  )
}
