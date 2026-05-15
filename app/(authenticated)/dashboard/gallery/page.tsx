import prisma from '@/prisma/client'
import AdminGalleryClient from './AdminGalleryClient'

export default async function AdminGalleryPage() {
  const media = await prisma.galleryItem.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return <AdminGalleryClient media={media} />
}
