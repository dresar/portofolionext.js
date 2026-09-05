"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, LogIn } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Debug: Test auth first
      const debugResponse = await fetch("/api/debug-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      
      if (debugResponse.ok) {
        const debugData = await debugResponse.json()
        console.log("Debug auth result:", debugData)
        
        if (!debugData.success) {
          setError(debugData.error || "Username atau password salah!")
          setLoading(false)
          return
        }
      }

      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      console.log("SignIn result:", result)

      if (result?.error) {
        console.error("Login error:", result.error)
        setError(`Error: ${result.error}. Cek console untuk detail.`)
      } else if (result?.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        setError("Login gagal. Silakan coba lagi.")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err?.message || "Terjadi kesalahan saat login")
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setError("")
    setLoading(true)
    setUsername("admin")
    setPassword("admin123")

    try {
      // Debug first
      const debugResponse = await fetch("/api/debug-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "admin123" }),
      })
      
      const debugData = await debugResponse.json()
      console.log("Demo debug result:", debugData)

      if (!debugData.success || !debugData.passwordValid) {
        setError("Akun demo tidak valid. Jalankan: npm run db:seed")
        setLoading(false)
        return
      }

      const result = await signIn("credentials", {
        username: "admin",
        password: "admin123",
        redirect: false,
        callbackUrl: "/admin",
      })

      console.log("Demo SignIn result:", result)

      if (result?.error) {
        console.error("Demo login error:", result.error)
        setError(`Error: ${result.error}`)
        setLoading(false)
      } else if (result?.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        setError("Login gagal. Silakan coba lagi.")
        setLoading(false)
      }
    } catch (err: any) {
      console.error("Demo login error:", err)
      setError(err?.message || "Terjadi kesalahan saat login demo")
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-950 via-background to-purple-900/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <Card className="w-full max-w-md glass-strong border-purple-500/20 relative z-10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Panel Admin
          </CardTitle>
          <CardDescription className="text-purple-200/70">
            Masuk untuk mengelola portofolio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-purple-200">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-background/50 border-purple-500/20 text-white placeholder:text-purple-200/50 focus:border-purple-500/50"
                autoComplete="username"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50 border-purple-500/20 text-white placeholder:text-purple-200/50 focus:border-purple-500/50"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={loading}
              size="lg"
            >
              {loading ? (
                "Memproses..."
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Masuk
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-purple-500/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-purple-200/50">atau</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full rounded-full border-purple-500/30 hover:bg-purple-500/10"
            onClick={handleDemoLogin}
            disabled={loading}
            size="lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Login Demo (Auto)
          </Button>

          <div className="text-center">
            <p className="text-xs text-purple-200/50">
              Demo: username: <span className="font-mono text-purple-300">admin</span>, password: <span className="font-mono text-purple-300">admin123</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
