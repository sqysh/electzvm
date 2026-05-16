import { VolunteerSubmission } from '@prisma/client'
import { useState } from 'react'
import { InterestBadge } from '../elements/InterestBadge'
import { ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export function InquiryRow({ inquiry }: { inquiry: VolunteerSubmission }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-border-light dark:border-border-dark last:border-0">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors text-left focus-visible:outline-none group"
      >
        {/* Status dot */}
        <div
          aria-hidden="true"
          className="w-2 h-2 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0 mt-0.5"
        />

        {/* Name + email */}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <span className="font-archivo text-xs font-bold text-text-light dark:text-text-dark truncate">
            {inquiry.firstName} {inquiry.lastName}
          </span>
          <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark truncate">{inquiry.email}</span>
        </div>

        {/* Interest badges */}
        <div className="hidden xs:flex items-center gap-1 shrink-0">
          {inquiry.mailingList && (
            <InterestBadge
              label="L"
              color="border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
            />
          )}
          {inquiry.yardSign && (
            <InterestBadge
              label="S"
              color="border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark"
            />
          )}
          {inquiry.doorKnocking && (
            <InterestBadge label="D" color="border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark" />
          )}
        </div>

        {/* Chevron */}
        <div className="text-muted-light dark:text-muted-dark shrink-0">
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark flex flex-col gap-3">
              {/* Contact */}
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${inquiry.email}`}
                  className="flex items-center gap-2 font-inter text-sm text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                >
                  <Mail className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark shrink-0" aria-hidden="true" />
                  {inquiry.email}
                </a>
                <a
                  href={`tel:${inquiry.phone}`}
                  className="flex items-center gap-2 font-inter text-sm text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                >
                  <Phone className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark shrink-0" aria-hidden="true" />
                  {inquiry.phone}
                </a>
              </div>

              {/* Interests */}
              <div className="flex flex-col gap-1.5">
                <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  How they want to help
                </span>
                <div className="flex flex-wrap gap-2">
                  {inquiry.mailingList && (
                    <InterestBadge
                      label="Join the mailing list"
                      color="border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
                    />
                  )}
                  {inquiry.yardSign && (
                    <InterestBadge
                      label="Put a sign in my yard"
                      color="border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark"
                    />
                  )}
                  {inquiry.doorKnocking && (
                    <InterestBadge
                      label="Join the door knocking crew"
                      color="border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark"
                    />
                  )}
                  {!inquiry.mailingList && !inquiry.yardSign && !inquiry.doorKnocking && (
                    <span className="font-inter text-xs text-muted-light dark:text-muted-dark">
                      No interests selected
                    </span>
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  Submitted
                </span>
                <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark">
                  {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
