import Link from "next/link"
import Image from "next/image"
import { Home, PenLine, Search, MessageCircle, Lightbulb, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function ClarityNav() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/apps/clarity" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/clarity-coach-logo-square.jpg"
              alt="Clarity Coach"
              width={40}
              height={40}
              className="rounded-md shadow-sm"
            />
            <div className="hidden sm:block">
              <h1 className="font-serif text-lg font-bold text-foreground">Clarity Coach</h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5">Beta 4.5</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {/* Main Features */}
            <Link
              href="/apps/clarity"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted transition-colors text-sm font-medium whitespace-nowrap"
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">Home</span>
            </Link>
            <Link
              href="/apps/clarity/draft"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted transition-colors text-sm font-medium whitespace-nowrap"
            >
              <PenLine className="w-4 h-4" />
              <span className="hidden md:inline">Draft</span>
            </Link>
            <Link
              href="/apps/clarity/analyze"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted transition-colors text-sm font-medium whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Analyze</span>
            </Link>
            <Link
              href="/apps/clarity/chat"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted transition-colors text-sm font-medium whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden md:inline">Chat</span>
            </Link>
            <Link
              href="/apps/clarity/politalk-explorer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted transition-colors text-sm font-medium whitespace-nowrap"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden md:inline">PoliTalk</span>
            </Link>

            {/* More Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  More
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/apps/clarity/about" className="cursor-pointer">
                    About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/apps/clarity/how-to-use" className="cursor-pointer">
                    How to Use
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/apps/clarity/roadmap" className="cursor-pointer">
                    Roadmap
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/apps/clarity/changelog" className="cursor-pointer">
                    Changelog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/apps/clarity/credits" className="cursor-pointer">
                    Credits
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/apps/clarity/terms" className="cursor-pointer">
                    Terms
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/apps/clarity/privacy" className="cursor-pointer">
                    Privacy
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
