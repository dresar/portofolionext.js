"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Award, Calendar, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type Sertifikat = {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate: string | null
  credentialId: string | null
  credentialUrl: string | null
  image: string | null
  description: string | null
}

export default function Sertifikat() {
  const [sertifikat, setSertifikat] = useState<Sertifikat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/sertifikat")
      .then((res) => res.json())
      .then((data) => {
        setSertifikat(data || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching sertifikat:", error)
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
      <section id="sertifikat" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="sertifikat" className="py-20 md:py-32 relative overflow-hidden">
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
            <span className="text-white">Sertifikat</span>{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Saya
            </span>
          </h2>
          <p className="text-purple-200/70 text-lg max-w-2xl mx-auto">
            Sertifikat dan pencapaian profesional saya
          </p>
        </motion.div>

        {sertifikat.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-purple-200/70">Belum ada sertifikat yang ditampilkan.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sertifikat.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="glass-strong border-purple-500/20 hover:border-purple-500/40 transition-all h-full">
                  <CardContent className="p-6">
                    {cert.image && (
                      <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-purple-400" />
                      <h3 className="text-lg font-bold text-white line-clamp-2">
                        {cert.title}
                      </h3>
                    </div>
                    <p className="text-purple-300 text-sm mb-4">{cert.issuer}</p>
                    <div className="space-y-2 text-xs text-purple-200/70 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>Diterbitkan: {formatDate(cert.issueDate)}</span>
                      </div>
                      {cert.expiryDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>Berlaku hingga: {formatDate(cert.expiryDate)}</span>
                        </div>
                      )}
                      {cert.credentialId && (
                        <p>ID: {cert.credentialId}</p>
                      )}
                    </div>
                    {cert.description && (
                      <p className="text-sm text-purple-200/80 line-clamp-3 mb-4">
                        {cert.description}
                      </p>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Lihat Sertifikat
                      </a>
                    )}
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

