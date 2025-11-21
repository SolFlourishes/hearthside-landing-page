import type React from "react"
import type { Metadata } from "next"
import { LeaderNav } from "@/components/leader-nav"
import { AlphaBanner } from "@/components/alpha-banner"

export const metadata: Metadata = {
  title: "Leadership Leader - Alpha 0.1 | Hearthside Works",
  description:
    "Practice difficult leadership conversations with AI-powered simulations. Track your growth, get 360 feedback, and become the leader your team needs.",
}

export default function LeaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <AlphaBanner />
      <LeaderNav />
      {children}
    </div>
  )
}
