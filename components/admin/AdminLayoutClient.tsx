"use client"

import { useState } from "react"
import { AdminHeader } from "./AdminHeader"
import { AdminSidebar } from "./AdminSidebar"

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-background m-0 p-0" suppressHydrationWarning>
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} onClose={closeSidebar} onToggle={toggleSidebar} />
      
      {/* Main Content Area */}
      <div className="lg:ml-64 transition-all duration-300 m-0 p-0">
        {/* Header - Fixed tidak bergerak */}
        <AdminHeader onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
        
        {/* Content - Dengan padding top untuk header */}
        <main className="pt-16 md:pt-20 m-0">
          <div className="p-0 md:p-1 lg:p-2">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
