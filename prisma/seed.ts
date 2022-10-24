import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function generateUsers() {    
  
  const aliceUid = 'Alice';
  const bobUid = 'Bob';
  const chrisUid = 'cxarausa';

  const alice = await prisma.user.upsert({

    where: { username: aliceUid },
    update: {},
    create: {
      username: aliceUid,
      password: 'somepass',
      group: 'faculty',
      preferences: {
        create: {
          darkmode: true,
        }
      }
    },
  })

  const bob = await prisma.user.upsert({
    where: { username: bobUid },
    update: {},
    create: {
      username: bobUid,
      password: 'passsome',
      group: 'students',
      preferences: {
        create: {
          darkmode: false,
        }
      }
    },
  })

  const cxarausa = await prisma.user.upsert({
    where: { username: chrisUid },
    update: {},
    create: {
      username: chrisUid,
      password: 'somepassword',
      group: 'faculty',
      preferences: {
        create: {
          darkmode: true,
        }
      }
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