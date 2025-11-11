"use client"

import { useEffect, useState } from "react"
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
import Link from "next/link"
import { User, LogOut, Settings, CreditCard, MessageSquare } from "lucide-react"

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
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          const authUser = session.user

          const { data: profile, error: profileError } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", authUser.id)
            .single()

          // If profile doesn't exist, we still show the user menu with basic info
          if (profileError && profileError.code !== "PGRST116") {
            console.error("[v0] Error loading profile:", profileError)
          }

          setUser({
            id: authUser.id,
            display_name:
              profile?.display_name || authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "User",
            avatar_url: profile?.avatar_url,
            subscription_tier: profile?.subscription_tier || "free",
            email: authUser.email,
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("[v0] Error loading user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") {
        loadUser()
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  const handleLogout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
      </div>
    )
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
        <DropdownMenuItem onClick={() => router.push("/account/dashboard")} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/account/profile")} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/account/settings")} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/account/conversations")} className="cursor-pointer">
          <MessageSquare className="mr-2 h-4 w-4" />
          <span>Conversations</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/account/subscription")} className="cursor-pointer">
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Subscription</span>
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
