"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, Tech Startup",
    content: "Kerja yang sangat profesional! Tim development sangat responsif dan hasilnya melebihi ekspektasi. Highly recommended!",
    rating: 5,
    avatar: "JD",
  },
  {
    name: "Jane Smith",
    role: "Product Manager",
    content: "Aplikasi yang dibuat sangat user-friendly dan performanya luar biasa. Proses development juga sangat transparan.",
    rating: 5,
    avatar: "JS",
  },
  {
    name: "Mike Johnson",
    role: "Founder, Digital Agency",
    content: "Kolaborasi yang sangat menyenangkan. Developer ini benar-benar memahami kebutuhan bisnis dan memberikan solusi yang tepat.",
    rating: 5,
    avatar: "MJ",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden">
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
            <span className="text-white">Testimoni</span>{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Klien
            </span>
          </h2>
          <p className="text-purple-200/70 text-lg max-w-2xl mx-auto">
            Apa kata klien tentang kerja sama dengan saya
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Card className="glass-strong border-purple-500/20 hover:border-purple-500/40 h-full transition-all">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-purple-400 mb-4" />
                  <p className="text-purple-200/80 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-purple-500/30">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-300">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-purple-200/70">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

