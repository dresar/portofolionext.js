import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, User, Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter, Instagram, Facebook, FileText, BarChart3, ExternalLink } from "lucide-react"
import Link from "next/link"
import ProfileForm from "./ProfileForm"

export default async function ProfilPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // Hanya ambil 1 profil saja
  const profile = await prisma.profile.findFirst({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-4 md:space-y-6 m-0 p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Profil
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Kelola profil portofolio Anda
          </p>
        </div>
      </div>

      {/* Form atau Card Profil */}
      <div className="w-full max-w-7xl mx-auto">
        {profile ? (
          <div className="space-y-4 md:space-y-6">
            {/* Card Profil Preview - Menampilkan Semua Informasi */}
            <Card className="glass-strong border-primary/20 shadow-lg overflow-hidden">
              <CardHeader className="pb-4 border-b border-border/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl md:text-2xl font-bold mb-2">{profile.fullName}</CardTitle>
                    {profile.title && (
                      <CardDescription className="text-base md:text-lg font-medium text-primary mb-1">
                        {profile.title}
                      </CardDescription>
                    )}
                    {profile.professions && (
                      <CardDescription className="text-sm md:text-base text-muted-foreground">
                        {profile.professions}
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex gap-3">
                    {profile.avatar && (
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 border-primary/30 flex-shrink-0 shadow-lg">
                        <img
                          src={profile.avatar}
                          alt={profile.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {profile.heroPhoto && (
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-3 border-primary/30 flex-shrink-0 shadow-lg">
                        <img
                          src={profile.heroPhoto}
                          alt="Hero Photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 md:pt-6 space-y-6">
                {/* Deskripsi Singkat Home */}
                {profile.shortDescriptionHome && (
                  <div className="space-y-2">
                    <h3 className="text-sm md:text-base font-semibold text-primary flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Deskripsi Singkat (Home)
                    </h3>
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                      <p className="text-sm md:text-base text-foreground whitespace-pre-wrap">
                        {profile.shortDescriptionHome}
                      </p>
                    </div>
                  </div>
                )}

                {/* Deskripsi Lengkap (About) - Full HTML Support */}
                {profile.bio && (
                  <div className="space-y-2">
                    <h3 className="text-sm md:text-base font-semibold text-primary flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Deskripsi Lengkap (About Me)
                    </h3>
                    <div 
                      className="rich-text-content p-4 md:p-6 rounded-lg bg-background/50 border border-primary/20 text-sm md:text-base"
                      dangerouslySetInnerHTML={{ __html: profile.bio }}
                      style={{
                        lineHeight: '1.75',
                      }}
                    />
                  </div>
                )}

                {/* Deskripsi Kedua Home */}
                {profile.secondDescriptionHome && (
                  <div className="space-y-2">
                    <h3 className="text-sm md:text-base font-semibold text-primary flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Deskripsi Kedua (Home Page)
                    </h3>
                    <div 
                      className="rich-text-content p-4 md:p-6 rounded-lg bg-background/50 border border-primary/20 text-sm md:text-base"
                      dangerouslySetInnerHTML={{ __html: profile.secondDescriptionHome }}
                      style={{
                        lineHeight: '1.75',
                      }}
                    />
                  </div>
                )}

                {/* Informasi Kontak */}
                <div className="space-y-3">
                  <h3 className="text-sm md:text-base font-semibold text-primary flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Informasi Kontak
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profile.email && (
                      <div className="p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground text-xs md:text-sm font-medium">Email</span>
                        </div>
                        <p className="font-medium text-sm md:text-base truncate">{profile.email}</p>
                      </div>
                    )}
                    {profile.phone && (
                      <div className="p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground text-xs md:text-sm font-medium">Telepon</span>
                        </div>
                        <p className="font-medium text-sm md:text-base">{profile.phone}</p>
                      </div>
                    )}
                    {profile.whatsapp && (
                      <div className="p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground text-xs md:text-sm font-medium">WhatsApp</span>
                        </div>
                        <p className="font-medium text-sm md:text-base">{profile.whatsapp}</p>
                      </div>
                    )}
                    {profile.location && (
                      <div className="p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground text-xs md:text-sm font-medium">Lokasi</span>
                        </div>
                        <p className="font-medium text-sm md:text-base">{profile.location}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Media Links */}
                {(profile.github || profile.linkedin || profile.facebook || profile.instagram || profile.twitter || profile.website) && (
                  <div className="space-y-3">
                    <h3 className="text-sm md:text-base font-semibold text-primary flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Social Media & Links
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {profile.github && (
                        <a 
                          href={profile.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center gap-2 group"
                        >
                          <Github className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                          <span className="text-xs md:text-sm font-medium truncate">GitHub</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                      {profile.linkedin && (
                        <a 
                          href={profile.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center gap-2 group"
                        >
                          <Linkedin className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                          <span className="text-xs md:text-sm font-medium truncate">LinkedIn</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                      {profile.facebook && (
                        <a 
                          href={profile.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center gap-2 group"
                        >
                          <Facebook className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                          <span className="text-xs md:text-sm font-medium truncate">Facebook</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                      {profile.instagram && (
                        <a 
                          href={profile.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center gap-2 group"
                        >
                          <Instagram className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                          <span className="text-xs md:text-sm font-medium truncate">Instagram</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                      {profile.twitter && (
                        <a 
                          href={profile.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center gap-2 group"
                        >
                          <Twitter className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                          <span className="text-xs md:text-sm font-medium truncate">Twitter</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                      {profile.website && (
                        <a 
                          href={profile.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center gap-2 group"
                        >
                          <Globe className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                          <span className="text-xs md:text-sm font-medium truncate">Website</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Statistik Pencapaian */}
                {(profile.projectCompleted > 0 || profile.yearsExperience > 0 || profile.specialCourses > 0 || profile.satisfiedClients > 0) && (
                  <div className="space-y-3">
                    <h3 className="text-sm md:text-base font-semibold text-primary flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Statistik Pencapaian
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                          {profile.projectCompleted}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground">Project Selesai</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                          {profile.yearsExperience}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground">Tahun Pengalaman</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                          {profile.specialCourses}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground">Kursus Khusus</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                          {profile.satisfiedClients}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground">Klien Puas</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CV/Resume */}
                {profile.cvUrl && (
                  <div className="space-y-3">
                    <h3 className="text-sm md:text-base font-semibold text-primary flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      CV/Resume
                    </h3>
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                      <a
                        href={profile.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Lihat CV/Resume
                      </a>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
                  <Link href={`/admin/profil/${profile.id}/edit`} className="flex-1">
                    <Button variant="outline" size="default" className="w-full h-10 md:h-11 text-sm md:text-base border-primary/20 hover:bg-primary/10 hover:border-primary">
                      <Edit className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                      Edit Profil
                    </Button>
                  </Link>
                  <Button variant="destructive" size="default" className="flex-1 h-10 md:h-11 text-sm md:text-base">
                    <Trash2 className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Hapus Profil
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Form Edit (inline) */}
            <ProfileForm existingProfile={profile} />
          </div>
        ) : (
          <Card className="glass-strong border-primary/20 shadow-lg">
            <CardContent className="py-12 md:py-16 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-base md:text-lg font-medium text-muted-foreground mb-2">
                    Belum ada profil
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Buat profil baru untuk memulai
                  </p>
                </div>
                <ProfileForm />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
