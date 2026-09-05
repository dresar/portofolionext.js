"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Plus, X } from "lucide-react"

export default function PengalamanForm() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    location: "",
    image: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement create pengalaman
    console.log("Form data:", formData)
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Tambah Pengalaman
      </Button>
    )
  }

  return (
    <Card className="glass-strong">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tambah Pengalaman</CardTitle>
            <CardDescription>Isi form untuk menambahkan pengalaman kerja</CardDescription>
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
              <Label>Perusahaan *</Label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Posisi/Jabatan *</Label>
              <Input
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Tanggal Mulai *</Label>
              <Input
                type="month"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Tanggal Selesai</Label>
              <Input
                type="month"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                disabled={formData.current}
              />
            </div>
            <div className="space-y-2">
              <Label>Lokasi</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="current"
              checked={formData.current}
              onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="current">Masih bekerja di sini</Label>
          </div>

          <div className="space-y-2">
            <Label>Deskripsi *</Label>
            <RichTextEditor
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
            />
          </div>

          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            label="Logo Perusahaan"
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

