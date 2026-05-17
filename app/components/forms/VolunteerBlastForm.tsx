import { Fragment, useState } from 'react'
import { panelInputCls } from '@/app/lib/constants/styles.constants'
import { sendVolunteerBlast } from '@/app/lib/actions/email-blast/sendVolunteerBlast'
import { motion } from 'framer-motion'
import { EmailBlast } from '@prisma/client'
import { Loader2, Send } from 'lucide-react'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'

export function VolunteerBlastForm({
  blastHistory,
  volunteerCount,
  onBlastChange
}: {
  blastHistory: EmailBlast[]
  volunteerCount: number
  onBlastChange: React.Dispatch<React.SetStateAction<EmailBlast[]>>
}) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [signOff, setSignOff] = useState('Zosia VanMeter')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { play: sentEmailBlastSE } = useSoundEffect('/sound-effects/se-34.mp3', true)

  async function handleSend() {
    setError(null)
    setSending(true)
    const result = await sendVolunteerBlast({ subject, body, signOff })
    setSending(false)

    if (result.success && result.data) {
      sentEmailBlastSE()
      setSent(true)
      setSubject('')
      setBody('')
      setSignOff('Zosia VanMeter')

      const newBlast: EmailBlast = {
        id: result.data.id,
        subject,
        body,
        signOff,
        recipientCount: result.data.recipientCount,
        sentAt: result.data.sentAt,
        sentBy: null
      }

      const updated = [newBlast, ...blastHistory]
      onBlastChange(updated)

      setTimeout(() => setSent(false), 4000)
    }
  }

  return (
    <Fragment>
      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="blast-subject"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
        >
          Subject *
        </label>
        <input
          id="blast-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={panelInputCls}
          placeholder="e.g. Join us this Saturday to knock doors!"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="blast-body"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
        >
          Message *
        </label>
        <textarea
          id="blast-body"
          rows={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={`${panelInputCls} resize-none min-h-0`}
          placeholder="Write your message here. Use separate lines for paragraphs."
        />
        <span className="font-mono text-[10px] text-muted-light/50 dark:text-muted-dark/50 text-right">
          {body.length} chars
        </span>
      </div>

      {/* Sign-off */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="blast-signoff"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
        >
          Sign-off Name
        </label>
        <input
          id="blast-signoff"
          type="text"
          value={signOff}
          onChange={(e) => setSignOff(e.target.value)}
          className={panelInputCls}
          placeholder="Zosia VanMeter"
        />
      </div>

      {error && (
        <p role="alert" className="font-inter text-xs text-red-500 dark:text-red-400">
          {error}
        </p>
      )}

      {sent && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-2.5 border border-secondary-light dark:border-secondary-dark bg-secondary-light/5 dark:bg-secondary-dark/5"
        >
          <span className="font-archivo text-[10px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark">
            Blast sent successfully ✓
          </span>
        </motion.div>
      )}

      <button
        type="button"
        onClick={handleSend}
        disabled={sending || !subject.trim() || !body.trim()}
        aria-busy={sending}
        className="font-archivo w-full py-3 text-xs font-bold uppercase tracking-widest text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed min-h-11 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
      >
        {sending ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" /> Sending...
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" aria-hidden="true" /> Send to {volunteerCount} Volunteers
          </>
        )}
      </button>
    </Fragment>
  )
}
