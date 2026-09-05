import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const pengalaman = await prisma.pengalaman.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(pengalaman)
  } catch (error) {
    console.error("Error fetching pengalaman:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data pengalaman" },
      { status: 500 }
    )
  }
}

