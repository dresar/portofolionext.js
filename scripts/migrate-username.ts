import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Migrating users to add username...')
  
  const users = await prisma.user.findMany()
  
  for (const user of users) {
    if (!user.username) {
      // Generate username from email or use default
      const username = user.email 
        ? user.email.split('@')[0] 
        : `user_${user.id.slice(0, 8)}`
      
      await prisma.user.update({
        where: { id: user.id },
        data: { username }
      })
      
      console.log(`✅ Updated user ${user.id} with username: ${username}`)
    }
  }
  
  console.log('✅ Migration complete!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

