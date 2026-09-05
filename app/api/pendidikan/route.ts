import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const pendidikan = await prisma.pendidikan.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(pendidikan)
  } catch (error) {
    console.error("Error fetching pendidikan:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data pendidikan" },
      { status: 500 }
    )
  }
}

