import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import TemplateForm from "./TemplateForm"

export default async function TemplatePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const templates = await prisma.template.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-2 md:space-y-3 m-0 p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Template</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Kelola template email, halaman, dan komponen ({templates.length} template)
          </p>
        </div>
        <TemplateForm />
      </div>

      {templates.length === 0 ? (
        <Card className="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Belum ada template</p>
            <TemplateForm />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-2 md:gap-3 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="glass">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  {template.type && (
                    <Badge variant="outline">{template.type}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {template.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {template.description}
                  </p>
                )}
                <div className="text-xs text-muted-foreground">
                  <p>Content: {template.content.length} karakter</p>
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

