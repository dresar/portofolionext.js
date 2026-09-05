import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Eye, Calendar } from "lucide-react"

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const projectCount = await prisma.project.count()
  const featuredCount = await prisma.project.count({ where: { featured: true } })
  const messageCount = await prisma.message.count()
  const unreadCount = await prisma.message.count({ where: { read: false } })

  // Get recent activity
  const recentProjects = await prisma.project.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: { title: true, createdAt: true },
  })

  const recentMessages = await prisma.message.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: { name: true, email: true, createdAt: true, read: true },
  })

  // Calculate statistics
  const readRate = messageCount > 0 ? ((messageCount - unreadCount) / messageCount * 100).toFixed(1) : "0"
  const featuredRate = projectCount > 0 ? ((featuredCount / projectCount) * 100).toFixed(1) : "0"

  return (
    <div className="space-y-2 md:space-y-3 m-0 p-0">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Analytics & Statistics</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">Statistik dan analitik portofolio Anda</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Proyek portofolio</p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">{featuredCount} dari {projectCount} featured</p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Pesan diterima</p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
            <Eye className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">{messageCount - unreadCount} dari {messageCount} dibaca</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-2 md:gap-3 md:grid-cols-2">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Projects
            </CardTitle>
            <CardDescription>5 project terbaru</CardDescription>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada project</p>
            ) : (
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div key={project.title} className="flex items-center justify-between text-sm">
                    <p className="font-medium line-clamp-1">{project.title}</p>
                    <p className="text-muted-foreground">
                      {new Date(project.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Messages
            </CardTitle>
            <CardDescription>5 pesan terbaru</CardDescription>
          </CardHeader>
          <CardContent>
            {recentMessages.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada pesan</p>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((message, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1">{message.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{message.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {!message.read && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                          Baru
                        </span>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

