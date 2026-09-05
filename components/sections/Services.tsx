"use client"

import { motion } from "framer-motion"
import { Code, Palette, Smartphone, Database, Zap, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Membangun aplikasi web modern dengan teknologi terdepan seperti Next.js, React, dan TypeScript.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Mendesain antarmuka yang menarik dan user-friendly dengan fokus pada pengalaman pengguna.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Mengembangkan aplikasi mobile responsif yang bekerja sempurna di semua perangkat.",
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Membangun API yang scalable dan aman dengan Node.js, Prisma, dan database modern.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Mengoptimalkan performa aplikasi untuk loading yang cepat dan pengalaman yang mulus.",
  },
  {
    icon: Globe,
    title: "Deployment & DevOps",
    description: "Menyiapkan dan mengelola infrastruktur cloud untuk deployment yang handal.",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
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
            <span className="text-white">Layanan</span>{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Saya
            </span>
          </h2>
          <p className="text-purple-200/70 text-lg max-w-2xl mx-auto">
            Layanan yang saya tawarkan untuk membantu mewujudkan proyek Anda
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-strong border-purple-500/20 hover:border-purple-500/40 h-full transition-all">
                  <CardHeader>
                    <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-purple-200/70">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

