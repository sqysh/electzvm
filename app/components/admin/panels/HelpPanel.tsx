'use client'

import DashboardPanel from './DashboardPanel'
import { HELP_SECTIONS } from '@/app/lib/constants/help.constants'
import { HelpItem } from '../dashboard/HelpItem'

export function HelpPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <DashboardPanel
      open={open}
      onClose={onClose}
      title="Help & Documentation"
      subtitle={`${HELP_SECTIONS.length} topics`}
      width="md"
    >
      {/* Intro */}
      <div className="shrink-0 px-4 py-3 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <p className="font-inter text-xs text-muted-light dark:text-muted-dark leading-relaxed">
          Quick answers to common questions about managing your campaign dashboard.
        </p>
      </div>

      {/* Accordion */}
      <div className="flex-1 overflow-y-auto">
        {HELP_SECTIONS.map((section) => (
          <HelpItem key={section.title} section={section} />
        ))}
      </div>

      {/* Footer */}
      <div className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">ElectZVM · Sqysh</span>
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
          {HELP_SECTIONS.length} topics
        </span>
      </div>
    </DashboardPanel>
  )
}
