import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import PengalamanForm from "./PengalamanForm"

export default async function PengalamanPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const pengalaman = await prisma.pengalaman.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-2 md:space-y-3 m-0 p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Pengalaman</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Kelola pengalaman kerja ({pengalaman.length} pengalaman)
          </p>
        </div>
        <PengalamanForm />
      </div>

      {pengalaman.length === 0 ? (
        <Card className="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Belum ada pengalaman</p>
            <PengalamanForm />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-2 md:gap-3 md:grid-cols-2">
          {pengalaman.map((exp) => (
            <Card key={exp.id} className="glass">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{exp.position}</CardTitle>
                    <CardDescription>{exp.company}</CardDescription>
                  </div>
                  {exp.current && (
                    <Badge className="bg-green-500">Current</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {exp.image && (
                  <div className="w-full h-32 rounded-lg overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    {exp.startDate} - {exp.current ? "Sekarang" : exp.endDate || "Sekarang"}
                  </p>
                  {exp.location && (
                    <p className="text-muted-foreground">📍 {exp.location}</p>
                  )}
                </div>
                {exp.description && (
                  <p className="text-sm text-muted-foreground line-clamp-4">
                    {exp.description}
                  </p>
                )}
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

