"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter, Instagram, Facebook, Download, Award, Briefcase, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

type Profile = {
  fullName: string
  title: string | null
  professions: string | null
  bio: string | null
  shortDescriptionHome: string | null
  secondDescriptionHome: string | null
  avatar: string | null
  heroPhoto: string | null
  email: string | null
  phone: string | null
  whatsapp: string | null
  location: string | null
  website: string | null
  linkedin: string | null
  github: string | null
  twitter: string | null
  instagram: string | null
  facebook: string | null
  cvUrl: string | null
  projectCompleted: number
  yearsExperience: number
  specialCourses: number
  satisfiedClients: number
}

type Stats = {
  yearsExperience: number
  projectCount: number
  sertifikatCount: number
}

export default function About() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, statsRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/stats"),
        ])
        
        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setProfile(profileData)
        }
        
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section id="about" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  // Show default content if no profile
  const displayProfile = profile || {
    fullName: "Developer",
    title: "Full Stack Developer",
    professions: "Web Development, UI UX",
    bio: "Selamat datang di portofolio saya.",
    shortDescriptionHome: "Selamat datang di portofolio saya.",
    avatar: null,
    heroPhoto: null,
    email: null,
    phone: null,
    whatsapp: null,
    location: null,
    website: null,
    linkedin: null,
    github: null,
    twitter: null,
    instagram: null,
    facebook: null,
  }

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
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
            <span className="text-white">Tentang</span>{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Saya
            </span>
          </h2>
          <p className="text-purple-200/70 text-lg max-w-2xl mx-auto">
            Mengenal lebih dekat siapa saya dan apa yang saya lakukan dalam dunia teknologi
          </p>
        </motion.div>

        {/* Magic Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {/* Photo Card - Large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2"
          >
            <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-pink-500/20 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 flex flex-col justify-between">
                {displayProfile.avatar ? (
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src={displayProfile.avatar}
                      alt={displayProfile.fullName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-bold text-white mb-2">{displayProfile.fullName}</h3>
                      {displayProfile.title && (
                        <p className="text-purple-200 text-lg">{displayProfile.title}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                          {displayProfile.fullName.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{displayProfile.fullName}</h3>
                      {displayProfile.title && (
                        <p className="text-purple-200">{displayProfile.title}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats Card 1 */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative rounded-3xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 flex flex-col justify-center items-center h-full min-h-[200px]">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stats.yearsExperience}+
                </div>
                <div className="text-sm text-purple-200/70 text-center">Tahun Pengalaman</div>
                <Briefcase className="w-8 h-8 text-purple-400/30 mt-4" />
              </div>
            </motion.div>
          )}

          {/* Stats Card 2 */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative rounded-3xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 flex flex-col justify-center items-center h-full min-h-[200px]">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stats.projectCount}+
                </div>
                <div className="text-sm text-purple-200/70 text-center">Proyek Selesai</div>
                <Code className="w-8 h-8 text-purple-400/30 mt-4" />
              </div>
            </motion.div>
          )}

          {/* Bio Card */}
          {displayProfile.bio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="md:col-span-2 lg:col-span-2 relative rounded-3xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 h-full min-h-[200px]">
                <h4 className="text-xl font-bold text-white mb-4">Halo! Saya {displayProfile.fullName}</h4>
                <div 
                  className="text-purple-200/80 leading-relaxed text-sm line-clamp-6"
                  dangerouslySetInnerHTML={{ __html: displayProfile.bio }}
                />
              </div>
            </motion.div>
          )}

          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:col-span-2 lg:col-span-2 relative rounded-3xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 h-full min-h-[200px]">
              <h4 className="text-lg font-bold text-white mb-4">Informasi Personal</h4>
              <div className="space-y-3">
                {displayProfile.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-purple-200/80 truncate">{displayProfile.email}</span>
                  </div>
                )}
                {displayProfile.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-purple-200/80">{displayProfile.phone}</span>
                  </div>
                )}
                {displayProfile.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-purple-200/80">{displayProfile.location}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Social Media Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="md:col-span-2 lg:col-span-2 relative rounded-3xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 h-full min-h-[200px]">
              <h4 className="text-lg font-bold text-white mb-4">Media Sosial</h4>
              <div className="flex flex-wrap gap-3">
                {displayProfile.github && (
                  <a
                    href={displayProfile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all group"
                  >
                    <Github className="w-5 h-5 text-purple-300 group-hover:text-purple-200" />
                  </a>
                )}
                {displayProfile.linkedin && (
                  <a
                    href={displayProfile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all group"
                  >
                    <Linkedin className="w-5 h-5 text-purple-300 group-hover:text-purple-200" />
                  </a>
                )}
                {displayProfile.facebook && (
                  <a
                    href={displayProfile.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all group"
                  >
                    <Facebook className="w-5 h-5 text-purple-300 group-hover:text-purple-200" />
                  </a>
                )}
                {displayProfile.instagram && (
                  <a
                    href={displayProfile.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all group"
                  >
                    <Instagram className="w-5 h-5 text-purple-300 group-hover:text-purple-200" />
                  </a>
                )}
                {displayProfile.twitter && (
                  <a
                    href={displayProfile.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all group"
                  >
                    <Twitter className="w-5 h-5 text-purple-300 group-hover:text-purple-200" />
                  </a>
                )}
                {displayProfile.website && (
                  <a
                    href={displayProfile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all group"
                  >
                    <ExternalLink className="w-5 h-5 text-purple-300 group-hover:text-purple-200" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats Card 3 */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="relative rounded-3xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 flex flex-col justify-center items-center h-full min-h-[200px]">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stats.sertifikatCount}+
                </div>
                <div className="text-sm text-purple-200/70 text-center">Sertifikat</div>
                <Award className="w-8 h-8 text-purple-400/30 mt-4" />
              </div>
            </motion.div>
          )}

          {/* Action Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 flex flex-col justify-center items-center h-full min-h-[200px]">
              <div className="text-center">
                <p className="text-sm text-purple-200/70 mb-4">Status: Tersedia untuk Freelance</p>
                <Button
                  variant="outline"
                  className="rounded-full border-purple-500/30 hover:border-purple-500/50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Unduh CV
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
