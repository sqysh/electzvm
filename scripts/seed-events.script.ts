import { EventStatus, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const events = [
  {
    title: 'Phone Banking — Virtual Call Time Party',
    description:
      "Join us virtually via Zoom for a call time party. We'll be making calls together to reach voters across the 9th Essex District.",
    location: 'Zoom (Virtual)',
    address: null,
    startDate: new Date('2026-07-14T17:30:00'),
    endDate: new Date('2026-07-14T19:30:00'), // estimate — adjust if you have an end time
    externalUrl: null,
    isPublished: true,
    isFeatured: false,
    status: 'PUBLISHED' as EventStatus
  },
  {
    title: 'Joint Canvassing at Gowdy Park',
    description:
      "Join us for a joint canvassing session at Gowdy Park Tennis Courts. We'll be going door to door to connect with neighbors across the district.",
    location: 'Gowdy Park Tennis Courts',
    address: '471 Cedar Brook Rd, Lynn, MA',
    startDate: new Date('2026-07-15T17:30:00'),
    endDate: new Date('2026-07-15T19:30:00'),
    externalUrl: null,
    isPublished: true,
    isFeatured: false,
    status: 'PUBLISHED' as EventStatus
  },
  {
    title: 'Door Knocking — Upper Common, Wakefield',
    description:
      'Meet us at the Upper Common to knock doors and talk with voters in Wakefield about the issues that matter most to the 9th Essex District.',
    location: 'Upper Common',
    address: 'Park St @ Main St, Wakefield, MA',
    startDate: new Date('2026-07-18T11:00:00'),
    endDate: new Date('2026-07-18T13:00:00'),
    externalUrl: null,
    isPublished: true,
    isFeatured: false,
    status: 'PUBLISHED' as EventStatus
  },
  {
    title: 'Phone Banking — Virtual Call Time Party',
    description:
      "Join us virtually via Zoom for a call time party. We'll be making calls together to reach voters across the 9th Essex District.",
    location: 'Zoom (Virtual)',
    address: null,
    startDate: new Date('2026-07-21T17:30:00'),
    endDate: new Date('2026-07-21T19:30:00'),
    externalUrl: null,
    isPublished: true,
    isFeatured: false,
    status: 'PUBLISHED' as EventStatus
  },
  {
    title: 'Door Knocking — Parker Pickleball Court, Saugus',
    description:
      'Join us for an afternoon of door knocking in Saugus. Meet at Parker Pickleball Court and help us connect with voters ahead of the primary.',
    location: 'Parker Pickleball Court',
    address: '108 Essex St, Saugus, MA',
    startDate: new Date('2026-07-25T11:00:00'),
    endDate: new Date('2026-07-25T13:00:00'),
    externalUrl: null,
    isPublished: true,
    isFeatured: false,
    status: 'PUBLISHED' as EventStatus
  }
]

async function main() {
  for (const event of events) {
    const created = await prisma.event.create({ data: event })
    console.log(`Created: ${created.title}`)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
