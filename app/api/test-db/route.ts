import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count()
    const adminUser = await prisma.user.findUnique({
      where: { username: "admin" },
    })

    return NextResponse.json({
      success: true,
      database: "connected",
      userCount,
      adminExists: !!adminUser,
      adminUser: adminUser ? {
        id: adminUser.id,
        username: adminUser.username,
        hasPassword: !!adminUser.password,
      } : null,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

