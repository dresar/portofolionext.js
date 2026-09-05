import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Copy, ExternalLink } from "lucide-react"
import CDNForm from "./CDNForm"
import CDNClient from "./CDNClient"

export default async function CDNPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const cdns = await prisma.cDN.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-2 md:space-y-3 m-0 p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">CDN</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Kelola file CDN dan media ({cdns.length} file)
          </p>
        </div>
        <CDNForm />
      </div>

      <CDNClient cdns={cdns} />
    </div>
  )
}

