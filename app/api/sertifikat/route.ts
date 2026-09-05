import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const sertifikat = await prisma.sertifikat.findMany({
      orderBy: { issueDate: "desc" },
    })
    return NextResponse.json(sertifikat)
  } catch (error) {
    console.error("Error fetching sertifikat:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data sertifikat" },
      { status: 500 }
    )
  }
}

