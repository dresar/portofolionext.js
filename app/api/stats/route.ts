import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Route segment config untuk caching
export const dynamic = 'force-dynamic' // Force dynamic untuk no-cache (live server mode)

export async function GET() {
  try {
    // Optimize: Get stats from Profile first (if available) - hanya ambil field yang diperlukan
    const profile = await prisma.profile.findFirst({
      orderBy: { createdAt: "desc" },
      select: {
        yearsExperience: true,
        projectCompleted: true,
        specialCourses: true,
        satisfiedClients: true,
      },
    })

    if (profile) {
      // Parallel count untuk sertifikat
      const sertifikatCount = await prisma.sertifikat.count()
      
      return NextResponse.json({
        yearsExperience: profile.yearsExperience || 0,
        projectCount: profile.projectCompleted || 0,
        sertifikatCount,
        specialCourses: profile.specialCourses || 0,
        satisfiedClients: profile.satisfiedClients || 0,
      })
    }

    // Fallback: Optimize dengan parallel queries dan hanya ambil field yang diperlukan
    const [projectCount, sertifikatCount] = await Promise.all([
      prisma.project.count(),
      prisma.sertifikat.count(),
    ])

    // Optimize: hanya ambil field yang diperlukan untuk calculate experience
    const pengalaman = await prisma.pengalaman.findMany({
      select: {
        startDate: true,
        endDate: true,
        current: true,
      },
    })
    
    let totalMonths = 0
    pengalaman.forEach((exp) => {
      const start = new Date(exp.startDate)
      const end = exp.current ? new Date() : new Date(exp.endDate || exp.startDate)
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
      totalMonths += months
    })
    const yearsExperience = Math.floor(totalMonths / 12)

    return NextResponse.json({
      yearsExperience: yearsExperience || 0,
      projectCount,
      sertifikatCount,
      specialCourses: 0,
      satisfiedClients: 0,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil statistik" },
      { status: 500 }
    )
  }
}

