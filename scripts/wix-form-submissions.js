import prisma from '../prisma/client.ts'
import { parse } from 'csv-parse/sync'
import { readFileSync } from 'fs'
import { resolve } from 'path'

async function main() {
  const filePath = resolve('/Users/sqysh/Desktop/wix-export.csv')
  const fileContent = readFileSync(filePath, 'utf-8')

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
    bom: true
  })

  // Delete all existing submissions first
  console.log('Deleting existing volunteer submissions...')
  const { count } = await prisma.volunteerSubmission.deleteMany()
  console.log(`Deleted ${count} existing submissions.\n`)

  console.log(`Found ${records.length} submissions to import...`)

  let imported = 0
  let skipped = 0
  let failed = 0

  for (const record of records) {
    const email = record['Email']?.trim().toLowerCase()

    if (!email) {
      console.warn('⚠ Skipping row — no email:', record)
      skipped++
      continue
    }

    // Check for duplicate
    const existing = await prisma.volunteerSubmission.findFirst({
      where: { email }
    })

    if (existing) {
      console.log(`⟳ Skipping duplicate: ${email}`)
      skipped++
      continue
    }

    const values = Object.values(record)
    console.log('VALUES: ', values)
    const interests = record['Interests']?.trim() ?? ''
    console.log('INTERESTS: ', interests)

    const mailingList = interests.toLowerCase().includes('mailing list')
    const yardSign = interests.toLowerCase().includes('sign in my yard')
    const doorKnocking = interests.toLowerCase().includes('door knocking')

    const firstName = record['First name']?.trim() ?? ''
    const lastName = record['Last name']?.trim() ?? ''
    const phone = record['Phone']?.trim() ?? ''
    const submissionDate = record['Submission date'] ? new Date(record['Submission date']) : new Date()

    try {
      await prisma.volunteerSubmission.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          mailingList,
          yardSign,
          doorKnocking,
          createdAt: submissionDate
        }
      })
      console.log(`✓ Imported: ${firstName} ${lastName} (${email})`)
      imported++
    } catch (error) {
      console.error(`✗ Failed to import ${email}:`, error)
      failed++
    }
  }

  console.log(`\nDone — ${imported} imported, ${skipped} skipped, ${failed} failed.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
