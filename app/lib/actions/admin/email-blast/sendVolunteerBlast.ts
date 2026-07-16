'use server'

import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import prisma from '@/prisma/client'
import { getActor } from '../../auth/getActor'
import { emailBlastTemplate } from '@/app/lib/email-templates/admin/emailBlastTemplate'
import { resend } from '@/app/lib/resend'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'
import { createLog } from '../../_infra/createLog'

export async function sendVolunteerBlast({
  subject,
  body,
  signOff
}: {
  subject: string
  body: string
  signOff: string
}) {
  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    if (!subject.trim()) return { success: false, error: 'Subject is required.' }
    if (!body.trim()) return { success: false, error: 'Body is required.' }

    // Fetch all volunteer emails
    const volunteers = await prisma.volunteerSubmission.findMany({
      select: { email: true, firstName: true },
      orderBy: { createdAt: 'desc' }
    })

    if (volunteers.length === 0) return { success: false, error: 'No volunteers to send to.' }

    const html = emailBlastTemplate({ subject, body, signOff })

    // Send in batches of 50 to avoid rate limits
    const batchSize = 50
    let sent = 0

    for (let i = 0; i < volunteers.length; i += batchSize) {
      const batch = volunteers.slice(i, i + batchSize)
      await Promise.all(
        batch.map((v) =>
          resend.emails.send({
            from: 'Zosia VanMeter <noreply@electzvm.com>',
            to: v.email,
            subject,
            html
          })
        )
      )
      sent += batch.length
    }

    // Save blast to history
    const blast = await prisma.emailBlast.create({
      data: {
        subject,
        body,
        signOff,
        recipientCount: sent,
        sentBy: actor
      }
    })

    const message = buildLogMessage(`sent volunteer blast to ${sent} recipients`, actor, context)
    await createLog('info', message, { subject, recipientCount: sent, ...context })

    return { success: true, data: { recipientCount: sent, id: blast.id, sentAt: blast.sentAt } }
  } catch (error) {
    const message = buildLogMessage('failed to send volunteer blast', actor, context)
    await createLog('error', message, { error: error instanceof Error ? error.message : String(error), ...context })
    return { success: false, error: 'Failed to send blast.' }
  }
}
