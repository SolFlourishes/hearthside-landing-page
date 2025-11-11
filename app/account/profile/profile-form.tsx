"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { Upload } from "lucide-react"

interface ProfileFormProps {
  profile: {
    display_name: string | null
    bio?: string | null
    avatar_url?: string | null
    neurotype?: string | null
    generation?: string | null
    preferences: Record<string, unknown>
  } | null
  user: User
}

export function ProfileForm({ profile, user }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(profile?.display_name || "")
  const [bio, setBio] = useState(profile?.bio || "")
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "")
  const [neurotype, setNeurotype] = useState(profile?.neurotype || "prefer_not_to_say")
  const [generation, setGeneration] = useState(profile?.generation || "prefer_not_to_say")
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

  const preferences = (profile?.preferences as Record<string, unknown>) || {}
  const [theme, setTheme] = useState((preferences.theme as string) || "system")
  const [emailNotifications, setEmailNotifications] = useState((preferences.email_notifications as boolean) ?? true)
  const [clarityAutoSave, setClarityAutoSave] = useState((preferences.clarity_auto_save as boolean) ?? true)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingAvatar(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload/avatar", {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to upload avatar")
      }

      const { url } = await response.json()
      setAvatarUrl(url)
    } catch (error) {
      console.error("[v0] Avatar upload error:", error)
      setError(error instanceof Error ? error.message : "Failed to upload avatar")
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          display_name: displayName,
          bio,
          avatar_url: avatarUrl || null,
          neurotype: neurotype || null,
          generation: generation || null,
          preferences: {
            theme,
            email_notifications: emailNotifications,
            clarity_auto_save: clarityAutoSave,
          },
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update profile")
      }

      setSuccess(true)
      router.refresh()
    } catch (error) {
      console.error("[v0] Profile update error:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={user.email} disabled />
        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="display-name">Display Name</Label>
        <Input
          id="display-name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="avatar">Profile Picture</Label>
        <div className="flex items-center gap-4">
          {avatarUrl && (
            <img
              src={avatarUrl || "/placeholder.svg"}
              alt="Avatar preview"
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div className="flex-1 space-y-2">
            <div className="flex gap-2">
              <Input
                id="avatar-url"
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("avatar-file")?.click()}
                disabled={isUploadingAvatar}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploadingAvatar ? "Uploading..." : "Upload"}
              </Button>
              <input id="avatar-file" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>
            <p className="text-xs text-muted-foreground">Enter a URL or upload an image</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Communication Context</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This information helps Clarity Coach provide more personalized guidance
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="neurotype">Neurotype</Label>
            <Select value={neurotype} onValueChange={setNeurotype}>
              <SelectTrigger id="neurotype">
                <SelectValue placeholder="Select your neurotype" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                <SelectItem value="neurotypical">Neurotypical</SelectItem>
                <SelectItem value="autistic">Autistic</SelectItem>
                <SelectItem value="adhd">ADHD</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Helps understand your communication style and preferences</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="generation">Generation</Label>
            <Select value={generation} onValueChange={setGeneration}>
              <SelectTrigger id="generation">
                <SelectValue placeholder="Select your generation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                <SelectItem value="silent">Silent Generation (1928-1945)</SelectItem>
                <SelectItem value="boomer">Baby Boomer (1946-1964)</SelectItem>
                <SelectItem value="genx">Generation X (1965-1980)</SelectItem>
                <SelectItem value="xennial">Xennial (1977-1983)</SelectItem>
                <SelectItem value="millennial">Millennial (1981-1996)</SelectItem>
                <SelectItem value="genz">Generation Z (1997-2012)</SelectItem>
                <SelectItem value="genalpha">Generation Alpha (2013+)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Helps understand generational communication differences</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Preferences</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-xs text-muted-foreground">Receive updates and announcements</p>
            </div>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="clarity-auto-save">Clarity Coach Auto-Save</Label>
              <p className="text-xs text-muted-foreground">Automatically save your work</p>
            </div>
            <Switch id="clarity-auto-save" checked={clarityAutoSave} onCheckedChange={setClarityAutoSave} />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      {success && (
        <p className="text-sm text-green-600" role="status">
          Profile updated successfully!
        </p>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
