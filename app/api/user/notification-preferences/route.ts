import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { preferences } = await request.json()

    const { error } = await supabase
      .from("user_profiles")
      .update({ notification_preferences: preferences })
      .eq("id", user.id)

    if (error) {
      console.error("[v0] Error updating preferences:", error)
      return NextResponse.json({ error: "Failed to update preferences" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in notification preferences API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
