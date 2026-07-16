'use server'

import { getActor } from '../../auth/getActor'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'
import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import { createLog } from '../../_infra/createLog'

export async function getMailchimpMembers() {
  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    const response = await fetch(
      `https://us15.api.mailchimp.com/3.0/lists/78bf581442/members?count=1000&fields=members.id,members.email_address,members.full_name,members.status,members.timestamp_opt,members.merge_fields,members.contact_id`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail ?? 'Failed to fetch Mailchimp members.')
    }

    const data = await response.json()

    const members = Array.isArray(data.members) ? data.members : []

    const message = buildLogMessage(`fetched ${members.length} Mailchimp members`, actor, context)
    await createLog('info', message, { count: members.length, ...context })

    return { success: true, data: data.members }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[getMailchimpMembers] unavailable:', error instanceof Error ? error.message : error)
    }

    const message = await buildLogMessage('failed to fetch Mailchimp members', actor, context)
    await createLog('error', message, {
      error: error instanceof Error ? error.message : String(error),
      ...context
    })

    return {
      success: false,
      error:
        'Mailchimp is temporarily unavailable. This is likely scheduled maintenance on their end. Your subscriber data is safe — check back shortly or visit mailchimp.com for status updates.'
    }
  }
}
