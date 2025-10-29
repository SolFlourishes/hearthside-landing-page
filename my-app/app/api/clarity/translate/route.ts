import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://clarity.hearthsideworks.com"

    const response = await fetch(`${apiBaseUrl}/api/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Translation failed" }))
      return NextResponse.json(errorData, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Translation API error:", error)
    return NextResponse.json({ error: "Failed to connect to translation service" }, { status: 500 })
  }
}
