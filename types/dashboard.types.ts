import { CanvassPin, Endorsement, News, Page, VolunteerSubmission } from '@prisma/client'
import { UserRecord } from './user.types'
import { MailchimpMember } from './mailchimp.types'

export interface DashboardProps {
  news: News[]
  inquiries: VolunteerSubmission[]
  mailchimpCount: number
  pinCount: number
  doorsKnocked: number
  pins: CanvassPin[]
  users: UserRecord[]
  members: MailchimpMember[]
  pages: Page[]
  endorsements: Endorsement[]
}
