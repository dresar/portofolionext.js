"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Wrench,
  FolderKanban,
  BookOpen,
  Briefcase,
  Award,
  Tag,
  Cloud,
  Mail,
  FileText,
  UserCog,
  Settings,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profil", label: "Profil", icon: User },
  { href: "/admin/pendidikan", label: "Pendidikan", icon: GraduationCap },
  { href: "/admin/keahlian", label: "Keahlian", icon: Wrench },
  { href: "/admin/projects", label: "Project", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/pengalaman", label: "Pengalaman", icon: Briefcase },
  { href: "/admin/sertifikat", label: "Sertifikat", icon: Award },
  { href: "/admin/kategori", label: "Kategori", icon: Tag },
  { href: "/admin/cdn", label: "CDN", icon: Cloud },
  { href: "/admin/messages", label: "Kontak", icon: Mail },
  { href: "/admin/template", label: "Template", icon: FileText },
  { href: "/admin/admin-profile", label: "Admin Profile", icon: UserCog },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/pengaturan", label: "Pengaturan", icon: Settings },
]

type AdminSidebarProps = {
  open: boolean
  onClose: () => void
  onToggle?: () => void
}

export function AdminSidebar({ open, onClose, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!mounted) return
    
    const handleClickOutside = (event: MouseEvent) => {
      if (open && window.innerWidth < 1024) {
        const target = event.target as HTMLElement
        if (!target.closest(".admin-sidebar") && !target.closest(".admin-header")) {
          onClose()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open, onClose, mounted])

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (!mounted) return
    
    if (window.innerWidth < 1024) {
      onClose()
    }
  }, [pathname, onClose, mounted])

  // Determine sidebar visibility - always use same class structure to prevent hydration mismatch
  // Server and initial client render: hidden on mobile, visible on desktop
  // After mount: use state to control mobile visibility
  const sidebarClass = cn(
    "admin-sidebar fixed lg:fixed top-0 left-0 h-screen w-64 bg-background border-r border-border z-40 transition-transform duration-300 ease-in-out m-0 p-0",
    // Server and initial render: always use default (hidden on mobile, visible on desktop)
    // After mount, update based on state
    !mounted 
      ? "-translate-x-full lg:translate-x-0"
      : (open ? "translate-x-0" : "-translate-x-full lg:translate-x-0")
  )

  return (
    <>
      {/* Mobile Overlay - Always render to prevent hydration mismatch */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          mounted && open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        suppressHydrationWarning
        aria-hidden={!mounted || !open}
      />

      {/* Sidebar - Always render to prevent hydration mismatch */}
      <aside
        className={sidebarClass}
        suppressHydrationWarning
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="h-12 md:h-14 flex items-center justify-between border-b border-border px-3 md:px-4">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-lg hidden lg:block">Admin</span>
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              // Use pathname directly but only highlight when mounted to prevent hydration mismatch
              const isActive = pathname === item.href

              return (
                <Button
                  key={item.href}
                  variant={isActive && mounted ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10 md:h-11 text-sm",
                    isActive && mounted && "bg-primary/10 text-primary font-medium"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
