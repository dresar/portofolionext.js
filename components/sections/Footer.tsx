"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, Instagram, Facebook } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

type Profile = {
  fullName: string | null
  website: string | null
  linkedin: string | null
  github: string | null
  twitter: string | null
  instagram: string | null
  facebook: string | null
  email: string | null
}

export default function Footer() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error("Error fetching profile:", error))
  }, [])

  const socialLinks = []
  if (profile?.github) {
    socialLinks.push({ icon: Github, href: profile.github, label: "GitHub" })
  }
  if (profile?.linkedin) {
    socialLinks.push({ icon: Linkedin, href: profile.linkedin, label: "LinkedIn" })
  }
  if (profile?.facebook) {
    socialLinks.push({ icon: Facebook, href: profile.facebook, label: "Facebook" })
  }
  if (profile?.instagram) {
    socialLinks.push({ icon: Instagram, href: profile.instagram, label: "Instagram" })
  }
  if (profile?.twitter) {
    socialLinks.push({ icon: Twitter, href: profile.twitter, label: "Twitter" })
  }
  if (profile?.email) {
    socialLinks.push({ icon: Mail, href: `mailto:${profile.email}`, label: "Email" })
  }

  return (
    <footer className="relative border-t border-purple-500/20 bg-gradient-to-b from-background to-purple-950/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {profile?.fullName || "Portfolio"}
            </h3>
            <p className="text-purple-200/70">
              Seorang developer yang passionate dalam menciptakan solusi digital inovatif. Berpengalaman dalam pengembangan web, mobile, dan project management.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-purple-200/70 hover:text-purple-300 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-purple-200/70 hover:text-purple-300 transition-colors">
                  Tentang Saya
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-purple-200/70 hover:text-purple-300 transition-colors">
                  Proyek
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-purple-200/70 hover:text-purple-300 transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.length > 0 ? (
                socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-full glass border border-purple-500/20 hover:border-purple-500/40 text-purple-300 hover:text-purple-200 transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  )
                })
              ) : (
                <p className="text-purple-200/50 text-sm">Social media akan muncul di sini</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500/20 pt-8 text-center">
          <p className="text-purple-200/50 text-sm">
            © {new Date().getFullYear()} Portofolio. All rights reserved. Made with ❤️ by {profile?.fullName || "Developer"}
          </p>
          <p className="text-purple-200/50 text-xs mt-2">
            Status: Tersedia untuk bekerja
          </p>
        </div>
      </div>
    </footer>
  )
}
