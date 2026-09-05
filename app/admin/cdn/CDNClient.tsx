"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Copy, ExternalLink } from "lucide-react"

type CDN = {
  id: string
  name: string
  url: string
  type: string
  size: string | null
  mimeType: string | null
  description: string | null
}

type CDNClientProps = {
  cdns: CDN[]
}

export default function CDNClient({ cdns }: CDNClientProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (cdns.length === 0) {
    return (
      <Card className="glass">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Belum ada file CDN</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cdns.map((cdn) => (
        <Card key={cdn.id} className="glass">
          <CardHeader>
            <CardTitle className="text-lg">{cdn.name}</CardTitle>
            {cdn.type && (
              <CardDescription>
                <Badge variant="outline">{cdn.type}</Badge>
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  value={cdn.url}
                  readOnly
                  className="flex-1 text-xs font-mono"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(cdn.url)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <a
                  href={cdn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
              {cdn.size && (
                <p className="text-xs text-muted-foreground">Size: {cdn.size}</p>
              )}
              {cdn.mimeType && (
                <p className="text-xs text-muted-foreground">Type: {cdn.mimeType}</p>
              )}
            </div>
            {cdn.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {cdn.description}
              </p>
            )}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" className="flex-1">
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

