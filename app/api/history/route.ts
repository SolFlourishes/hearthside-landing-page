import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
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
    const {
      interaction_type,
      original_text,
      result_text,
      sender_profile,
      receiver_profile,
      context_options,
      recipient_profile_id,
      rating,
      user_feedback,
    } = body

    const { data: history, error } = await supabase
      .from("communication_history")
      .insert({
        user_id: user.id,
        interaction_type,
        original_text,
        result_text,
        sender_profile,
        receiver_profile,
        context_options,
        recipient_profile_id,
        rating,
        user_feedback,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Update recipient usage count if applicable
    if (recipient_profile_id) {
      await supabase.rpc("increment_recipient_usage", {
        recipient_id: recipient_profile_id,
      })
    }

    return NextResponse.json({ history })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save history" },
      { status: 400 },
    )
  }
}
