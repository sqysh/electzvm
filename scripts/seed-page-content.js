import prisma from '../prisma/client.ts'
import { contactFields } from '../app/lib/constants/page-content-editor.constants.ts'

async function main() {
  const existing = await prisma.page.findUnique({ where: { slug: 'contact' } })

  if (existing) {
    console.log('Contact page already exists — skipping.')
    return
  }

  await prisma.page.create({
    data: {
      slug: 'contact',
      content: contactFields,
      createdBy: 'seed'
    }
  })

  console.log('✓ Contact page seeded successfully.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
