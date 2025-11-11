import { NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Get Firestore instance
    const db = getDb()

    // Save contact form submission to Firebase
    const contactSubmission = {
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    const docRef = await db.collection("contact-submissions").add(contactSubmission)

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: "Hearthside Works <contact@hearthsideworks.com>",
          to: "sol@hearthsideworks.com",
          replyTo: email,
          subject: `New Contact Form: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
            <hr>
            <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
            <p><small>Submission ID: ${docRef.id}</small></p>
          `,
        })
        console.log("[v0] Email notification sent for submission:", docRef.id)
      } catch (emailError) {
        console.error("[v0] Failed to send email notification:", emailError)
        // Continue even if email fails - form is still saved to Firebase
      }
    } else {
      console.log("[v0] Resend API key not configured - skipping email notification")
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
        id: docRef.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}
