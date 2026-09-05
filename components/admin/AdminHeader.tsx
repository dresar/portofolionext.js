"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X, LogOut, User, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type AdminHeaderProps = {
  onMenuClick: () => void
  sidebarOpen: boolean
}

export function AdminHeader({ onMenuClick, sidebarOpen }: AdminHeaderProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get page title from pathname
  const getPageTitle = () => {
    const path = pathname.replace("/admin", "") || "/"
    const titles: Record<string, string> = {
      "/": "Dashboard",
      "/profil": "Profil",
      "/pendidikan": "Pendidikan",
      "/keahlian": "Keahlian",
      "/projects": "Projects",
      "/blog": "Blog",
      "/pengalaman": "Pengalaman",
      "/sertifikat": "Sertifikat",
      "/kategori": "Kategori",
      "/cdn": "CDN",
      "/messages": "Kontak",
      "/template": "Template",
      "/admin-profile": "Admin Profile",
      "/pengaturan": "Pengaturan",
      "/analytics": "Analytics",
    }
    return titles[path] || "Admin Panel"
  }

  // Always render header structure to prevent hydration mismatch
  const pageTitle = mounted ? getPageTitle() : "Dashboard"

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 z-50 w-full lg:w-[calc(100%-16rem)] border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 m-0 p-0">
      <div className="flex h-16 md:h-20 items-center gap-3 md:gap-4 px-3 md:px-6 m-0">
        {/* Hamburger Menu - Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-10 w-10"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          {mounted && sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Page Title */}
        <div className="flex-1">
          <h1 className="text-lg md:text-2xl font-semibold truncate">
            {pageTitle}
          </h1>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Website Link */}
          <Link href="/" target="_blank">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center gap-2 h-9 md:h-11 px-3 md:px-4 text-sm md:text-base"
            >
              <Globe className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden md:inline">Website</span>
            </Button>
          </Link>

          {/* User Menu - Always render to prevent hydration mismatch */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 h-9 md:h-11 px-2 md:px-3"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm md:text-base font-semibold">
                  {mounted && session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "A"}
                </div>
                <span className="hidden md:inline text-sm md:text-base font-medium">
                  {mounted && session?.user?.name ? session.user.name : "Admin"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{mounted && session?.user?.name ? session.user.name : "Admin"}</p>
                  <p className="text-xs text-muted-foreground">{mounted && session?.user?.email ? session.user.email : ""}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/admin-profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/" target="_blank" className="flex items-center gap-2 cursor-pointer">
                  <Globe className="h-4 w-4" />
                  Lihat Website
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-red-600 focus:text-red-600 cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
