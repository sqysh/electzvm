'use server'

import prisma from '@/prisma/client'
import { resend } from '@/app/lib/resend/resend'
import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'
import { createLog } from '../../_infra/createLog'
import { volunteerSubmissionAdminTemplate } from '@/app/lib/email-templates/admin/volunteerSubmissionAdminTemplate'
import { volunteerSubmissionUserTemplate } from '@/app/lib/email-templates/public/volunteerSubmissionTemplate'

interface VolunteerFormInput {
  firstName: string
  lastName: string
  email: string
  phone: string
  mailingList: boolean
  yardSign: boolean
  doorKnocking: boolean
}

export async function createVolunteerSubmission(data: VolunteerFormInput) {
  if (!data.firstName || !data.lastName || !data.email || !data.phone) {
    return { success: false, error: 'All required fields must be filled out.' }
  }

  const context = await getRequestDetails()
  const actor = `${data.firstName} ${data.lastName}`

  try {
    await prisma.volunteerSubmission.create({
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        mailingList: data.mailingList,
        yardSign: data.yardSign,
        doorKnocking: data.doorKnocking
      }
    })

    // Fire and forget — Mailchimp, emails, log in parallel
    await Promise.allSettled([
      data.mailingList && addToMailchimp(data),
      resend.emails.send({
        from: 'ElectZVM <noreply@electzvm.com>',
        to: 'zosia@electzvm.com',
        subject: `New Volunteer: ${data.firstName} ${data.lastName}`,
        html: volunteerSubmissionAdminTemplate({ ...data })
      }),
      resend.emails.send({
        from: 'Zosia VanMeter <noreply@electzvm.com>',
        to: data.email.trim().toLowerCase(),
        subject: "You're on Team ZVM!",
        html: volunteerSubmissionUserTemplate({ ...data })
      }),
      createLog('info', buildLogMessage('submitted volunteer form', actor, context), {
        email: data.email,
        mailingList: data.mailingList,
        yardSign: data.yardSign,
        doorKnocking: data.doorKnocking,
        ...context
      })
    ])

    return { success: true }
  } catch (error) {
    await createLog('error', buildLogMessage('failed to submit volunteer form', actor, context), {
      email: data.email,
      error: error instanceof Error ? error.message : String(error),
      ...context
    }).catch(() => null)
    return { success: false, error: 'Failed to submit. Please try again.' }
  }
}

async function addToMailchimp(data: VolunteerFormInput) {
  const res = await fetch('https://us15.api.mailchimp.com/3.0/lists/78bf581442/members', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64')}`
    },
    body: JSON.stringify({
      email_address: data.email.trim().toLowerCase(),
      status: 'subscribed',
      merge_fields: {
        FNAME: data.firstName.trim(),
        LNAME: data.lastName.trim(),
        PHONE: data.phone.trim()
      }
    })
  })

  if (!res.ok) {
    await createLog('error', `Mailchimp add failed for ${data.email}`, {
      status: res.status,
      email: data.email
    }).catch(() => null)
  }
}
