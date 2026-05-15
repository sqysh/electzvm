'use server'

import { buildLogMessage, createLog, getRequestContext } from '../../utils/log.utils'
import { getActor } from '../user/getActor'

export async function getMailchimpMembers() {
  const [context, actor] = await Promise.all([getRequestContext(), getActor()])

  try {
    const response = await fetch(
      `https://us15.api.mailchimp.com/3.0/lists/78bf581442/members?count=1000&fields=members.id,members.email_address,members.full_name,members.status,members.timestamp_opt,members.merge_fields`,
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

    const message = await buildLogMessage(`fetched ${data.members.length} Mailchimp members`, actor, context)
    await createLog('info', message, { count: data.members.length, ...context })

    return { success: true, data: data.members }
  } catch (error) {
    console.error('[getMailchimpMembers]', error)

    const message = await buildLogMessage('failed to fetch Mailchimp members', actor, context)
    await createLog('error', message, {
      error: error instanceof Error ? error.message : String(error),
      ...context
    })

    return { success: false, error: 'Failed to fetch members.' }
  }
}
