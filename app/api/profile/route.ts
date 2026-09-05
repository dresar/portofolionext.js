import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Route segment config untuk caching
export const dynamic = 'force-dynamic' // Force dynamic untuk no-cache (live server mode)

export async function GET() {
  try {
    // Optimize query - hanya ambil field yang diperlukan
    const profile = await prisma.profile.findFirst({
      orderBy: { createdAt: "desc" },
      select: {
        fullName: true,
        title: true,
        professions: true,
        bio: true,
        shortDescriptionHome: true,
        secondDescriptionHome: true,
        avatar: true,
        heroPhoto: true,
        email: true,
        phone: true,
        whatsapp: true,
        location: true,
        website: true,
        linkedin: true,
        github: true,
        twitter: true,
        instagram: true,
        facebook: true,
        cvUrl: true,
        projectCompleted: true,
        yearsExperience: true,
        specialCourses: true,
        satisfiedClients: true,
      },
    })
    
    // Return empty object with default values if no profile exists
    if (!profile) {
      return NextResponse.json({
        fullName: "Developer",
        title: "Full Stack Developer",
        professions: "Web Development, UI UX",
        bio: "Selamat datang di portofolio saya.",
        shortDescriptionHome: "Selamat datang di portofolio saya.",
        secondDescriptionHome: "",
        avatar: null,
        heroPhoto: null,
        email: null,
        phone: null,
        whatsapp: null,
        location: null,
        website: null,
        linkedin: null,
        github: null,
        twitter: null,
        instagram: null,
        facebook: null,
        cvUrl: null,
        projectCompleted: 0,
        yearsExperience: 0,
        specialCourses: 0,
        satisfiedClients: 0,
      })
    }
    
    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data profil" },
      { status: 500 }
    )
  }
}

