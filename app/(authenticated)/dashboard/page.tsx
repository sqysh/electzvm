import DashboardClient from './DashboardClient'
import { getDashboardData } from '@/app/lib/actions/getDashboardData'

export default async function DashboardPage() {
  const { news, inquiries, pins, pinAggregate, users, pages, members, endorsements, blastHistory } =
    await getDashboardData()

  return (
    <DashboardClient
      news={JSON.parse(JSON.stringify(news))}
      inquiries={JSON.parse(JSON.stringify(inquiries))}
      mailchimpCount={members.length}
      pinCount={pins.length}
      doorsKnocked={pinAggregate._sum.doors ?? 0}
      pins={JSON.parse(
        JSON.stringify(
          pins.map((p) => ({
            ...p,
            status: p.status as 'knocked' | 'no_answer' | 'interested' | 'hostile'
          }))
        )
      )}
      users={JSON.parse(JSON.stringify(users))}
      members={members}
      pages={JSON.parse(JSON.stringify(pages))}
      endorsements={endorsements}
      blastHistory={blastHistory}
    />
  )
}
