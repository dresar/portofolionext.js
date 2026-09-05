import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { markMessageAsRead, deleteMessage, deleteMessages, markAllMessagesAsRead } from "@/app/actions/messages"
import { Mail, MailCheck, Clock, Trash2, CheckCheck, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MessagesClient from "./MessagesClient"

export default async function MessagesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  })

  const unreadCount = messages.filter(m => !m.read).length
  const totalCount = messages.length

  return (
    <div className="space-y-2 md:space-y-3 m-0 p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Messages</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} pesan belum dibaca dari ${totalCount} total` : `Semua ${totalCount} pesan sudah dibaca`}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <form action={markAllMessagesAsRead}>
              <Button type="submit" variant="outline" size="sm">
                <CheckCheck className="mr-2 h-4 w-4" />
                Tandai Semua Dibaca
              </Button>
            </form>
          )}
        </div>
      </div>

      <MessagesClient 
        messages={messages} 
        unreadCount={unreadCount}
        markMessageAsRead={markMessageAsRead}
        deleteMessage={deleteMessage}
        deleteMessages={deleteMessages}
      />
    </div>
  )
}
