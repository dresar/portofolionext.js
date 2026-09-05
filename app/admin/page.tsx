import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  FolderKanban, 
  Star, 
  Mail, 
  MailCheck, 
  Plus,
  Settings,
  User
} from "lucide-react"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  try {
    const [projectCount, messageCount, unreadMessageCount, featuredProjectCount] = await Promise.all([
      prisma.project.count(),
      prisma.message.count(),
      prisma.message.count({
        where: { read: false },
      }),
      prisma.project.count({
        where: { featured: true },
      }),
    ])

    return (
      <div className="space-y-2 md:space-y-3 m-0 p-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground text-xs md:text-sm">
              Selamat datang kembali, {session.user?.name || "Admin"}!
            </p>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Card className="glass hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderKanban className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-primary">{projectCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Proyek portofolio</p>
            </CardContent>
          </Card>

          <Card className="glass hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">{featuredProjectCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Proyek unggulan</p>
            </CardContent>
          </Card>

          <Card className="glass hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <Mail className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-primary">{messageCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Pesan diterima</p>
            </CardContent>
          </Card>

          <Card className="glass hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <MailCheck className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">{unreadMessageCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Belum dibaca</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Info */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="glass-strong md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Aksi cepat untuk mengelola konten</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/projects/new">
                <Button className="w-full justify-start" size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Project Baru
                </Button>
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/admin/projects">
                  <Button className="w-full" variant="outline">
                    Kelola Projects
                  </Button>
                </Link>
                <Link href="/admin/messages">
                  <Button className="w-full" variant="outline">
                    Lihat Messages
                  </Button>
                </Link>
                <Link href="/admin/analytics" className="col-span-2">
                  <Button className="w-full" variant="outline">
                    Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informasi Akun
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">{session.user?.name || "Admin"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{session.user?.email || "admin@example.com"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Dashboard error:", error)
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Selamat datang kembali, {session.user?.name || "Admin"}!</p>
        </div>
        <Card className="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Terjadi kesalahan saat memuat data</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
}
