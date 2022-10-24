import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function generateUsers() {
  const alice = await prisma.user.upsert({
    where: { username: 'Alice' },
    update: {},
    create: {
      username: 'Alice',
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
    where: { username: 'Bob' },
    update: {},
    create: {
      username: 'Bob',
      password: 'passsome',
      group: 'students',
      preferences: {
        create: {
          darkmode: false,
        }
      }
    },
  })
}

// async function generatePreferences() {

//   const aliceUid = 'Alice';

//   const user = prisma.user.findUnique({where: {username: aliceUid}});


//   const alicePreference = await prisma.preferences.upsert({
//     where: {uid: aliceUid }, 
//     update: {},
//     create: {
//       uid: aliceUid,
//       darkmode: false,
//       user: user
//     },
//   })

//   const bobUid = 'Bob';

//   const bobPreference = await prisma.preferences.upsert({
//     where: {uid: bobUid }, 
//     update: {},
//     create: {
//       uid: bobUid,
//       darkmde: false,
//       user: prisma.user.findUnique({where: {username: bobUid}})
//     },
//   })
  
// }


async function main() {
  await generateUsers();
  //await generatePreferences();
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })