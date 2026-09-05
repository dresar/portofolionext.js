"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Plus, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TemplateForm() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    content: "",
    type: "",
    variables: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement create template
    console.log("Form data:", formData)
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Tambah Template
      </Button>
    )
  }

  return (
    <Card className="glass-strong">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tambah Template</CardTitle>
            <CardDescription>Isi form untuk menambahkan template</CardDescription>
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
              <Label>Nama Template *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Tipe</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="page">Page</SelectItem>
                  <SelectItem value="component">Component</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <RichTextEditor
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Konten Template *</Label>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder="Tulis template..."
            />
          </div>

          <div className="space-y-2">
            <Label>Variables (JSON)</Label>
            <textarea
              value={formData.variables}
              onChange={(e) => setFormData({ ...formData, variables: e.target.value })}
              rows={4}
              className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm font-mono"
              placeholder='{"name": "string", "email": "string"}'
            />
          </div>

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

