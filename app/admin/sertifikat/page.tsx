import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import SertifikatForm from "./SertifikatForm"

export default async function SertifikatPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const sertifikat = await prisma.sertifikat.findMany({
    orderBy: { issueDate: "desc" },
  })

  return (
    <div className="space-y-2 md:space-y-3 m-0 p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Sertifikat</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Kelola sertifikat dan sertifikasi ({sertifikat.length} sertifikat)
          </p>
        </div>
        <SertifikatForm />
      </div>

      {sertifikat.length === 0 ? (
        <Card className="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Belum ada sertifikat</p>
            <SertifikatForm />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-2 md:gap-3 md:grid-cols-2 lg:grid-cols-3">
          {sertifikat.map((cert) => (
            <Card key={cert.id} className="glass">
              <CardHeader>
                <CardTitle className="text-lg">{cert.title}</CardTitle>
                <CardDescription>{cert.issuer}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cert.image && (
                  <div className="w-full h-40 rounded-lg overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="text-sm space-y-1">
                  <p className="text-muted-foreground">
                    Diterbitkan: {cert.issueDate}
                  </p>
                  {cert.expiryDate && (
                    <p className="text-muted-foreground">
                      Berlaku hingga: {cert.expiryDate}
                    </p>
                  )}
                  {cert.credentialId && (
                    <p className="text-muted-foreground">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Lihat Sertifikat
                  </a>
                )}
                {cert.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {cert.description}
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

