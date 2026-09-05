import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { NextRequest, NextResponse } from "next/server"

export async function saveFile(file: File, folder: string = "uploads"): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Create uploads directory if it doesn't exist
  const uploadsDir = join(process.cwd(), "public", folder)
  try {
    await mkdir(uploadsDir, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }

  // Generate unique filename
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = file.name.split(".").pop()?.toLowerCase()
  const filename = `${timestamp}-${randomString}.${extension}`

  // Save file
  const filepath = join(uploadsDir, filename)
  await writeFile(filepath, buffer)

  // Return public URL
  return `/${folder}/${filename}`
}

export async function handleUpload(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Get folder from formData
    const folder = formData.get("folder") as string || "uploads"
    
    // Validate file type
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    const allowedPdfTypes = ["application/pdf"]
    
    if (folder === "cv") {
      if (!allowedPdfTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type. Only PDF allowed for CV" }, { status: 400 })
      }
    } else {
      if (!allowedImageTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
      }
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 })
    }

    const url = await saveFile(file, folder)
    return NextResponse.json({ url })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 })
  }
}

