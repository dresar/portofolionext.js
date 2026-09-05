"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ExternalLink, Github, Star, Search, Filter, CheckSquare, Square } from "lucide-react"
import { useRouter } from "next/navigation"

type Project = {
  id: string
  title: string
  description: string
  image: string | null
  demoLink: string | null
  githubLink: string | null
  technologies: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

type ProjectsClientProps = {
  projects: Project[]
  deleteProject: (id: string) => Promise<void>
}

export default function ProjectsClient({ projects, deleteProject }: ProjectsClientProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "featured" | "not-featured">("all")
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filter === "all" ||
      (filter === "featured" && project.featured) ||
      (filter === "not-featured" && !project.featured)

    return matchesSearch && matchesFilter
  })

  const handleSelectAll = () => {
    if (selectedIds.length === filteredProjects.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredProjects.map((p) => p.id))
    }
  }

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus project ini?")) return
    try {
      await deleteProject(id)
      router.refresh()
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("Gagal menghapus project")
    }
  }

  if (projects.length === 0) {
    return (
      <Card className="glass">
        <CardContent className="py-12 md:py-16 text-center">
          <p className="text-muted-foreground mb-4">Belum ada project</p>
          <Link href="/admin/projects/new">
            <Button>
              Tambah Project Pertama
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                Semua
              </Button>
              <Button
                variant={filter === "featured" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("featured")}
              >
                <Star className="mr-2 h-4 w-4" />
                Featured
              </Button>
              <Button
                variant={filter === "not-featured" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("not-featured")}
              >
                Tidak Featured
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <Card className="glass border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedIds.length} project dipilih
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedIds([])}
                >
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    if (confirm(`Yakin ingin menghapus ${selectedIds.length} project?`)) {
                      selectedIds.forEach((id) => handleDelete(id))
                      setSelectedIds([])
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus {selectedIds.length} Project
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <Card className="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Tidak ada project yang cocok</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Menampilkan {filteredProjects.length} dari {projects.length} project
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelectAll}
            >
              {selectedIds.length === filteredProjects.length ? (
                <>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Batal Pilih Semua
                </>
              ) : (
                <>
                  <Square className="mr-2 h-4 w-4" />
                  Pilih Semua
                </>
              )}
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className={`glass transition-colors ${
                  selectedIds.includes(project.id) ? "ring-2 ring-primary" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleSelect(project.id)}
                      className="mt-1"
                    >
                      {selectedIds.includes(project.id) ? (
                        <CheckSquare className="h-5 w-5 text-primary" />
                      ) : (
                        <Square className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-lg line-clamp-2 flex-1">
                          {project.title}
                        </CardTitle>
                        {project.featured && (
                          <Badge variant="default" className="bg-yellow-500 flex-shrink-0">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.image && (
                    <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.split(",").map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech.trim()}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Button>
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Button>
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link href={`/admin/projects/${project.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Hapus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

