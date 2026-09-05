"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { ReactNode, useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface LanyardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "gradient" | "glass" | "card"
  hover?: boolean
  showLanyard?: boolean
  draggable?: boolean
  size?: "sm" | "md" | "lg"
}

interface LanyardHeaderProps {
  children: ReactNode
  className?: string
}

interface LanyardBodyProps {
  children: ReactNode
  className?: string
}

interface LanyardFooterProps {
  children: ReactNode
  className?: string
}

// Logo atom/star icon untuk lanyard
const LanyardLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <ellipse cx="12" cy="12" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
  </svg>
)

export function Lanyard({ 
  children, 
  className, 
  variant = "default", 
  hover = true, 
  showLanyard = true,
  draggable = true,
  size = "md"
}: LanyardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  const variantStyles = {
    default: "bg-background/50 border border-primary/20",
    gradient: "bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/30",
    glass: "glass border border-primary/20 backdrop-blur-lg",
    card: "bg-white border border-gray-200 shadow-xl",
  }

  const sizeStyles = {
    sm: "p-3 md:p-4 text-sm",
    md: "p-4 md:p-6 text-base",
    lg: "p-6 md:p-8 text-lg",
  }

  const lanyardSizeStyles = {
    sm: "w-1 h-8",
    md: "w-1.5 h-10",
    lg: "w-1.5 h-12",
  }

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl shadow-lg",
        draggable && "cursor-grab active:cursor-grabbing",
        showLanyard && "pt-6 md:pt-8", // Extra padding top untuk lanyard (diperkecil)
        variantStyles[variant],
        sizeStyles[size],
        hover && !isDragging && "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20",
        "transition-all duration-300",
        className
      )}
      drag={draggable}
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      onDrag={(event, info) => {
        x.set(info.offset.x)
        y.set(info.offset.y)
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false)
        x.set(0)
        y.set(0)
      }}
      style={{
        x: draggable ? x : undefined,
        y: draggable ? y : undefined,
        rotateX: draggable && isDragging ? rotateX : undefined,
        rotateY: draggable && isDragging ? rotateY : undefined,
        zIndex: isDragging ? 50 : 1,
      }}
      whileHover={hover && !isDragging ? { y: -4, scale: 1.02 } : {}}
      whileDrag={draggable ? { scale: 1.05, zIndex: 50 } : {}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Lanyard Strap - Tali lanyard hitam dengan logo putih (diperkecil) */}
      {showLanyard && (
        <div className={cn("absolute -top-8 left-1/2 transform -translate-x-1/2 z-50", size === "sm" && "-top-6", size === "lg" && "-top-12")}>
          {/* Tali lanyard */}
          <div className={cn("relative bg-black rounded-full shadow-lg", lanyardSizeStyles[size])}>
            {/* Logo putih berulang di sepanjang tali */}
            <div className={cn("absolute left-1/2 transform -translate-x-1/2", size === "sm" ? "top-1.5" : size === "md" ? "top-2" : "top-2")}>
              <LanyardLogo className={cn("text-white", size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-3 h-3")} />
            </div>
            <div className={cn("absolute left-1/2 transform -translate-x-1/2", size === "sm" ? "top-4" : size === "md" ? "top-5" : "top-6")}>
              <LanyardLogo className={cn("text-white", size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-3 h-3")} />
            </div>
            {size !== "sm" && (
              <div className={cn("absolute left-1/2 transform -translate-x-1/2", size === "md" ? "top-8" : "top-10")}>
                <LanyardLogo className={cn("text-white", size === "md" ? "w-3 h-3" : "w-3 h-3")} />
              </div>
            )}
          </div>
          
          {/* Klip plastik hitam (diperkecil) */}
          <div className={cn("absolute -bottom-1 left-1/2 transform -translate-x-1/2", size === "sm" && "-bottom-0.5")}>
            <div className={cn("bg-black rounded-sm shadow-md flex items-center justify-center", size === "sm" ? "w-4 h-3" : size === "md" ? "w-5 h-3.5" : "w-6 h-4")}>
              <div className={cn("bg-gray-800", size === "sm" ? "w-3 h-0.5" : size === "md" ? "w-3.5 h-0.5" : "w-4 h-0.5")} />
            </div>
          </div>
        </div>
      )}

      {/* Lanyard badge effect - top corner (fallback jika tidak pakai lanyard) */}
      {!showLanyard && (
        <div className={cn("absolute -top-3 -right-3 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-primary/50", size === "sm" ? "w-12 h-12" : size === "md" ? "w-14 h-14" : "w-16 h-16")}>
          <div className={cn("bg-background rounded-full flex items-center justify-center", size === "sm" ? "w-9 h-9" : size === "md" ? "w-10 h-10" : "w-12 h-12")}>
            <div className={cn("bg-gradient-to-br from-primary to-purple-600 rounded-full", size === "sm" ? "w-6 h-6" : size === "md" ? "w-7 h-7" : "w-8 h-8")} />
          </div>
        </div>
      )}

      {/* Logo di tengah kartu (untuk variant card) */}
      {variant === "card" && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <LanyardLogo className={cn("text-black", size === "sm" ? "w-24 h-24" : size === "md" ? "w-28 h-28" : "w-32 h-32")} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Decorative corner elements */}
      {variant !== "card" && (
        <>
          <div className={cn("absolute top-0 left-0 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl", size === "sm" ? "w-12 h-12" : size === "md" ? "w-16 h-16" : "w-20 h-20")} />
          <div className={cn("absolute bottom-0 right-0 border-b-2 border-r-2 border-primary/20 rounded-br-2xl", size === "sm" ? "w-12 h-12" : size === "md" ? "w-16 h-16" : "w-20 h-20")} />
        </>
      )}
    </motion.div>
  )
}

export function LanyardHeader({ children, className }: LanyardHeaderProps) {
  return (
    <div className={cn("mb-3 md:mb-4 pb-3 md:pb-4 border-b border-primary/20 dark:border-gray-300/20", className)}>
      {children}
    </div>
  )
}

export function LanyardBody({ children, className }: LanyardBodyProps) {
  return (
    <div className={cn("space-y-3 md:space-y-4", className)}>
      {children}
    </div>
  )
}

export function LanyardFooter({ children, className }: LanyardFooterProps) {
  return (
    <div className={cn("mt-3 md:mt-4 pt-3 md:pt-4 border-t border-primary/20 dark:border-gray-300/20", className)}>
      {children}
    </div>
  )
}
