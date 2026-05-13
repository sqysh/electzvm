import { getDashboardData } from '@/app/lib/actions/getDashboardData'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const { news, inquiries, users } = await getDashboardData()
  return <DashboardClient news={news} inquiries={inquiries} users={users} />
}
