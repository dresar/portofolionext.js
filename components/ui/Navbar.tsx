"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X, LogIn, Home, User, GraduationCap, Wrench, FolderKanban, Briefcase, Award, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, signIn } from "next-auth/react"
import PillNav from "@/components/reactbits/PillNav"

const navItems = [
  { name: "Beranda", href: "#home", icon: <Home className="w-4 h-4" /> },
  { name: "Tentang", href: "#about", icon: <User className="w-4 h-4" /> },
  { name: "Pendidikan", href: "#pendidikan", icon: <GraduationCap className="w-4 h-4" /> },
  { name: "Keahlian", href: "#skills", icon: <Wrench className="w-4 h-4" /> },
  { name: "Proyek", href: "#projects", icon: <FolderKanban className="w-4 h-4" /> },
  { name: "Pengalaman", href: "#experience", icon: <Briefcase className="w-4 h-4" /> },
  { name: "Sertifikat", href: "#sertifikat", icon: <Award className="w-4 h-4" /> },
  { name: "Kontak", href: "#contact", icon: <Mail className="w-4 h-4" /> },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")
  const [mounted, setMounted] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace("#", ""))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(`#${currentSection}`)
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    // Set initial active section
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    setActiveSection(href)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleDemoLogin = async () => {
    try {
      await signIn("credentials", {
        username: "admin",
        password: "admin123",
        redirect: true,
        callbackUrl: "/admin",
      })
    } catch (error) {
      console.error("Demo login error:", error)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong border-b border-purple-500/20 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            <Link href="#home" onClick={() => handleNavClick("#home")}>
              Portfolio
            </Link>
          </motion.div>

          {/* Desktop Menu - Using PillNav */}
          <div className="hidden lg:flex items-center gap-6">
            {mounted ? (
              <PillNav 
                items={navItems} 
                activeItem={activeSection}
                onItemClick={handleNavClick}
              />
            ) : (
              <PillNav 
                items={navItems} 
                activeItem="#home"
                onItemClick={handleNavClick}
              />
            )}
            {session ? (
              <Link href="/admin">
                <Button size="sm" className="rounded-full">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="rounded-full border-purple-500/30">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Button
                  size="sm"
                  className="rounded-full"
                  onClick={handleDemoLogin}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Demo Login
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-purple-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 space-y-2 border-t border-purple-500/20"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left text-sm font-medium text-purple-200/70 hover:text-purple-300 transition-colors py-2 px-4 rounded-lg hover:bg-purple-500/10"
              >
                {item.name}
              </button>
            ))}
            <div className="px-4 pt-2 space-y-2 border-t border-purple-500/20 mt-2">
              {session ? (
                <Link href="/admin" className="block">
                  <Button className="w-full rounded-full" size="sm">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button variant="outline" className="w-full rounded-full border-purple-500/30" size="sm">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Button
                    className="w-full rounded-full"
                    size="sm"
                    onClick={handleDemoLogin}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Demo Login
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
