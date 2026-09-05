import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditProfileForm from "./EditProfileForm"

export default async function EditProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const { id } = await params
  const profile = await prisma.profile.findUnique({
    where: { id },
  })

  if (!profile) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Edit Profil</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Edit profil: {profile.fullName}
        </p>
      </div>

      <EditProfileForm profile={profile} />
    </div>
  )
}

