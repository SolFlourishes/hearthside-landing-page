"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, TrendingUp, ChevronDown } from "lucide-react"
import { LeaderLogo } from "@/components/leader-logo"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function LeaderNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/apps/leader" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <LeaderLogo size={40} />
            <div className="hidden sm:block">
              <h1 className="font-serif text-lg font-bold text-foreground">Leadership Leader</h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5">Alpha 0.1</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link
              href="/apps/leader"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted transition-colors text-sm font-medium whitespace-nowrap"
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">Home</span>
            </Link>
            <Link
              href="/apps/leader/scenarios"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted transition-colors text-sm font-medium whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden md:inline">Scenarios</span>
            </Link>
            <Link
              href="/apps/leader/growth"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted transition-colors text-sm font-medium whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden md:inline">Growth</span>
            </Link>

            {/* More menu like Clarity Coach */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  More
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/apps/leader/about" className="cursor-pointer">
                    About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/apps/leader/roadmap" className="cursor-pointer">
                    Roadmap
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/apps/leader/settings" className="cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
