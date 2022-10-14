import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function generateUsers() {
  const alice = await prisma.user.upsert({
    where: { username: 'Alice' },
    update: {},
    create: {
      username: 'Alice',
      password: 'somepass',
      group: 'faculty'
    },
  })

  const bob = await prisma.user.upsert({
    where: { username: 'Bob' },
    update: {},
    create: {
      username: 'Bob',
      password: 'passsome',
      group: 'students'
    },
  })
}

async function main() {
  await generateUsers();
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })