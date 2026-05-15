import prisma from '@/prisma/client'
import AdminInquiriesClient from './AdminInquiriesClient'

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.volunteerSubmission.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return <AdminInquiriesClient inquiries={inquiries} />
}
