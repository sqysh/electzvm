export interface MailchimpMember {
  id: string
  contact_id?: string
  email_address: string
  full_name: string
  status: string
  timestamp_opt: string
  merge_fields: {
    FNAME?: string
    LNAME?: string
    PHONE?: string
  }
}
