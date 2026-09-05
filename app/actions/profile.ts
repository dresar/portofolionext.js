"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"

export async function createProfile(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")

  await prisma.profile.create({
    data: {
      fullName: formData.get("fullName") as string,
      title: formData.get("title") as string || null,
      professions: formData.get("professions") as string || null,
      bio: formData.get("bio") as string || "",
      shortDescriptionHome: formData.get("shortDescriptionHome") as string || null,
      secondDescriptionHome: formData.get("secondDescriptionHome") as string || null,
      avatar: formData.get("avatar") as string || null,
      heroPhoto: formData.get("heroPhoto") as string || null,
      email: formData.get("email") as string || null,
      phone: formData.get("phone") as string || null,
      whatsapp: formData.get("whatsapp") as string || null,
      location: formData.get("location") as string || null,
      website: formData.get("website") as string || null,
      linkedin: formData.get("linkedin") as string || null,
      github: formData.get("github") as string || null,
      twitter: formData.get("twitter") as string || null,
      instagram: formData.get("instagram") as string || null,
      facebook: formData.get("facebook") as string || null,
      cvUrl: formData.get("cvUrl") as string || null,
      projectCompleted: parseInt(formData.get("projectCompleted") as string) || 0,
      yearsExperience: parseInt(formData.get("yearsExperience") as string) || 0,
      specialCourses: parseInt(formData.get("specialCourses") as string) || 0,
      satisfiedClients: parseInt(formData.get("satisfiedClients") as string) || 0,
    },
  })

  revalidatePath("/admin/profil")
  revalidatePath("/")
}

export async function updateProfile(id: string, formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")

  await prisma.profile.update({
    where: { id },
    data: {
      fullName: formData.get("fullName") as string,
      title: formData.get("title") as string || null,
      professions: formData.get("professions") as string || null,
      bio: formData.get("bio") as string || "",
      shortDescriptionHome: formData.get("shortDescriptionHome") as string || null,
      secondDescriptionHome: formData.get("secondDescriptionHome") as string || null,
      avatar: formData.get("avatar") as string || null,
      heroPhoto: formData.get("heroPhoto") as string || null,
      email: formData.get("email") as string || null,
      phone: formData.get("phone") as string || null,
      whatsapp: formData.get("whatsapp") as string || null,
      location: formData.get("location") as string || null,
      website: formData.get("website") as string || null,
      linkedin: formData.get("linkedin") as string || null,
      github: formData.get("github") as string || null,
      twitter: formData.get("twitter") as string || null,
      instagram: formData.get("instagram") as string || null,
      facebook: formData.get("facebook") as string || null,
      cvUrl: formData.get("cvUrl") as string || null,
      projectCompleted: parseInt(formData.get("projectCompleted") as string) || 0,
      yearsExperience: parseInt(formData.get("yearsExperience") as string) || 0,
      specialCourses: parseInt(formData.get("specialCourses") as string) || 0,
      satisfiedClients: parseInt(formData.get("satisfiedClients") as string) || 0,
    },
  })

  revalidatePath("/admin/profil")
  revalidatePath("/")
}

export async function deleteProfile(id: string) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")

  await prisma.profile.delete({ where: { id } })
  revalidatePath("/admin/profil")
}

