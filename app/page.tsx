import dynamic from "next/dynamic"
import ErrorBoundary from "@/components/ErrorBoundary"

// Critical - Load immediately but client-side only (uses NextAuth and Three.js)
const Navbar = dynamic(() => import("@/components/ui/Navbar"), { 
  ssr: false // Client-side only karena menggunakan useSession dan client components
})

const Hero = dynamic(() => import("@/components/sections/Hero"), { 
  ssr: false, // Client-side only karena menggunakan Three.js dan dynamic imports
  loading: () => (
    <section className="relative min-h-screen flex items-center justify-center bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-background to-purple-900/10" />
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="h-6 w-32 bg-purple-500/20 rounded-full animate-pulse" />
            <div className="h-20 bg-purple-500/10 rounded-lg animate-pulse" />
          </div>
          <div className="w-full h-96 bg-purple-500/10 rounded-3xl animate-pulse" />
        </div>
      </div>
    </section>
  )
})

// Below the fold - Lazy load with intersection observer
const About = dynamic(() => import("@/components/sections/About"), { 
  ssr: false, // Lazy load
})
const Skills = dynamic(() => import("@/components/sections/Skills"), { 
  ssr: false,
})
const Projects = dynamic(() => import("@/components/sections/Projects"), { 
  ssr: false,
})
const Pendidikan = dynamic(() => import("@/components/sections/Pendidikan"), { 
  ssr: false,
})
const Experience = dynamic(() => import("@/components/sections/Experience"), { 
  ssr: false,
})
const Sertifikat = dynamic(() => import("@/components/sections/Sertifikat"), { 
  ssr: false,
})
const Contact = dynamic(() => import("@/components/sections/Contact"), { 
  ssr: false,
})
const Footer = dynamic(() => import("@/components/sections/Footer"), { 
  ssr: false,
})

export default function Home() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-background">
        <Navbar />
        <div id="home">
          <Hero />
        </div>
        <About />
        <Pendidikan />
        <Skills />
        <Projects />
        <Experience />
        <Sertifikat />
        <Contact />
        <Footer />
      </main>
    </ErrorBoundary>
  )
}
