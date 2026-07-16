import { RequestDetails } from './_log.server.utils'

export function buildLogMessage(action: string, actor: string, context: RequestDetails) {
  const time = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York'
  })

  return `${actor} ${action} on ${context.device} (${context.browser} · ${context.os}) at ${time}`
}

export function getErrorMessage(error: unknown, fallback = 'Unable to process request.'): string {
  try {
    if (
      error &&
      typeof error === 'object' &&
      'data' in error &&
      error.data &&
      typeof error.data === 'object' &&
      'message' in error.data
    ) {
      return String((error.data as { message: unknown }).message)
    }

    if (error instanceof Error) {
      return error.message
    }

    if (typeof error === 'string') {
      return error
    }
  } catch {
    // fall through
  }

  return fallback
}
