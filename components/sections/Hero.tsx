"use client"

import { ArrowDown, Sparkles, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"

// Dynamic import Lanyard3D - Client only (Three.js tidak bisa di SSR)
const Lanyard3D = dynamic(() => import("@/components/reactbits/Lanyard3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-xs lg:max-w-sm h-[500px] lg:h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl">
      <Sparkles className="w-20 h-20 text-primary/50 animate-pulse" />
    </div>
  )
})

// Dynamic import PixelBlast untuk client-side only
const PixelBlast = dynamic(() => import("@/components/PixelBlast.tsx"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-background to-purple-900/10" />
})

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
}

type Stats = {
  yearsExperience: number
  projectCount: number
  sertifikatCount: number
}

// Default values untuk immediate render (better LCP)
const defaultProfile: Profile = {
  fullName: "Developer",
  title: "Full Stack Developer",
  professions: "Web Development, UI UX",
  bio: "Selamat datang di portofolio saya.",
  shortDescriptionHome: "Selamat datang di portofolio saya.",
  secondDescriptionHome: null,
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

const defaultStats: Stats = {
  yearsExperience: 0,
  projectCount: 0,
  sertifikatCount: 0,
}

export default function Hero() {
  // Render immediately dengan default values untuk better LCP
  const [profile, setProfile] = useState<Profile>(defaultProfile)
  const [stats, setStats] = useState<Stats>(defaultStats)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch data in background - tidak block render
    const abortController = new AbortController()
    
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [profileRes, statsRes] = await Promise.all([
          fetch("/api/profile", { 
            signal: abortController.signal,
            cache: 'no-store' // Force fresh data
          }),
          fetch("/api/stats", { 
            signal: abortController.signal,
            cache: 'no-store' // Force fresh data
          }),
        ])
        
        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setProfile(profileData)
        }
        
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        }
      } catch (error: any) {
        // Silently handle errors - keep default values
        if (error.name === 'AbortError') {
          // Ignore abort errors
        }
      } finally {
        setIsLoading(false)
      }
    }

    // Delay fetch sedikit untuk prioritize initial render
    const timeoutId = setTimeout(() => {
      fetchData()
    }, 100)
    
    return () => {
      clearTimeout(timeoutId)
      abortController.abort()
    }
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* PixelBlast Background */}
      <div className="absolute inset-0 z-0">
        <PixelBlast
          variant="square"
          pixelSize={3}
          color="#B19EEF"
          patternScale={2}
          patternDensity={1}
          transparent={true}
          edgeFade={0.5}
          speed={0.5}
        />
      </div>
      
      {/* Gradient overlay untuk readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-background/80 to-purple-900/10 z-[1]" />

      {/* Content - Grid Layout dengan gambar di kanan */}
      <div className="relative z-[2] container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <div className="space-y-6">
              <div className="inline-block">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 mb-4">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300">
                    {profile.professions || profile.title || "Full Stack Developer"}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="block text-white mb-2 text-2xl md:text-3xl lg:text-4xl">Halo, Saya 👋</span>
                <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                  {profile.fullName}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-purple-200/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {profile.shortDescriptionHome || profile.bio}
              </p>

              {/* Stats - Always render untuk better LCP */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-12 pt-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {stats.yearsExperience}+
                  </div>
                  <div className="text-sm text-purple-200/70">Tahun Pengalaman</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {stats.projectCount}+
                  </div>
                  <div className="text-sm text-purple-200/70">Proyek Selesai</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-8">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-6 text-lg rounded-full"
                >
                  Lihat Karya
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-6 text-lg rounded-full"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Unduh Resume
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image dengan Lanyard3D (Physics-based Draggable) */}
          <div className="relative flex justify-center lg:justify-end z-10">
            <div className="w-full max-w-xs lg:max-w-sm h-[500px] lg:h-[600px]">
              {profile.heroPhoto || profile.avatar ? (
                <Lanyard3D
                  position={[0, 0, 20]}
                  gravity={[0, -40, 0]}
                  fov={20}
                  transparent={true}
                  cardImage={profile.heroPhoto || profile.avatar || undefined}
                  width={400}
                  height={600}
                  className="rounded-2xl overflow-hidden"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl">
                  <Sparkles className="w-20 h-20 text-primary/50 animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Lazy load animation */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors"
          >
            <span className="text-sm">Scroll ↓</span>
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
