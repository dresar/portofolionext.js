import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const keahlian = await prisma.keahlian.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(keahlian)
  } catch (error) {
    console.error("Error fetching keahlian:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data keahlian" },
      { status: 500 }
    )
  }
}

