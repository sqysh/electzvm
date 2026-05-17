'use server'

import prisma from '@/prisma/client'
import { Resend } from 'resend'
import { buildLogMessage, createLog, getRequestContext } from '../../utils/log.utils'
import { volunteerSubmissionAdminTemplate } from '../../email-templates/admin/volunteerSubmissionAdminTemplate'
import { volunteerSubmissionUserTemplate } from '../../email-templates/public/volunteerSubmissionTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

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
  const context = await getRequestContext()

  try {
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      return { success: false, error: 'All required fields must be filled out.' }
    }

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

    if (data.mailingList) {
      try {
        const mc = await fetch(`https://us15.api.mailchimp.com/3.0/lists/78bf581442/members`, {
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
        await mc.json()
      } catch (err) {
        console.error('[Mailchimp error]', err)
      }
    }

    await Promise.all([
      resend.emails.send({
        from: 'ElectZVM <noreply@electzvm.com>',
        to: 'zosia@electzvm.com',
        subject: `New Volunteer: ${data.firstName} ${data.lastName}`,
        html: volunteerSubmissionAdminTemplate({ ...data })
      }),
      resend.emails.send({
        from: 'Zosia VanMeter <noreply@electzvm.com>',
        to: data.email,
        subject: "You're on Team ZVM!",
        html: volunteerSubmissionUserTemplate({ ...data, firstName: data.firstName })
      })
    ])

    const message = await buildLogMessage(
      `submitted volunteer form (${[data.mailingList && 'mailing list', data.yardSign && 'yard sign', data.doorKnocking && 'door knocking'].filter(Boolean).join(', ') || 'no interests'})`,
      `${data.firstName} ${data.lastName}`,
      context
    )
    await createLog('info', message, {
      email: data.email,
      phone: data.phone,
      mailingList: data.mailingList,
      yardSign: data.yardSign,
      doorKnocking: data.doorKnocking,
      ...context
    })

    return { success: true }
  } catch (error) {
    console.error('[createVolunteerSubmission]', error)

    const message = await buildLogMessage(
      `failed to submit volunteer form`,
      `${data.firstName} ${data.lastName}`,
      context
    )
    await createLog('error', message, {
      email: data.email,
      error: error instanceof Error ? error.message : String(error),
      ...context
    })

    return { success: false, error: 'Failed to submit. Please try again.' }
  }
}
