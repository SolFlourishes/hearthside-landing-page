"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, X } from "lucide-react"
import Link from "next/link"

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("clarity-consent")
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(
      "clarity-consent",
      JSON.stringify({
        analytics: true,
        functional: true,
        timestamp: new Date().toISOString(),
      }),
    )
    setIsVisible(false)
  }

  const handleEssentialOnly = () => {
    localStorage.setItem(
      "clarity-consent",
      JSON.stringify({
        analytics: false,
        functional: true,
        timestamp: new Date().toISOString(),
      }),
    )
    setIsVisible(false)
  }

  if (!isVisible) return null

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 bg-[#007B8C] hover:bg-[#006270] text-white rounded-full p-3 shadow-lg z-50 transition-all hover:scale-105"
        aria-label="Open privacy settings"
      >
        <Shield className="w-5 h-5" />
      </button>
    )
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md p-6 shadow-2xl z-50 bg-background border-2 border-[#007B8C]/20">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#007B8C]" />
          <h3 className="font-serif text-lg font-bold">Your Privacy Matters</h3>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Minimize"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        We use essential cookies for the service to work and anonymous analytics to improve your experience. No personal
        data is collected in anonymous mode.
      </p>

      <div className="bg-muted/50 rounded-lg p-3 mb-4 text-xs space-y-1">
        <div className="flex items-start gap-2">
          <span className="text-green-600 font-semibold">✓</span>
          <span>Essential cookies (required for functionality)</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-blue-600 font-semibold">⚙</span>
          <span>Anonymous usage analytics (helps us improve)</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-gray-500 font-semibold">✗</span>
          <span>No tracking, no ads, no selling your data</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={handleAccept} className="w-full bg-[#007B8C] hover:bg-[#006270] text-white">
          Accept All
        </Button>
        <Button onClick={handleEssentialOnly} variant="outline" className="w-full bg-transparent">
          Essential Only
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        Read our{" "}
        <Link href="/apps/clarity/privacy" className="text-[#007B8C] hover:underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/apps/clarity/terms" className="text-[#007B8C] hover:underline">
          Terms of Service
        </Link>
      </p>
    </Card>
  )
}
