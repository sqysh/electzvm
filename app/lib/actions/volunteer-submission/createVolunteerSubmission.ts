'use server'

import prisma from '@/prisma/client'

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

    return { success: true }
  } catch (error) {
    console.error('[submitVolunteerForm]', error)
    return { success: false, error: 'Failed to submit. Please try again.' }
  }
}
