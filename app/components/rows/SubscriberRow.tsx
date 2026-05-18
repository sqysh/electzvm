import { MailchimpMember } from '@/types/mailchimp.types'
import { motion } from 'framer-motion'
import { StatusBadge } from '../elements/StatusBadge'
import { ExternalLink } from 'lucide-react'

export function SubscriberRow({ member }: { member: MailchimpMember }) {
  const name = member.full_name || `${member.merge_fields.FNAME ?? ''} ${member.merge_fields.LNAME ?? ''}`.trim() || '—'

  const mailchimpUrl = member.contact_id
    ? `https://us15.admin.mailchimp.com/audience/contact-profile?contact_id=${member.contact_id}&use_segment=N&page=1&pageSize=25&sort=timestamp_opt&asc=DESC`
    : `https://us15.admin.mailchimp.com/lists/members/?q=${encodeURIComponent(member.email_address)}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3 px-4 py-3 border-b border-border-light dark:border-border-dark last:border-0 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group"
    >
      {/* Status dot */}
      <div
        aria-hidden="true"
        className={`w-2 h-2 rounded-full shrink-0 ${member.status === 'subscribed' ? 'bg-secondary-light dark:bg-secondary-dark' : 'bg-muted-light dark:bg-muted-dark'}`}
      />

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="font-archivo text-xs font-bold text-text-light dark:text-text-dark truncate">{name}</span>
        <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark truncate">
          {member.email_address}
        </span>
      </div>

      <StatusBadge status={member.status} />

      {/* External link */}
      <a
        href={mailchimpUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${name} in Mailchimp (opens in new tab)`}
        onClick={(e) => e.stopPropagation()}
        className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light shrink-0"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  )
}
