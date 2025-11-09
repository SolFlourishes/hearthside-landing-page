import { createClient } from "@/lib/supabase/server"
import { checkAdminAuth } from "@/lib/admin-auth"
import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await checkAdminAuth()

  if (!authResult.isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = await createClient()
  const { id } = await params

  try {
    const body = await request.json()
    const { tier } = body

    const { data, error } = await supabase.from("profiles").update({ tier }).eq("id", id).select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, profile: data })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update tier" },
      { status: 400 },
    )
  }
}
