"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { HearthArch } from "./hearth-arch"
import { ThemeToggle } from "./theme-toggle"
import { UserMenu } from "./user-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [appsOpen, setAppsOpen] = useState(false)
  const [gamesOpen, setGamesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] dark:border-[#374151] bg-white/95 dark:bg-[#1F2937]/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-[#1F2937]/80">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Hearthside Works home">
            <div
              className="relative w-12 h-6 text-[#E28A6D] group-hover:text-[#d67a5d] transition-colors"
              aria-hidden="true"
            >
              <HearthArch className="w-full h-full" />
            </div>
            <span className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] group-hover:text-[#007B8C] dark:group-hover:text-[#4DB8C9] transition-colors">
              Hearthside Works
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors"
            >
              About Us
            </Link>

            {/* Apps Dropdown */}
            <div className="relative" onMouseEnter={() => setAppsOpen(true)} onMouseLeave={() => setAppsOpen(false)}>
              <button
                className="flex items-center gap-1 text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors"
                aria-expanded={appsOpen}
                aria-haspopup="true"
              >
                Apps
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
              {appsOpen && (
                <div className="absolute top-full left-0 pt-1" role="menu">
                  <div className="w-48 bg-white dark:bg-[#374151] rounded-lg shadow-lg border border-[#E5E7EB] dark:border-[#4B5563] py-2">
                    <Link
                      href="/apps/clarity"
                      className="block px-4 py-2 text-sm text-[#6B7280] dark:text-[#9CA3AF] hover:bg-[#F9FAFB] dark:hover:bg-[#4B5563] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors"
                      role="menuitem"
                    >
                      Clarity Coach
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Games Dropdown */}
            <div className="relative" onMouseEnter={() => setGamesOpen(true)} onMouseLeave={() => setGamesOpen(false)}>
              <button
                className="flex items-center gap-1 text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors"
                aria-expanded={gamesOpen}
                aria-haspopup="true"
              >
                Games
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
              {gamesOpen && (
                <div className="absolute top-full left-0 pt-1" role="menu">
                  <div className="w-48 bg-white dark:bg-[#374151] rounded-lg shadow-lg border border-[#E5E7EB] dark:border-[#4B5563] py-2">
                    <Link
                      href="/games/project-cohesion"
                      className="block px-4 py-2 text-sm text-[#6B7280] dark:text-[#9CA3AF] hover:bg-[#F9FAFB] dark:hover:bg-[#4B5563] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors"
                      role="menuitem"
                    >
                      Project Cohesion
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/stories"
              className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors"
            >
              Stories
            </Link>

            <Link
              href="/commitments"
              className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors"
            >
              Our Commitments
            </Link>

            <ThemeToggle />

            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E5E7EB] dark:border-[#374151]">
            <div className="flex flex-col gap-4">
              <Link
                href="/about"
                className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide px-2">
                  Apps
                </div>
                <Link
                  href="/apps/clarity"
                  className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors py-2 px-4 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clarity Coach
                </Link>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide px-2">
                  Games
                </div>
                <Link
                  href="/games/project-cohesion"
                  className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors py-2 px-4 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Project Cohesion
                </Link>
              </div>
              <Link
                href="/stories"
                className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Stories
              </Link>
              <Link
                href="/commitments"
                className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#007B8C] dark:hover:text-[#4DB8C9] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Commitments
              </Link>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">Theme</span>
                <ThemeToggle />
              </div>
              <Link
                href="/apps/clarity"
                className="bg-[#007B8C] hover:bg-[#006270] text-white rounded-lg px-4 py-2 text-sm font-medium text-center transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
              <UserMenu />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
