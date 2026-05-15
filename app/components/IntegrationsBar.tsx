'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

const integrations = [
  {
    name: 'GoDaddy',
    status: 'connected',
    description: 'Domain registrar and DNS management for electzvm.com.',
    credentials: [
      { label: 'Domain', value: 'electzvm.com' },
      { label: 'DNS', value: 'xxxxxxxxxxxx' }
    ]
  },
  {
    name: 'Mailchimp',
    status: 'connected',
    description: 'Mailing list management and email marketing for campaign supporters.',
    credentials: [
      { label: 'API Key', value: 'xxxxxxxxxxxx-us15' },
      { label: 'Audience ID', value: 'xxxxxxxxxxxx' }
    ]
  },
  {
    name: 'Google Analytics',
    status: 'connected',
    description: 'Tracks site traffic, visitor behavior, and campaign page performance.',
    credentials: [{ label: 'Measurement ID', value: 'G-XXXXXXXXXX' }]
  },
  {
    name: 'Google Firebase',
    status: 'connected',
    description: 'Cloud storage for campaign images and video uploads.',
    credentials: [
      { label: 'API Key', value: 'xxxxxxxxxxxxxxxxxxxx' },
      { label: 'Project ID', value: 'xxxxxxxxxxxxxxx' },
      { label: 'Storage Bucket', value: 'xxxxxxx.appspot.com' }
    ]
  },
  {
    name: 'Resend',
    status: 'connected',
    description: 'Transactional email delivery for volunteer confirmations and notifications.',
    credentials: [
      { label: 'API Key', value: 're_xxxxxxxxxxxx' },
      { label: 'From', value: 'noreply@electzvm.com' }
    ]
  },
  {
    name: 'Neon',
    status: 'connected',
    description: 'Serverless PostgreSQL database powering all campaign data.',
    credentials: [
      { label: 'Database', value: 'electzvm' },
      { label: 'Connection', value: 'xxxxxxxxxxxx.neon.tech' }
    ]
  },
  {
    name: 'Vercel',
    status: 'connected',
    description: 'Hosting and deployment platform for the campaign website.',
    credentials: [
      { label: 'Project', value: 'electzvm' },
      { label: 'Domain', value: 'electzvm.vercel.app' }
    ]
  }
]

export default function IntegrationsBar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="shrink-0 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col-reverse">
      {/* Panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="integrations-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-neutral-200 dark:border-neutral-800"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800">
              {integrations.map((integration) => (
                <div key={integration.name} className="px-4 sm:px-6 py-4 flex flex-col gap-3">
                  {/* Integration header */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-neutral-900 dark:text-neutral-100 font-bold">
                      {integration.name}
                    </span>
                    <span className="font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark ml-auto">
                      {integration.status}
                    </span>
                  </div>

                  <p className="font-inter text-[11px] text-neutral-400 dark:text-neutral-600 leading-relaxed">
                    {integration.description}
                  </p>

                  {/* Credentials */}
                  <div className="flex flex-col gap-2">
                    {integration.credentials.map((cred) => (
                      <div key={cred.label} className="flex flex-col gap-0.5">
                        <span className="font-archivo text-[9px] tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-600">
                          {cred.label}
                        </span>
                        <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 tracking-wider">
                          {cred.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle bar */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="integrations-panel"
        className="w-full flex items-center justify-between px-4 sm:px-6 h-9 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
      >
        <div className="flex items-center gap-2">
          <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-600">
            Integrations
          </span>
          <div className="flex items-center gap-1.5">
            {integrations.map((i) => (
              <div
                key={i.name}
                aria-label={`${i.name} ${i.status}`}
                className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark"
              />
            ))}
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 0 : 180 }} transition={{ duration: 0.2 }}>
          <ChevronUp className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" aria-hidden="true" />
        </motion.div>
      </button>
    </div>
  )
}
