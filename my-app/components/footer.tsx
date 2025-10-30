"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribeStatus("loading")

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://clarity.hearthsideworks.com"
      const response = await fetch(`${apiBaseUrl}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Failed to subscribe")
      }

      setSubscribeStatus("success")
      setEmail("")
      setTimeout(() => setSubscribeStatus("idle"), 3000)
    } catch (error) {
      console.error("Subscription error:", error)
      setSubscribeStatus("error")
      setTimeout(() => setSubscribeStatus("idle"), 3000)
    }
  }

  const footerLinks = {
    Divisions: [
      { name: "Hearthside Games", href: "/games" },
      { name: "Hearthside Stories", href: "/stories" },
      { name: "Hearthside Care", href: "/care" },
      { name: "Hearthside Cultivates", href: "/cultivates" },
    ],
    Products: [
      { name: "Clarity Coach", href: "/apps/clarity" },
      { name: "Project Cohesion", href: "/games/project-cohesion" },
      { name: "Elder Program", href: "/elder-program" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Our Commitments", href: "/commitments" },
      { name: "Hearthside Foundation", href: "/foundation" },
      { name: "Contact", href: "/contact" },
    ],
    Resources: [
      { name: "Support", href: "/contact" },
      { name: "Community", href: "/care" },
    ],
  }

  return (
    <footer className="bg-[#1F2937] dark:bg-[#111827] text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 pb-6 border-b border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-xl font-bold mb-2">Stay Connected</h3>
            <p className="text-white/70 mb-4 text-sm">
              Get updates on new tools, resources, and insights for meaningful connection.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                disabled={subscribeStatus === "loading"}
                className="bg-[#FFC72C] hover:bg-[#e6b328] text-[#1F2937] font-semibold"
              >
                {subscribeStatus === "loading" ? "..." : subscribeStatus === "success" ? "✓" : "Subscribe"}
              </Button>
            </form>
            {subscribeStatus === "success" && <p className="text-[#FFC72C] text-sm mt-2">Thank you for subscribing!</p>}
            {subscribeStatus === "error" && (
              <p className="text-red-400 text-sm mt-2">Failed to subscribe. Please try again.</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-xl font-bold mb-3">Hearthside Works</h3>
            <p className="text-white/70 leading-relaxed mb-4 text-sm">
              Creating communities of belonging where everyone can flourish through meaningful connection.
            </p>
            <p className="font-serif text-[#FFC72C] italic text-sm">Hear Me, See Me, Know Me.</p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-3 text-sm">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/70 hover:text-[#FFC72C] transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Hearthside Works, LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/commitments" className="text-white/60 hover:text-[#FFC72C] transition-colors text-sm">
              Privacy & Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
