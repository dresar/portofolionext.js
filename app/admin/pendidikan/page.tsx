import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import PendidikanForm from "./PendidikanForm"

export default async function PendidikanPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const pendidikan = await prisma.pendidikan.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-2 md:space-y-3 m-0 p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Pendidikan</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Kelola riwayat pendidikan ({pendidikan.length} data)
          </p>
        </div>
        <PendidikanForm />
      </div>

      {pendidikan.length === 0 ? (
        <Card className="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Belum ada data pendidikan</p>
            <PendidikanForm />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-2 md:gap-3 md:grid-cols-2 lg:grid-cols-3">
          {pendidikan.map((item) => (
            <Card key={item.id} className="glass">
              <CardHeader>
                <CardTitle className="text-lg">{item.institution}</CardTitle>
                {item.degree && (
                  <CardDescription>{item.degree} - {item.field}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {item.image && (
                  <div className="w-full h-32 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.institution}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {(item.startDate || item.endDate) && (
                  <p className="text-sm text-muted-foreground">
                    {item.startDate} - {item.endDate || "Sekarang"}
                  </p>
                )}
                {item.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.description}
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

