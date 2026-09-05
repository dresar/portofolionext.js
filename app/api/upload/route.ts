import { NextRequest } from "next/server"
import { handleUpload } from "@/lib/upload"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

  return handleUpload(request)
}

