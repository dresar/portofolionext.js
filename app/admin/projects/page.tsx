import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { deleteProject } from "@/app/actions/projects"
import { Plus } from "lucide-react"
import ProjectsClient from "./ProjectsClient"

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-2 md:space-y-3 m-0 p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Kelola Projects</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Kelola semua proyek portofolio Anda ({projects.length} project)
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Project
          </Button>
        </Link>
      </div>

      <ProjectsClient projects={projects} deleteProject={deleteProject} />
    </div>
  )
}
