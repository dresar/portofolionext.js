import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Save, Plus, Edit, Trash2 } from "lucide-react"
import PengaturanForm from "./PengaturanForm"

export default async function PengaturanPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const settings = await prisma.pengaturan.findMany({
    orderBy: { category: "asc" },
  })

  const groupedSettings = settings.reduce((acc, setting) => {
    const category = setting.category || "general"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(setting)
    return acc
  }, {} as Record<string, typeof settings>)

  return (
    <div className="space-y-2 md:space-y-3 m-0 p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Pengaturan</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Kelola pengaturan website ({settings.length} pengaturan)
          </p>
        </div>
        <PengaturanForm />
      </div>

      {Object.keys(groupedSettings).length === 0 ? (
        <Card className="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Belum ada pengaturan</p>
            <PengaturanForm />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2 md:space-y-3 m-0 p-0">
          {Object.entries(groupedSettings).map(([category, items]) => (
            <Card key={category} className="glass">
              <CardHeader>
                <CardTitle className="capitalize">{category}</CardTitle>
                <CardDescription>
                  {items.length} pengaturan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((setting) => (
                    <div
                      key={setting.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 p-4 rounded-lg border border-border"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Label className="font-medium">{setting.key}</Label>
                          {setting.type && (
                            <Badge variant="outline" className="text-xs">
                              {setting.type}
                            </Badge>
                          )}
                        </div>
                        {setting.description && (
                          <p className="text-xs text-muted-foreground">
                            {setting.description}
                          </p>
                        )}
                        <Input
                          value={setting.value}
                          readOnly
                          className="mt-2 font-mono text-sm"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

