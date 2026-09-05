"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PillNavItem {
  name: string
  href: string
  icon?: React.ReactNode
}

interface PillNavProps {
  items: PillNavItem[]
  activeItem?: string
  onItemClick?: (href: string) => void
  className?: string
}

export default function PillNav({ items, activeItem, onItemClick, className }: PillNavProps) {
  const [active, setActive] = useState(activeItem || items[0]?.href)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (activeItem) {
      setActive(activeItem)
    }
  }, [activeItem])

  const handleClick = (href: string) => {
    setActive(href)
    if (onItemClick) {
      onItemClick(href)
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Always render same structure to prevent hydration mismatch
  const defaultActive = activeItem || items[0]?.href || "#home"

  return (
    <nav className={cn("flex items-center gap-2 p-1.5 rounded-full glass border border-primary/20 backdrop-blur-lg", className)} suppressHydrationWarning>
      {items.map((item) => {
        const isActive = mounted ? active === item.href : defaultActive === item.href
        return (
          <motion.button
            key={item.href}
            onClick={() => handleClick(item.href)}
            className={cn(
              "relative px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300",
              "flex items-center gap-2",
              isActive
                ? "text-primary-foreground"
                : "text-purple-200/70 hover:text-purple-300"
            )}
            whileHover={mounted ? { scale: 1.05 } : {}}
            whileTap={mounted ? { scale: 0.95 } : {}}
            initial={false}
            animate={mounted ? { opacity: 1 } : {}}
            suppressHydrationWarning
          >
            {isActive && mounted && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full shadow-lg shadow-primary/50"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {isActive && !mounted && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full shadow-lg shadow-primary/50" />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.name}
            </span>
          </motion.button>
        )
      })}
    </nav>
  )
}

