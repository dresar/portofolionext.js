"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

type Keahlian = {
  id: string
  name: string
  level: string | null
  category: string | null
  icon: string | null
  description: string | null
}

export default function Skills() {
  const [keahlian, setKeahlian] = useState<Keahlian[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/keahlian")
      .then((res) => res.json())
      .then((data) => {
        setKeahlian(data || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching keahlian:", error)
        setLoading(false)
      })
  }, [])

  const getLevelPercent = (level: string | null) => {
    const levelMap: Record<string, number> = {
      beginner: 50,
      intermediate: 75,
      advanced: 90,
      expert: 100,
    }
    return levelMap[level || ""] || 75
  }

  // Group by category
  const technicalSkills = keahlian.filter((k) => k.category === "programming" || k.category === "technical" || !k.category)
  const softSkills = keahlian.filter((k) => k.category === "soft" || k.category === "communication")

  if (loading) {
    return (
      <section id="skills" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
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
            <span className="text-white">Keahlian</span>{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Saya
            </span>
          </h2>
          <p className="text-purple-200/70 text-lg max-w-2xl mx-auto">
            Keahlian dan teknologi yang saya kuasai
          </p>
        </motion.div>

        {/* Technical Skills */}
        {technicalSkills.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-white">Technical Skills</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalSkills.map((skill, index) => {
                const percent = getLevelPercent(skill.level)
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="glass-strong border-purple-500/20 hover:border-purple-500/40 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {skill.icon && (
                              <span className="text-2xl">{skill.icon}</span>
                            )}
                            <h3 className="font-semibold text-white">{skill.name}</h3>
                          </div>
                          <span className="text-sm text-purple-300">{percent}%</span>
                        </div>
                        <div className="h-2 bg-purple-950/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percent}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                            className="h-full rounded-full gradient-purple"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Soft Skills */}
        {softSkills.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-white">Soft Skills</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {softSkills.map((skill, index) => {
                const percent = getLevelPercent(skill.level)
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="glass-strong border-purple-500/20 hover:border-purple-500/40 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {skill.icon && (
                              <span className="text-2xl">{skill.icon}</span>
                            )}
                            <h3 className="font-semibold text-white">{skill.name}</h3>
                          </div>
                          <span className="text-sm text-purple-300">{percent}%</span>
                        </div>
                        <div className="h-2 bg-purple-950/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percent}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                            className="h-full rounded-full gradient-purple"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {keahlian.length === 0 && (
          <div className="text-center py-20">
            <p className="text-purple-200/70">Belum ada keahlian yang ditampilkan.</p>
          </div>
        )}
      </div>
    </section>
  )
}
