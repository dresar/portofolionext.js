"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import ProjectCard from "./ProjectCard"

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch projects")
        }
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data)
        } else {
          setProjects([])
        }
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        setProjects([])
      })
  }, [])

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Projek</span>{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Saya
            </span>
          </h2>
          <p className="text-purple-200/70 text-lg max-w-2xl mx-auto">
            Koleksi proyek yang telah saya buat dengan berbagai teknologi modern
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-purple-200/70">Memuat proyek...</p>
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <p className="text-purple-200/70 text-lg">
              Belum ada proyek yang ditampilkan. Silakan login ke admin panel untuk menambahkan proyek.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
