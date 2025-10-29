"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export function ClarityHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/apps/clarity" className="font-serif text-lg font-bold text-primary">
              Clarity Coach
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/apps/clarity/draft">
                <Button variant={isActive("/apps/clarity/draft") ? "default" : "ghost"} size="sm">
                  Draft Mode
                </Button>
              </Link>
              <Link href="/apps/clarity/analyze">
                <Button variant={isActive("/apps/clarity/analyze") ? "default" : "ghost"} size="sm">
                  Analyze
                </Button>
              </Link>
              <Link href="/apps/clarity/chat">
                <Button variant={isActive("/apps/clarity/chat") ? "default" : "ghost"} size="sm">
                  Chat
                </Button>
              </Link>
              <Link href="/apps/clarity/about">
                <Button variant={isActive("/apps/clarity/about") ? "default" : "ghost"} size="sm">
                  About
                </Button>
              </Link>
              <Link href="/apps/clarity/how-to-use">
                <Button variant={isActive("/apps/clarity/how-to-use") ? "default" : "ghost"} size="sm">
                  How to Use
                </Button>
              </Link>
              <Link href="/apps/clarity/roadmap">
                <Button variant={isActive("/apps/clarity/roadmap") ? "default" : "ghost"} size="sm">
                  Roadmap
                </Button>
              </Link>
              <Link href="/apps/clarity/changelog">
                <Button variant={isActive("/apps/clarity/changelog") ? "default" : "ghost"} size="sm">
                  Changelog
                </Button>
              </Link>
              <Link href="/apps/clarity/credits">
                <Button variant={isActive("/apps/clarity/credits") ? "default" : "ghost"} size="sm">
                  Credits
                </Button>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 border-t">
            <Link href="/apps/clarity/draft" className="block">
              <Button
                variant={isActive("/apps/clarity/draft") ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
              >
                Draft Mode
              </Button>
            </Link>
            <Link href="/apps/clarity/analyze" className="block">
              <Button
                variant={isActive("/apps/clarity/analyze") ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
              >
                Analyze
              </Button>
            </Link>
            <Link href="/apps/clarity/chat" className="block">
              <Button
                variant={isActive("/apps/clarity/chat") ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
              >
                Chat
              </Button>
            </Link>
            <div className="pt-2 border-t space-y-2">
              <Link href="/apps/clarity/about" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  About
                </Button>
              </Link>
              <Link href="/apps/clarity/how-to-use" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  How to Use
                </Button>
              </Link>
              <Link href="/apps/clarity/roadmap" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Roadmap
                </Button>
              </Link>
              <Link href="/apps/clarity/changelog" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Changelog
                </Button>
              </Link>
              <Link href="/apps/clarity/credits" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Credits
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
