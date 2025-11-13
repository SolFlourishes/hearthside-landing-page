import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check admin role
    const { data: profile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { type, title, subject, content, scheduledFor, targetAudience, status } = await request.json()

    // Save notification to database
    const { data: notification, error: insertError } = await supabase
      .from("scheduled_notifications")
      .insert({
        type,
        title,
        subject,
        content,
        status: status === "send" ? "sent" : status === "schedule" ? "scheduled" : "draft",
        scheduled_for: scheduledFor || null,
        sent_at: status === "send" ? new Date().toISOString() : null,
        target_audience: { filter: targetAudience },
        created_by: user.id,
      })
      .select()
      .single()

    if (insertError) {
      console.error("[v0] Error creating notification:", insertError)
      return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
    }

    // If sending immediately, process the email queue
    if (status === "send") {
      // Get target users based on audience filter
      let query = supabase.from("user_profiles").select("id, email, first_name, notification_preferences")

      if (targetAudience === "quiz_completed") {
        query = query.not("communication_style", "is", null)
      } else if (targetAudience === "active_users") {
        query = query.gt("last_active", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      }

      const { data: users } = await query

      if (users && users.length > 0) {
        // Filter users who have email notifications enabled
        const eligibleUsers = users.filter((u) => u.notification_preferences?.email_enabled !== false && u.email)

        // Update recipient count
        await supabase
          .from("scheduled_notifications")
          .update({ recipient_count: eligibleUsers.length })
          .eq("id", notification.id)

        // Send emails (this would ideally be done in a background job)
        if (process.env.RESEND_API_KEY) {
          const resend = new Resend(process.env.RESEND_API_KEY)
          let sentCount = 0

          for (const targetUser of eligibleUsers) {
            try {
              await resend.emails.send({
                from: "Hearthside Works <notifications@hearthsideworks.com>",
                to: targetUser.email,
                subject,
                html: content, // Would use email template here
              })

              // Log successful send
              await supabase.from("notification_logs").insert({
                user_id: targetUser.id,
                notification_id: notification.id,
                type,
                subject,
                status: "sent",
              })

              sentCount++
            } catch (emailError) {
              console.error(`[v0] Failed to send to ${targetUser.email}:`, emailError)
              // Log failed send
              await supabase.from("notification_logs").insert({
                user_id: targetUser.id,
                notification_id: notification.id,
                type,
                subject,
                status: "failed",
                error_message: String(emailError),
              })
            }
          }

          // Update sent count
          await supabase.from("scheduled_notifications").update({ sent_count: sentCount }).eq("id", notification.id)
        }
      }
    }

    return NextResponse.json({ success: true, notification })
  } catch (error) {
    console.error("[v0] Error in admin notifications API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
