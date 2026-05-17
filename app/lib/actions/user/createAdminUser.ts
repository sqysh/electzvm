'use server'

import prisma from '@/prisma/client'
import { buildLogMessage, createLog, getRequestContext } from '../../utils/log.utils'
import { getActor } from './getActor'
import { resend } from '../../resend'
import { adminWelcomeTemplate } from '../../email-templates/admin/adminWelcomeTemplate'

export async function createAdminUser(data: { firstName: string; lastName: string; email: string }) {
  const [context, actor] = await Promise.all([getRequestContext(), getActor()])

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
      from: 'Zosia VanMeter <noreply@electzvm.com>',
      to: data.email,
      subject: 'You now have access to the Elect ZVM dashboard',
      html: adminWelcomeTemplate({ firstName: data.firstName })
    })

    const message = await buildLogMessage(
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
    console.error('[createAdminUser]', error)

    const message = await buildLogMessage(`failed to create admin user (${data.email})`, actor, context)
    await createLog('error', message, {
      email: data.email,
      error: error instanceof Error ? error.message : String(error),
      ...context
    })

    return { success: false, error: 'Failed to create user.' }
  }
}
