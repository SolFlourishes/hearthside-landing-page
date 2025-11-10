"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { User, LogOut, Settings, CreditCard, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useSupabase } from "@/components/supabase-provider"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: string
  display_name: string
  avatar_url?: string
  subscription_tier?: string
  email?: string
}

export function UserMenu() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = useSupabase()
  const router = useRouter()

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const loadUser = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (authUser) {
          const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", authUser.id).single()

          if (profile) {
            setUser({
              id: profile.id,
              display_name: profile.display_name || authUser.email?.split("@")[0] || "User",
              avatar_url: profile.avatar_url,
              subscription_tier: profile.subscription_tier,
              email: authUser.email,
            })
          } else {
            // If no profile exists, use auth user data
            setUser({
              id: authUser.id,
              display_name: authUser.email?.split("@")[0] || "User",
              email: authUser.email,
              subscription_tier: "free",
            })
          }
        }
      } catch (error) {
        console.error("[v0] Error loading user:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [supabase])

  const handleLogout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return null
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/auth/login">Log In</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/auth/sign-up">Sign Up</Link>
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.display_name} />
            <AvatarFallback>{user.display_name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">{user.display_name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            <Badge variant={user.subscription_tier === "premium" ? "default" : "secondary"} className="w-fit">
              {user.subscription_tier === "premium" ? "Premium" : "Free"}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account/dashboard" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/conversations" className="cursor-pointer">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Conversations</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/subscription" className="cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Subscription</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
