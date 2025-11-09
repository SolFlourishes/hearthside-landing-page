"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { User, LogOut, Settings, History, BarChart3, Users } from "lucide-react"
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

interface UserProfile {
  id: string
  display_name: string
  avatar_url?: string
  role: string
  tier: string
  email?: string
}

export function UserMenu() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = useSupabase()

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
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

          if (profile) {
            setUser({
              id: profile.id,
              display_name: profile.display_name,
              avatar_url: profile.avatar_url,
              role: profile.role,
              tier: profile.tier,
              email: authUser.email,
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
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/"
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "moderator":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "author":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "elder":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
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
            <div className="flex gap-1">
              <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                {user.role}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {user.tier}
              </Badge>
            </div>
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
            <Settings className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/recipients" className="cursor-pointer">
            <Users className="mr-2 h-4 w-4" />
            <span>My Recipients</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/history" className="cursor-pointer">
            <History className="mr-2 h-4 w-4" />
            <span>History</span>
          </Link>
        </DropdownMenuItem>
        {user.tier === "premium" && (
          <DropdownMenuItem asChild>
            <Link href="/account/analytics" className="cursor-pointer">
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
