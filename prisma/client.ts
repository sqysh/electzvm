import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaD: PrismaClient | undefined
}

const createPrismaClient = () =>
  new PrismaClient({
    log: ['error']
  })

const createPrismaDirect = () =>
  new PrismaClient({
    log: ['error'],
    datasources: { db: { url: process.env.DIRECT_URL } }
  })

export const prisma = globalForPrisma.prisma ?? createPrismaClient()
export const prismaD = globalForPrisma.prismaD ?? createPrismaDirect()

if (process.env.NODE_ENV === 'production') {
  setInterval(async () => {
    const connections = await prismaD.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count 
      FROM pg_stat_activity 
      WHERE datname = current_database()
    `.catch(() => [{ count: BigInt(0) }])

    const count = Number(connections[0]?.count || 0)

    if (count > 25) {
      console.warn(`⚠️ HIGH DB CONNECTIONS: ${count}/901`)
    }
  }, 300000)
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  globalForPrisma.prismaD = prismaD
}

export default prisma
