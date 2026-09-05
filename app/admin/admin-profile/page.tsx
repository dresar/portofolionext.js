import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Save } from "lucide-react"
import AdminProfileForm from "./AdminProfileForm"

export default async function AdminProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const adminProfile = await prisma.adminProfile.findUnique({
    where: { username: session.user?.name || "admin" },
  })

  return (
    <div className="space-y-2 md:space-y-3 m-0 p-0 max-w-4xl">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Admin Profile</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Kelola profil admin Anda
        </p>
      </div>

      <AdminProfileForm initialData={adminProfile} />
    </div>
  )
}

