import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  return NextResponse.json({ profile })
}

export async function PATCH(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { display_name, avatar_url, bio, communication_style } = body

    const updates: Record<string, unknown> = {}
    if (display_name !== undefined) updates.display_name = display_name
    if (avatar_url !== undefined) updates.avatar_url = avatar_url
    if (bio !== undefined) updates.bio = bio
    if (communication_style !== undefined) updates.communication_style = communication_style

    const { data: profile, error: updateError } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update profile" },
      { status: 400 },
    )
  }
}
