import { getDashboardData } from '@/app/lib/actions/admin/dashboard/getDashboardData'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const { news, inquiries, pins, pinAggregate, users, pages, members, endorsements, blastHistory, events } =
    await getDashboardData()

  return (
    <DashboardClient
      news={news}
      inquiries={inquiries}
      mailchimpCount={members.length}
      pinCount={pins.length}
      doorsKnocked={pinAggregate._sum.doors ?? 0}
      pins={pins}
      users={users}
      members={members}
      pages={pages}
      endorsements={endorsements}
      blastHistory={blastHistory}
      events={events}
    />
  )
}
