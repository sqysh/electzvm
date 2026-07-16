'use server'

import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import prisma from '@/prisma/client'
import { getActor } from '../../auth/getActor'
import { resend } from '@/app/lib/resend/resend'
import { adminWelcomeTemplate } from '@/app/lib/email-templates/admin/adminWelcomeTemplate'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'
import { createLog } from '../../_infra/createLog'

export async function createAdminUser(data: { firstName: string; lastName: string; email: string }) {
  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    if (!data.firstName || !data.lastName || !data.email) {
      return { success: false, error: 'First name, last name, and email are required.' }
    }

    const existing = await prisma.user.findUnique({
      where: { email: data.email.trim().toLowerCase() }
    })
    if (existing) {
      return { success: false, error: 'A user with this email already exists.' }
    }

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        role: 'ADMIN',
        emailVerified: new Date()
      }
    })

    await resend.emails.send({
      from: 'Zosia VanMeter <admin@electzvm.com>',
      to: data.email,
      subject: 'You now have access to the Elect ZVM dashboard',
      html: adminWelcomeTemplate({ firstName: data.firstName })
    })

    const message = buildLogMessage(
      `created admin user ${user.firstName} ${user.lastName} (${user.email})`,
      actor,
      context
    )
    await createLog('info', message, {
      userId: user.id,
      email: user.email,
      role: user.role,
      ...context
    })

    return { success: true, data: user }
  } catch (error) {
    const message = buildLogMessage(`failed to create admin user (${data.email})`, actor, context)
    await createLog('error', message, {
      email: data.email,
      error: error instanceof Error ? error.message : String(error),
      ...context
    })

    return { success: false, error: 'Failed to create user.' }
  }
}
