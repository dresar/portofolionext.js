import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { createProject } from "@/app/actions/projects"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function NewProjectPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <div>
        <Link href="/admin/projects">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </Link>
      </div>

      <Card className="glass-strong max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Tambah Project Baru</CardTitle>
          <CardDescription>Isi form di bawah untuk menambahkan project baru</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createProject} className="space-y-4 md:space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title">Judul Project *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Contoh: E-Commerce Platform"
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Deskripsi *</Label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Deskripsi lengkap tentang project..."
                  required
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">URL Gambar</Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Teknologi *</Label>
                <Input
                  id="technologies"
                  name="technologies"
                  placeholder="Next.js, TypeScript, Prisma"
                  required
                  className="bg-background/50"
                />
                <p className="text-xs text-muted-foreground">
                  Pisahkan dengan koma
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="demoLink">Link Demo</Label>
                <Input
                  id="demoLink"
                  name="demoLink"
                  type="url"
                  placeholder="https://demo.example.com"
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubLink">Link GitHub</Label>
                <Input
                  id="githubLink"
                  name="githubLink"
                  type="url"
                  placeholder="https://github.com/username/repo"
                  className="bg-background/50"
                />
              </div>

              <div className="flex items-center space-x-2 md:col-span-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="featured" className="cursor-pointer text-sm">
                  Tandai sebagai Featured Project
                </Label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
              <Button type="submit" className="flex-1 sm:flex-none">
                Simpan Project
              </Button>
              <Link href="/admin/projects" className="flex-1 sm:flex-none">
                <Button type="button" variant="outline" className="w-full">
                  Batal
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
