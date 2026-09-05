"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type Pengalaman = {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  location: string | null
  image: string | null
}

export default function Experience() {
  const [pengalaman, setPengalaman] = useState<Pengalaman[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/pengalaman")
      .then((res) => res.json())
      .then((data) => {
        setPengalaman(data || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching pengalaman:", error)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", { month: "short", year: "numeric" })
  }

  if (loading) {
    return (
      <section id="experience" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-20 md:py-32 relative overflow-hidden">
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
            <span className="text-white">Pengalaman</span>{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Kerja
            </span>
          </h2>
          <p className="text-purple-200/70 text-lg max-w-2xl mx-auto">
            Pengalaman kerja dan kontribusi profesional dalam perjalanan karir saya
          </p>
        </motion.div>

        {pengalaman.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-purple-200/70">Belum ada pengalaman yang ditampilkan.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {pengalaman.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Card className="glass-strong border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      {exp.image && (
                        <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={exp.image}
                            alt={exp.company}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Briefcase className="h-5 w-5 text-purple-400" />
                              <h3 className="text-xl md:text-2xl font-bold text-white">
                                {exp.position}
                              </h3>
                            </div>
                            <p className="text-purple-300 text-lg font-semibold mb-2">
                              {exp.company}
                            </p>
                          </div>
                          {exp.current && (
                            <Badge className="bg-green-500">Current</Badge>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 text-sm text-purple-200/70 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {formatDate(exp.startDate)} - {exp.current ? "Sekarang" : formatDate(exp.endDate || "")}
                            </span>
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-purple-200/80 leading-relaxed whitespace-pre-wrap">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
