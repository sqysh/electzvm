export interface EmailBlast {
  id: string
  subject: string
  body: string
  signOff: string
  recipientCount: number
  sentAt: Date
  sentBy: string | null
}
