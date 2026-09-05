import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import KategoriForm from "./KategoriForm"

export default async function KategoriPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          projects: true,
          blogs: true,
        },
      },
    },
  })

  return (
    <div className="space-y-2 md:space-y-3 m-0 p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Kategori</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Kelola kategori untuk projects dan blog ({categories.length} kategori)
          </p>
        </div>
        <KategoriForm />
      </div>

      {categories.length === 0 ? (
        <Card className="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Belum ada kategori</p>
            <KategoriForm />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-2 md:gap-3 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id} className="glass">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{category.name}</CardTitle>
                    {category.slug && (
                      <CardDescription>/{category.slug}</CardDescription>
                    )}
                  </div>
                  {category.color && (
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                )}
                <div className="flex gap-2">
                  <Badge variant="outline">
                    {category._count.projects} Projects
                  </Badge>
                  <Badge variant="outline">
                    {category._count.blogs} Blogs
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

