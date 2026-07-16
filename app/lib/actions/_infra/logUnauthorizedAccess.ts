'use server'

import { buildLogMessage } from '../../utils/_log.client.utils'
import { getRequestDetails } from '../../utils/_log.server.utils'
import { createLog } from './createLog'

export async function logUnauthorizedAccess(error: string) {
  const context = await getRequestDetails()
  const message = buildLogMessage(
    `attempted to access admin portal and was denied (${error})`,
    'Unauthenticated User',
    context
  )
  await createLog('warn', message, { authError: error, ...context })
}
