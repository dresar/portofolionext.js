"use client"

import { motion } from "framer-motion"
import { Mail, Send, MapPin, Phone } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Profile = {
  email: string | null
  phone: string | null
  location: string | null
}

export default function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error("Error fetching profile:", error))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
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
            <span className="text-white">Hubungi</span>{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Saya
            </span>
          </h2>
          <p className="text-purple-200/70 text-lg max-w-2xl mx-auto">
            Mari berkolaborasi dan wujudkan ide-ide kreatif bersama! Saya siap membantu merealisasikan visi digital Anda dengan solusi teknologi terdepan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Card className="glass-strong border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Hubungi Saya</CardTitle>
                <CardDescription className="text-purple-200/70">
                  Available for projects | Quick response
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile?.email && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">Email</h4>
                      <a href={`mailto:${profile.email}`} className="text-purple-200/70 hover:text-purple-300 transition-colors">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <Phone className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">Telepon</h4>
                      <a href={`tel:${profile.phone}`} className="text-purple-200/70 hover:text-purple-300 transition-colors">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <MapPin className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">Lokasi</h4>
                      <p className="text-purple-200/70">
                        {profile.location}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass-strong border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Kirim Pesan</CardTitle>
                <CardDescription className="text-purple-200/70">
                  Isi form di bawah untuk menghubungi saya
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-purple-200">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background/50 border-purple-500/20 text-white placeholder:text-purple-200/50"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-purple-200">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background/50 border-purple-500/20 text-white placeholder:text-purple-200/50"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-purple-200">Subjek</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-background/50 border-purple-500/20 text-white placeholder:text-purple-200/50"
                      placeholder="Subjek pesan"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-purple-200">Pesan *</Label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="flex min-h-[120px] w-full rounded-lg border border-purple-500/20 bg-background/50 px-3 py-2 text-sm text-white placeholder:text-purple-200/50 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>
                  {success && (
                    <div className="p-3 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg">
                      Pesan berhasil dikirim! Saya akan membalas segera.
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full"
                    size="lg"
                  >
                    {loading ? (
                      "Mengirim..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Kirim Pesan
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
