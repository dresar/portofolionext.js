"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MailCheck, Clock, Trash2, Search, Filter, CheckSquare, Square } from "lucide-react"
import { useRouter } from "next/navigation"

type Message = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  read: boolean
  createdAt: Date
}

type MessagesClientProps = {
  messages: Message[]
  unreadCount: number
  markMessageAsRead: (id: string) => Promise<void>
  deleteMessage: (id: string) => Promise<void>
  deleteMessages: (ids: string[]) => Promise<void>
}

export default function MessagesClient({
  messages,
  unreadCount,
  markMessageAsRead,
  deleteMessage,
  deleteMessages,
}: MessagesClientProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !msg.read) ||
      (filter === "read" && msg.read)

    return matchesSearch && matchesFilter
  })

  const handleSelectAll = () => {
    if (selectedIds.length === filteredMessages.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredMessages.map((m) => m.id))
    }
  }

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return
    if (!confirm(`Yakin ingin menghapus ${selectedIds.length} pesan?`)) return

    setIsDeleting(true)
    try {
      await deleteMessages(selectedIds)
      setSelectedIds([])
      router.refresh()
    } catch (error) {
      console.error("Error deleting messages:", error)
      alert("Gagal menghapus pesan")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return
    try {
      await deleteMessage(id)
      router.refresh()
    } catch (error) {
      console.error("Error deleting message:", error)
      alert("Gagal menghapus pesan")
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await markMessageAsRead(id)
      router.refresh()
    } catch (error) {
      console.error("Error marking message as read:", error)
      alert("Gagal menandai pesan")
    }
  }

  if (messages.length === 0) {
    return (
      <Card className="glass">
        <CardContent className="py-12 md:py-16 text-center">
          <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Belum ada pesan</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari pesan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                Semua
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("unread")}
              >
                Belum Dibaca ({unreadCount})
              </Button>
              <Button
                variant={filter === "read" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("read")}
              >
                Sudah Dibaca
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <Card className="glass border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedIds.length} pesan dipilih
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedIds([])}
                >
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus {selectedIds.length} Pesan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <Card className="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Tidak ada pesan yang cocok</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Menampilkan {filteredMessages.length} dari {messages.length} pesan
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelectAll}
            >
              {selectedIds.length === filteredMessages.length ? (
                <>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Batal Pilih Semua
                </>
              ) : (
                <>
                  <Square className="mr-2 h-4 w-4" />
                  Pilih Semua
                </>
              )}
            </Button>
          </div>

          {filteredMessages.map((message) => (
            <Card
              key={message.id}
              className={`glass transition-colors ${
                !message.read ? "border-primary/50 bg-primary/5" : ""
              } ${selectedIds.includes(message.id) ? "ring-2 ring-primary" : ""}`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleToggleSelect(message.id)}
                    className="mt-1"
                  >
                    {selectedIds.includes(message.id) ? (
                      <CheckSquare className="h-5 w-5 text-primary" />
                    ) : (
                      <Square className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-2">
                          {message.read ? (
                            <MailCheck className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          ) : (
                            <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base md:text-lg mb-1 line-clamp-1">
                              {message.name}
                            </CardTitle>
                            <CardDescription className="line-clamp-1">
                              {message.email}
                            </CardDescription>
                          </div>
                        </div>
                        {message.subject && (
                          <p className="text-sm font-medium mt-2 line-clamp-1">
                            {message.subject}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        {!message.read && (
                          <Badge variant="default" className="bg-primary w-fit">
                            Baru
                          </Badge>
                        )}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            {new Date(message.createdAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
                  {message.message}
                </p>
                <div className="flex flex-wrap gap-2">
                  {!message.read && (
                    <Button
                      onClick={() => handleMarkAsRead(message.id)}
                      variant="outline"
                      size="sm"
                    >
                      <MailCheck className="mr-2 h-4 w-4" />
                      Tandai Dibaca
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDelete(message.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `mailto:${message.email}?subject=Re: ${message.subject || 'Pesan'}`}
                  >
                    Balas Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

