"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"

export async function markMessageAsRead(messageId: string) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.message.update({
      where: { id: messageId },
      data: { read: true },
    })
    revalidatePath("/admin/messages")
    revalidatePath("/admin")
  } catch (error) {
    console.error("Error marking message as read:", error)
    throw error
  }
}

export async function deleteMessage(messageId: string) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.message.delete({
      where: { id: messageId },
    })
    revalidatePath("/admin/messages")
    revalidatePath("/admin")
  } catch (error) {
    console.error("Error deleting message:", error)
    throw error
  }
}

export async function deleteMessages(messageIds: string[]) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.message.deleteMany({
      where: { id: { in: messageIds } },
    })
    revalidatePath("/admin/messages")
    revalidatePath("/admin")
  } catch (error) {
    console.error("Error deleting messages:", error)
    throw error
  }
}

export async function markAllMessagesAsRead() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.message.updateMany({
      where: { read: false },
      data: { read: true },
    })
    revalidatePath("/admin/messages")
    revalidatePath("/admin")
  } catch (error) {
    console.error("Error marking all messages as read:", error)
    throw error
  }
}
