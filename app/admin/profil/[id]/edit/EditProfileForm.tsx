"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Save, User, Briefcase, Mail, Phone, MapPin, Camera, FileText, Share2, BarChart3, FileText as PdfIcon, ExternalLink } from "lucide-react"
import { updateProfile } from "@/app/actions/profile"

type Profile = {
  id: string
  fullName: string
  title: string | null
  professions: string | null
  bio: string
  shortDescriptionHome: string | null
  secondDescriptionHome: string | null
  avatar: string | null
  heroPhoto: string | null
  email: string | null
  phone: string | null
  whatsapp: string | null
  location: string | null
  website: string | null
  linkedin: string | null
  github: string | null
  twitter: string | null
  instagram: string | null
  facebook: string | null
  cvUrl: string | null
  projectCompleted: number
  yearsExperience: number
  specialCourses: number
  satisfiedClients: number
}

type EditProfileFormProps = {
  profile: Profile
}

export default function EditProfileForm({ profile }: EditProfileFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: profile.fullName || "",
    title: profile.title || "",
    professions: profile.professions || "",
    bio: profile.bio || "",
    shortDescriptionHome: profile.shortDescriptionHome || "",
    secondDescriptionHome: profile.secondDescriptionHome || "",
    avatar: profile.avatar || "",
    heroPhoto: profile.heroPhoto || "",
    email: profile.email || "",
    phone: profile.phone || "",
    whatsapp: profile.whatsapp || "",
    location: profile.location || "",
    website: profile.website || "",
    linkedin: profile.linkedin || "",
    github: profile.github || "",
    twitter: profile.twitter || "",
    instagram: profile.instagram || "",
    facebook: profile.facebook || "",
    cvUrl: profile.cvUrl || "",
    projectCompleted: profile.projectCompleted.toString(),
    yearsExperience: profile.yearsExperience.toString(),
    specialCourses: profile.specialCourses.toString(),
    satisfiedClients: profile.satisfiedClients.toString(),
  })

  const handleFileUpload = async (file: File, type: "hero" | "about" | "cv") => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("file", file)
      formDataToSend.append("folder", type === "cv" ? "cv" : "uploads")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) throw new Error("Upload failed")

      const data = await response.json()
      if (type === "hero") {
        setFormData({ ...formData, heroPhoto: data.url })
      } else if (type === "about") {
        setFormData({ ...formData, avatar: data.url })
      } else if (type === "cv") {
        setFormData({ ...formData, cvUrl: data.url })
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Gagal mengupload file")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })

      await updateProfile(profile.id, formDataToSend)
      router.push("/admin/profil")
      router.refresh()
    } catch (error) {
      console.error("Error:", error)
      alert("Gagal menyimpan profil")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nama *
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="professions" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Seorang Apa
                </Label>
                <Input
                  id="professions"
                  value={formData.professions}
                  onChange={(e) => setFormData({ ...formData, professions: e.target.value })}
                  placeholder="Web Development, UI UX"
                />
                <p className="text-xs text-muted-foreground">
                  Pisahkan dengan koma untuk multiple profesi
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Alamat
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              {/* Foto Formal */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Foto Formal (Hero Section)
                </Label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file, "hero")
                    }}
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {formData.heroPhoto && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-2">Foto saat ini:</p>
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                        <img
                          src={formData.heroPhoto}
                          alt="Hero Photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Deskripsi Singkat */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Deskripsi Singkat (Home)
                </Label>
                <textarea
                  value={formData.shortDescriptionHome}
                  onChange={(e) => setFormData({ ...formData, shortDescriptionHome: e.target.value })}
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  placeholder="Selamat datang di portofolio saya."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Professional Info */}
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle>Informasi Profesional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Jabatan *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telepon
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>

              {/* Foto Non-Formal */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Foto Non-Formal (About Me)
                </Label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file, "about")
                    }}
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {formData.avatar && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-2">Foto about saat ini:</p>
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                        <img
                          src={formData.avatar}
                          alt="About Photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Deskripsi Lengkap */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle>Deskripsi Lengkap (About)</CardTitle>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            value={formData.bio}
            onChange={(value) => setFormData({ ...formData, bio: value })}
            placeholder="Tulis deskripsi lengkap tentang Anda..."
          />
        </CardContent>
      </Card>

      {/* Deskripsi Kedua */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle>Deskripsi Kedua (Home)</CardTitle>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            value={formData.secondDescriptionHome}
            onChange={(value) => setFormData({ ...formData, secondDescriptionHome: value })}
            placeholder="Tulis deskripsi kedua untuk home page..."
          />
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Social Media Links
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="github" className="flex items-center gap-2">
                <span>🔗</span>
                GitHub URL
              </Label>
              <Input
                id="github"
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <span>🔗</span>
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook" className="flex items-center gap-2">
                <span>🔗</span>
                Facebook URL
              </Label>
              <Input
                id="facebook"
                type="url"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                placeholder="https://facebook.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <span>🔗</span>
                Instagram URL
              </Label>
              <Input
                id="instagram"
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="https://instagram.com/username"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistik Pencapaian */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Statistik Pencapaian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="projectCompleted" className="flex items-center gap-2">
                <span>✓</span>
                Project Selesai
              </Label>
              <Input
                id="projectCompleted"
                type="number"
                value={formData.projectCompleted}
                onChange={(e) => setFormData({ ...formData, projectCompleted: e.target.value })}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearsExperience" className="flex items-center gap-2">
                <span>📅</span>
                Tahun Pengalaman
              </Label>
              <Input
                id="yearsExperience"
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialCourses" className="flex items-center gap-2">
                <span>🎓</span>
                Kursus Khusus
              </Label>
              <Input
                id="specialCourses"
                type="number"
                value={formData.specialCourses}
                onChange={(e) => setFormData({ ...formData, specialCourses: e.target.value })}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="satisfiedClients" className="flex items-center gap-2">
                <span>😊</span>
                Klien Puas
              </Label>
              <Input
                id="satisfiedClients"
                type="number"
                value={formData.satisfiedClients}
                onChange={(e) => setFormData({ ...formData, satisfiedClients: e.target.value })}
                min="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CV/Resume */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PdfIcon className="w-5 h-5" />
            CV/Resume (PDF)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file, "cv")
              }}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            {formData.cvUrl && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground mb-2">CV saat ini:</p>
                <a
                  href={formData.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Lihat CV
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button type="submit" size="lg" disabled={loading} className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.back()}
        >
          Batal
        </Button>
      </div>
    </form>
  )
}

