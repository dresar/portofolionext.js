"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function createProject(formData: FormData) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as string
  const demoLink = formData.get("demoLink") as string
  const githubLink = formData.get("githubLink") as string
  const technologies = formData.get("technologies") as string
  const featured = formData.get("featured") === "on"

  await prisma.project.create({
    data: {
      title,
      description,
      image: image || null,
      demoLink: demoLink || null,
      githubLink: githubLink || null,
      technologies,
      featured,
    },
  })

  revalidatePath("/admin/projects")
  revalidatePath("/")
}

export async function updateProject(id: string, formData: FormData) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as string
  const demoLink = formData.get("demoLink") as string
  const githubLink = formData.get("githubLink") as string
  const technologies = formData.get("technologies") as string
  const featured = formData.get("featured") === "on"

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      image: image || null,
      demoLink: demoLink || null,
      githubLink: githubLink || null,
      technologies,
      featured,
    },
  })

  revalidatePath("/admin/projects")
  revalidatePath("/")
}

export async function deleteProject(id: string) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  await prisma.project.delete({
    where: { id },
  })

  revalidatePath("/admin/projects")
  revalidatePath("/")
}

