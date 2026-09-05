"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Plus, X } from "lucide-react"

export default function PendidikanForm() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    description: "",
    image: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement create pendidikan
    console.log("Form data:", formData)
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Tambah Pendidikan
      </Button>
    )
  }

  return (
    <Card className="glass-strong">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tambah Pendidikan</CardTitle>
            <CardDescription>Isi form untuk menambahkan riwayat pendidikan</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Institusi/Universitas *</Label>
            <Input
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Gelar/Degree</Label>
              <Input
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="S1, S2, dll"
              />
            </div>
            <div className="space-y-2">
              <Label>Jurusan/Field</Label>
              <Input
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Tanggal Mulai</Label>
              <Input
                type="month"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Tanggal Selesai</Label>
              <Input
                type="month"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                placeholder="Kosongkan jika masih berlangsung"
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
            label="Gambar Institusi"
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

