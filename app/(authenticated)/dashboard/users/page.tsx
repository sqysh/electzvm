import prisma from '@/prisma/client'
import AdminUsersClient from './AdminUsersClient'

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true
    }
  })

  return <AdminUsersClient users={users} />
}
