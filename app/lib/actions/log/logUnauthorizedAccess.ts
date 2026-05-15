'use server'

import { buildLogMessage, createLog, getRequestContext } from '../../utils/log.utils'

export async function logUnauthorizedAccess(error: string) {
  const context = await getRequestContext()
  const message = await buildLogMessage(
    `attempted to access admin portal and was denied (${error})`,
    'Unauthenticated User',
    context
  )
  await createLog('warn', message, { authError: error, ...context })
}
