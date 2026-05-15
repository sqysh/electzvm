import { getMailchimpMembers } from '@/app/lib/actions/mailchimp/getMailchimpMembers'
import MailchimpMembersClient from './MailchimpMembersClient'

export default async function MailchimpMembersPage() {
  const result = await getMailchimpMembers()
  const members = result.success ? result.data : []

  return <MailchimpMembersClient members={members} />
}
