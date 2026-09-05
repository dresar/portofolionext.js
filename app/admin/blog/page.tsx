import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import BlogForm from "./BlogForm"

export default async function BlogPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  })

  return (
    <div className="space-y-2 md:space-y-3 m-0 p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Blog</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Kelola artikel blog ({blogs.length} artikel)
          </p>
        </div>
        <BlogForm />
      </div>

      {blogs.length === 0 ? (
        <Card className="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Belum ada artikel blog</p>
            <BlogForm />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-2 md:gap-3 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card key={blog.id} className="glass">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2 flex-1">{blog.title}</CardTitle>
                  {blog.published ? (
                    <Badge className="bg-green-500">Published</Badge>
                  ) : (
                    <Badge variant="outline">Draft</Badge>
                  )}
                </div>
                {blog.category && (
                  <CardDescription>{blog.category.name}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {blog.image && (
                  <div className="w-full h-32 rounded-lg overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {blog.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {blog.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>{blog.views} views</span>
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

