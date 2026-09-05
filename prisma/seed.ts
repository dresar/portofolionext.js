import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Memulai seeding database...')

  // Hapus data lama jika ada
  await prisma.message.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()

  // Buat admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      name: 'Admin',
      password: hashedPassword,
    },
  })

  console.log('✅ Admin user dibuat:', admin.username)

  // Buat beberapa project dummy
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Platform e-commerce modern dengan fitur pembayaran terintegrasi dan manajemen inventori real-time.',
      image: 'https://via.placeholder.com/800x600/00ffff/000000?text=E-Commerce',
      demoLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      technologies: 'Next.js, TypeScript, Prisma, Stripe',
      featured: true,
    },
    {
      title: 'Dashboard Analytics',
      description: 'Dashboard analytics dengan visualisasi data interaktif dan real-time updates.',
      image: 'https://via.placeholder.com/800x600/ff00ff/ffffff?text=Dashboard',
      demoLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      technologies: 'React, D3.js, Node.js, PostgreSQL',
      featured: true,
    },
    {
      title: 'Mobile App - Task Manager',
      description: 'Aplikasi mobile untuk manajemen tugas dengan fitur kolaborasi tim dan notifikasi push.',
      image: 'https://via.placeholder.com/800x600/00ff00/000000?text=Mobile+App',
      demoLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      technologies: 'React Native, Firebase, Redux',
      featured: false,
    },
  ]

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    })
  }

  console.log(`✅ ${projects.length} project dummy dibuat`)

  // Buat beberapa message dummy
  const messages = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Kerjasama Project',
      message: 'Halo, saya tertarik untuk bekerjasama dalam project web development. Apakah Anda available?',
      read: false,
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Pertanyaan tentang Portfolio',
      message: 'Saya melihat portfolio Anda dan sangat tertarik. Bisa kita diskusikan lebih lanjut?',
      read: true,
    },
  ]

  for (const message of messages) {
    await prisma.message.create({
      data: message,
    })
  }

  console.log(`✅ ${messages.length} message dummy dibuat`)
  console.log('🎉 Seeding selesai!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

