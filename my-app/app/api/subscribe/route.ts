import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address", success: false }, { status: 400 })
    }

    // Initialize Resend with API key from environment variable
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Add contact to Resend audience
    // You'll need to create an audience in Resend dashboard and get the audience ID
    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (!audienceId) {
      console.error("[v0] RESEND_AUDIENCE_ID not configured")
      // Still log the subscription for manual processing
      console.log("[v0] Newsletter subscription:", {
        email,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json({
        success: true,
        message: "Subscription received (manual processing required)",
      })
    }

    // Add contact to Resend audience
    await resend.contacts.create({
      email,
      audienceId,
    })

    console.log("[v0] Newsletter subscription successful:", email)

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    })
  } catch (error) {
    console.error("[v0] Subscribe API error:", error)
    return NextResponse.json({ error: "Failed to subscribe", success: false }, { status: 500 })
  }
}
