import prisma from '../prisma/client.ts'
import { contactFields } from '../app/lib/constants/page-content-editor.constants.ts'

async function main() {
  await prisma.page.upsert({
    where: { slug: 'contact' },
    update: { content: contactFields },
    create: {
      slug: 'contact',
      content: contactFields,
      createdBy: 'seed'
    }
  })

  console.log('✓ Contact page seeded/updated successfully.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
