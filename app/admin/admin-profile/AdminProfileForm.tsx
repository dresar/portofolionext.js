"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Save } from "lucide-react"

type AdminProfileFormProps = {
  initialData?: {
    id: string
    username: string
    name: string
    email: string | null
    avatar: string | null
    bio: string | null
    role: string
  } | null
}

export default function AdminProfileForm({ initialData }: AdminProfileFormProps) {
  const [formData, setFormData] = useState({
    username: initialData?.username || "",
    name: initialData?.name || "",
    email: initialData?.email || "",
    avatar: initialData?.avatar || "",
    bio: initialData?.bio || "",
    role: initialData?.role || "admin",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement update admin profile
    console.log("Form data:", formData)
  }

  return (
    <Card className="glass-strong">
      <CardHeader>
        <CardTitle>Edit Profil Admin</CardTitle>
        <CardDescription>Perbarui informasi profil admin Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Username *</Label>
              <Input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                disabled={!!initialData}
              />
            </div>
            <div className="space-y-2">
              <Label>Nama *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <RichTextEditor
              value={formData.bio}
              onChange={(value) => setFormData({ ...formData, bio: value })}
            />
          </div>

          <ImageUpload
            value={formData.avatar}
            onChange={(url) => setFormData({ ...formData, avatar: url })}
            label="Avatar"
          />

          <Button type="submit" className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Simpan Perubahan
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

