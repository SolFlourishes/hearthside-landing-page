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

  const isSubdomain = typeof window !== "undefined" && window.location.hostname.startsWith("clarity.")
  const basePath = isSubdomain ? "" : "/apps/clarity"

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-16 z-40 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-8 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`${basePath}`} className="flex items-center gap-1.5">
              <span className="font-serif text-xs font-bold text-primary">Clarity Coach</span>
              <span className="text-[9px] text-muted-foreground font-mono">Beta 3.1</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-0.5">
              <Link href={`${basePath}/draft`}>
                <Button
                  variant={isActive(`${basePath}/draft`) ? "default" : "ghost"}
                  size="sm"
                  className="h-6 px-2 text-[11px]"
                >
                  Draft Mode
                </Button>
              </Link>
              <Link href={`${basePath}/analyze`}>
                <Button
                  variant={isActive(`${basePath}/analyze`) ? "default" : "ghost"}
                  size="sm"
                  className="h-6 px-2 text-[11px]"
                >
                  Analyze
                </Button>
              </Link>
              <Link href={`${basePath}/chat`}>
                <Button
                  variant={isActive(`${basePath}/chat`) ? "default" : "ghost"}
                  size="sm"
                  className="h-6 px-2 text-[11px]"
                >
                  Chat
                </Button>
              </Link>
              <Link href={`${basePath}/about`}>
                <Button
                  variant={isActive(`${basePath}/about`) ? "default" : "ghost"}
                  size="sm"
                  className="h-6 px-2 text-[11px]"
                >
                  About
                </Button>
              </Link>
              <Link href={`${basePath}/how-to-use`}>
                <Button
                  variant={isActive(`${basePath}/how-to-use`) ? "default" : "ghost"}
                  size="sm"
                  className="h-6 px-2 text-[11px]"
                >
                  How to Use
                </Button>
              </Link>
              <Link href={`${basePath}/roadmap`}>
                <Button
                  variant={isActive(`${basePath}/roadmap`) ? "default" : "ghost"}
                  size="sm"
                  className="h-6 px-2 text-[11px]"
                >
                  Roadmap
                </Button>
              </Link>
              <Link href={`${basePath}/changelog`}>
                <Button
                  variant={isActive(`${basePath}/changelog`) ? "default" : "ghost"}
                  size="sm"
                  className="h-6 px-2 text-[11px]"
                >
                  Changelog
                </Button>
              </Link>
              <Link href={`${basePath}/credits`}>
                <Button
                  variant={isActive(`${basePath}/credits`) ? "default" : "ghost"}
                  size="sm"
                  className="h-6 px-2 text-[11px]"
                >
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
              className="md:hidden h-6 w-6 p-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-3 w-3" /> : <Menu className="h-3 w-3" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-2 space-y-1 border-t">
            <Link href={`${basePath}/draft`} className="block">
              <Button
                variant={isActive(`${basePath}/draft`) ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
              >
                Draft Mode
              </Button>
            </Link>
            <Link href={`${basePath}/analyze`} className="block">
              <Button
                variant={isActive(`${basePath}/analyze`) ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
              >
                Analyze
              </Button>
            </Link>
            <Link href={`${basePath}/chat`} className="block">
              <Button
                variant={isActive(`${basePath}/chat`) ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
              >
                Chat
              </Button>
            </Link>
            <div className="pt-2 border-t space-y-2">
              <Link href={`${basePath}/about`} className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  About
                </Button>
              </Link>
              <Link href={`${basePath}/how-to-use`} className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  How to Use
                </Button>
              </Link>
              <Link href={`${basePath}/roadmap`} className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Roadmap
                </Button>
              </Link>
              <Link href={`${basePath}/changelog`} className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Changelog
                </Button>
              </Link>
              <Link href={`${basePath}/credits`} className="block">
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
