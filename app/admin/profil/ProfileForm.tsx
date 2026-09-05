"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Plus, X, User, Briefcase, Mail, Phone, MapPin, Camera, FileText, Share2, BarChart3, FileText as PdfIcon, ExternalLink, Save } from "lucide-react"
import { updateProfile, createProfile } from "@/app/actions/profile"

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

type ProfileFormProps = {
  existingProfile?: Profile | null
}

export default function ProfileForm({ existingProfile }: ProfileFormProps) {
  const router = useRouter()
  const [open, setOpen] = useState(!existingProfile) // Auto open jika tidak ada profile
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: existingProfile?.fullName || "",
    title: existingProfile?.title || "",
    professions: existingProfile?.professions || "",
    bio: existingProfile?.bio || "",
    shortDescriptionHome: existingProfile?.shortDescriptionHome || "",
    secondDescriptionHome: existingProfile?.secondDescriptionHome || "",
    avatar: existingProfile?.avatar || "",
    heroPhoto: existingProfile?.heroPhoto || "",
    email: existingProfile?.email || "",
    phone: existingProfile?.phone || "",
    whatsapp: existingProfile?.whatsapp || "",
    location: existingProfile?.location || "",
    website: existingProfile?.website || "",
    linkedin: existingProfile?.linkedin || "",
    github: existingProfile?.github || "",
    twitter: existingProfile?.twitter || "",
    instagram: existingProfile?.instagram || "",
    facebook: existingProfile?.facebook || "",
    cvUrl: existingProfile?.cvUrl || "",
    projectCompleted: existingProfile?.projectCompleted.toString() || "0",
    yearsExperience: existingProfile?.yearsExperience.toString() || "0",
    specialCourses: existingProfile?.specialCourses.toString() || "0",
    satisfiedClients: existingProfile?.satisfiedClients.toString() || "0",
  })

  useEffect(() => {
    if (existingProfile) {
      setFormData({
        fullName: existingProfile.fullName || "",
        title: existingProfile.title || "",
        professions: existingProfile.professions || "",
        bio: existingProfile.bio || "",
        shortDescriptionHome: existingProfile.shortDescriptionHome || "",
        secondDescriptionHome: existingProfile.secondDescriptionHome || "",
        avatar: existingProfile.avatar || "",
        heroPhoto: existingProfile.heroPhoto || "",
        email: existingProfile.email || "",
        phone: existingProfile.phone || "",
        whatsapp: existingProfile.whatsapp || "",
        location: existingProfile.location || "",
        website: existingProfile.website || "",
        linkedin: existingProfile.linkedin || "",
        github: existingProfile.github || "",
        twitter: existingProfile.twitter || "",
        instagram: existingProfile.instagram || "",
        facebook: existingProfile.facebook || "",
        cvUrl: existingProfile.cvUrl || "",
        projectCompleted: existingProfile.projectCompleted.toString(),
        yearsExperience: existingProfile.yearsExperience.toString(),
        specialCourses: existingProfile.specialCourses.toString(),
        satisfiedClients: existingProfile.satisfiedClients.toString(),
      })
    }
  }, [existingProfile])

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

      if (existingProfile) {
        await updateProfile(existingProfile.id, formDataToSend)
      } else {
        await createProfile(formDataToSend)
      }

      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error:", error)
      alert("Gagal menyimpan profil")
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <Button 
        onClick={() => setOpen(true)} 
        size="sm"
        className="text-xs md:text-sm"
      >
        {existingProfile ? (
          <>
            <FileText className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            Edit Profil
          </>
        ) : (
          <>
            <Plus className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            Tambah Profil
          </>
        )}
      </Button>
    )
  }

  return (
    <Card className="glass-strong w-full max-w-7xl mx-auto border-primary/20 shadow-lg">
      <CardHeader className="pb-4 md:pb-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              {existingProfile ? "Edit Profil" : "Tambah Profil Baru"}
            </CardTitle>
            <CardDescription className="text-xs md:text-sm mt-1.5">
              {existingProfile ? "Edit informasi profil Anda" : "Isi form untuk menambahkan profil"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive">
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 md:pt-8">
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          {/* Informasi Dasar - Grid 2 Kolom di Desktop */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-base md:text-lg font-semibold">Informasi Dasar</h3>
            </div>
            
            <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
              {/* Kolom Kiri */}
              <div className="space-y-4 md:space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2 text-sm md:text-base font-medium">
                    <User className="w-4 h-4 text-primary" />
                    Nama Lengkap *
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-2 text-sm md:text-base font-medium">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Jabatan / Posisi *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                    placeholder="Contoh: Full Stack Developer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="professions" className="flex items-center gap-2 text-sm md:text-base font-medium">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Profesi / Keahlian
                  </Label>
                  <Input
                    id="professions"
                    value={formData.professions}
                    onChange={(e) => setFormData({ ...formData, professions: e.target.value })}
                    placeholder="Web Development, UI/UX Design"
                    className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Pisahkan dengan koma untuk multiple profesi
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm md:text-base font-medium">
                    <Mail className="w-4 h-4 text-primary" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2 text-sm md:text-base font-medium">
                    <MapPin className="w-4 h-4 text-primary" />
                    Lokasi / Alamat
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                    placeholder="Kota, Negara"
                  />
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4 md:space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-sm md:text-base font-medium">
                    <Phone className="w-4 h-4 text-primary" />
                    Nomor Telepon
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                    placeholder="+62 812-3456-7890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="flex items-center gap-2 text-sm md:text-base font-medium">
                    <Phone className="w-4 h-4 text-primary" />
                    WhatsApp
                  </Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                    placeholder="+62 812-3456-7890"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm md:text-base font-medium">
                    <Camera className="w-4 h-4 text-primary" />
                    Foto Formal (Hero Section)
                  </Label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file, "hero")
                      }}
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                    />
                    {formData.heroPhoto && (
                      <div className="mt-3 p-3 rounded-lg bg-background/50 border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-primary/30">
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

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm md:text-base font-medium">
                    <Camera className="w-4 h-4 text-primary" />
                    Foto Non-Formal (About Me)
                  </Label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file, "about")
                      }}
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                    />
                    {formData.avatar && (
                      <div className="mt-3 p-3 rounded-lg bg-background/50 border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-primary/30">
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

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm md:text-base font-medium">
                    <FileText className="w-4 h-4 text-primary" />
                    Deskripsi Singkat (Home)
                  </Label>
                  <textarea
                    value={formData.shortDescriptionHome}
                    onChange={(e) => setFormData({ ...formData, shortDescriptionHome: e.target.value })}
                    rows={3}
                    className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2.5 text-sm md:text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-none border-primary/20"
                    placeholder="Selamat datang di portofolio saya..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Deskripsi Lengkap - Full Width */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-base md:text-lg font-semibold">Deskripsi</h3>
            </div>
            
            <div className="space-y-4 md:space-y-5">
              <div className="space-y-2">
                <Label className="text-sm md:text-base font-medium">Deskripsi Lengkap (About Me)</Label>
                <div className="border border-primary/20 rounded-lg p-2 bg-background/50">
                  <RichTextEditor
                    value={formData.bio}
                    onChange={(value) => setFormData({ ...formData, bio: value })}
                    placeholder="Tulis deskripsi lengkap tentang Anda, pengalaman, keahlian, dan passion..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm md:text-base font-medium">Deskripsi Kedua (Home Page)</Label>
                <div className="border border-primary/20 rounded-lg p-2 bg-background/50">
                  <RichTextEditor
                    value={formData.secondDescriptionHome}
                    onChange={(value) => setFormData({ ...formData, secondDescriptionHome: value })}
                    placeholder="Tulis deskripsi tambahan untuk halaman home..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media - Grid 2 Kolom di Desktop */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <Share2 className="w-5 h-5 text-primary" />
              <h3 className="text-base md:text-lg font-semibold">Social Media & Links</h3>
            </div>
            
            <div className="grid gap-4 md:gap-5 grid-cols-1 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="github" className="text-sm md:text-base font-medium">GitHub URL</Label>
                <Input
                  id="github"
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/username"
                  className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-sm md:text-base font-medium">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook" className="text-sm md:text-base font-medium">Facebook URL</Label>
                <Input
                  id="facebook"
                  type="url"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  placeholder="https://facebook.com/username"
                  className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-sm md:text-base font-medium">Instagram URL</Label>
                <Input
                  id="instagram"
                  type="url"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="https://instagram.com/username"
                  className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm md:text-base font-medium">Website URL</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                  className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-sm md:text-base font-medium">Twitter/X URL</Label>
                <Input
                  id="twitter"
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="https://twitter.com/username"
                  className="h-10 md:h-11 text-sm md:text-base bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Statistik - Grid 4 Kolom di Desktop, 2 di Tablet, 1 di Mobile */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-base md:text-lg font-semibold">Statistik Pencapaian</h3>
            </div>
            
            <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2 p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors">
                <Label htmlFor="projectCompleted" className="text-sm md:text-base font-medium">Project Selesai</Label>
                <Input
                  id="projectCompleted"
                  type="number"
                  value={formData.projectCompleted}
                  onChange={(e) => setFormData({ ...formData, projectCompleted: e.target.value })}
                  min="0"
                  className="h-10 md:h-11 text-sm md:text-base bg-background border-primary/20 focus:border-primary"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors">
                <Label htmlFor="yearsExperience" className="text-sm md:text-base font-medium">Tahun Pengalaman</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                  min="0"
                  className="h-10 md:h-11 text-sm md:text-base bg-background border-primary/20 focus:border-primary"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors">
                <Label htmlFor="specialCourses" className="text-sm md:text-base font-medium">Kursus Khusus</Label>
                <Input
                  id="specialCourses"
                  type="number"
                  value={formData.specialCourses}
                  onChange={(e) => setFormData({ ...formData, specialCourses: e.target.value })}
                  min="0"
                  className="h-10 md:h-11 text-sm md:text-base bg-background border-primary/20 focus:border-primary"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors">
                <Label htmlFor="satisfiedClients" className="text-sm md:text-base font-medium">Klien Puas</Label>
                <Input
                  id="satisfiedClients"
                  type="number"
                  value={formData.satisfiedClients}
                  onChange={(e) => setFormData({ ...formData, satisfiedClients: e.target.value })}
                  min="0"
                  className="h-10 md:h-11 text-sm md:text-base bg-background border-primary/20 focus:border-primary"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* CV/Resume - Full Width */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <PdfIcon className="w-5 h-5 text-primary" />
              <h3 className="text-base md:text-lg font-semibold">CV/Resume (PDF)</h3>
            </div>
            
            <div className="space-y-3 p-4 md:p-5 rounded-lg bg-background/50 border border-primary/20">
              <div className="space-y-3">
                <Label className="text-sm md:text-base font-medium">Upload CV/Resume</Label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, "cv")
                  }}
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                />
                {formData.cvUrl && (
                  <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-3">CV yang sudah diupload:</p>
                    <a
                      href={formData.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Lihat CV
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 border-t border-border/50">
            <Button 
              type="submit" 
              disabled={loading} 
              className="flex-1 h-11 md:h-12 text-sm md:text-base font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20"
            >
              <Save className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              {loading ? "Menyimpan..." : "Simpan Profil"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-11 md:h-12 text-sm md:text-base font-medium border-primary/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
            >
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
