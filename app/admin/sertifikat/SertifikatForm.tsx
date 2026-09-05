"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Plus, X } from "lucide-react"

export default function SertifikatForm() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
    description: "",
    image: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement create sertifikat
    console.log("Form data:", formData)
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Tambah Sertifikat
      </Button>
    )
  }

  return (
    <Card className="glass-strong">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tambah Sertifikat</CardTitle>
            <CardDescription>Isi form untuk menambahkan sertifikat</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Judul Sertifikat *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Penerbit/Issuer *</Label>
              <Input
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Tanggal Diterbitkan *</Label>
              <Input
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Tanggal Berakhir</Label>
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Credential ID</Label>
              <Input
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Credential URL</Label>
              <Input
                type="url"
                value={formData.credentialUrl}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <RichTextEditor
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
            />
          </div>

          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            label="Gambar Sertifikat"
          />

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Simpan
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

