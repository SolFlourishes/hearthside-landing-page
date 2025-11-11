import { put } from "@vercel/blob"
import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.log("[v0] Avatar upload - Unauthorized:", authError)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "File must be a valid image (JPEG, PNG, GIF, or WebP)" }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 })
    }

    const filename = `avatars/${user.id}-${Date.now()}-${file.name}`
    const blob = await put(filename, file, {
      access: "public",
    })

    console.log("[v0] Avatar uploaded to Blob successfully:", blob.url)

    const { error: updateError } = await supabase.from("profiles").update({ avatar_url: blob.url }).eq("id", user.id)

    if (updateError) {
      console.error("[v0] Error updating profile with avatar URL:", updateError)
      // Don't fail the upload if profile update fails, just log it
    }

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("[v0] Avatar upload error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload avatar" },
      { status: 500 },
    )
  }
}
