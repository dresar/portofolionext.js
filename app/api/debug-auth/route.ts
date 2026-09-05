import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Test database connection
    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found",
        username,
      })
    }

    if (!user.password) {
      return NextResponse.json({
        success: false,
        error: "User has no password",
        user: { id: user.id, username: user.username },
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    return NextResponse.json({
      success: true,
      userFound: true,
      hasPassword: true,
      passwordValid: isPasswordValid,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
      },
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

