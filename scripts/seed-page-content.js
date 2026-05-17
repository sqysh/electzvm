import prisma from '../prisma/client.ts'
import { homeFields } from '../app/lib/constants/page-content-editor.constants.ts'

async function main() {
  await prisma.page.upsert({
    where: { slug: 'home' },
    update: { content: homeFields },
    create: {
      slug: 'home',
      content: homeFields,
      createdBy: 'seed'
    }
  })

  console.log('✓ Home page seeded/updated successfully.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
