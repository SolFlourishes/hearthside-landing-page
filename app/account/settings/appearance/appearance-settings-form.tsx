"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Palette, Type, Monitor, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const ACCENT_COLORS = [
  { name: "Orange", value: "orange", color: "bg-[#FF6B35]" },
  { name: "Blue", value: "blue", color: "bg-blue-500" },
  { name: "Green", value: "green", color: "bg-green-500" },
  { name: "Purple", value: "purple", color: "bg-purple-500" },
  { name: "Teal", value: "teal", color: "bg-teal-500" },
]

const FONT_SIZES = [
  { name: "Small", value: "small", class: "text-sm" },
  { name: "Medium", value: "medium", class: "text-base" },
  { name: "Large", value: "large", class: "text-lg" },
]

type ThemePreferences = {
  mode: "light" | "dark"
  accentColor: string
  fontSize: string
}

export function AppearanceSettingsForm({ initialPreferences }: { initialPreferences: ThemePreferences }) {
  const [preferences, setPreferences] = useState<ThemePreferences>(initialPreferences)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("Not authenticated")
      }

      const { error } = await supabase
        .from("user_profiles")
        .update({ theme_preferences: preferences })
        .eq("id", user.id)

      if (error) throw error

      // Apply font size to document
      document.documentElement.setAttribute("data-font-size", preferences.fontSize)

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      router.refresh()
    } catch (error) {
      console.error("Failed to save preferences:", error)
      alert("Failed to save appearance settings")
    } finally {
      setSaving(false)
    }
  }

  const handleThemeChange = (mode: "light" | "dark") => {
    setPreferences((prev) => ({ ...prev, mode }))
    if ((mode === "dark" && theme === "light") || (mode === "light" && theme === "dark")) {
      toggleTheme()
    }
  }

  return (
    <div className="space-y-6">
      {/* Theme Mode */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Monitor className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Theme Mode</h3>
            <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleThemeChange("light")}
            className={`p-4 rounded-lg border-2 transition-all ${
              preferences.mode === "light" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          >
            <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="font-medium">Light</div>
            <div className="text-xs text-muted-foreground">Bright and clear</div>
          </button>

          <button
            onClick={() => handleThemeChange("dark")}
            className={`p-4 rounded-lg border-2 transition-all ${
              preferences.mode === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          >
            <Moon className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <div className="font-medium">Dark</div>
            <div className="text-xs text-muted-foreground">Easy on the eyes</div>
          </button>
        </div>
      </Card>

      {/* Accent Color */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Accent Color</h3>
            <p className="text-sm text-muted-foreground">Personalize your experience with color</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {ACCENT_COLORS.map((accent) => (
            <button
              key={accent.value}
              onClick={() => setPreferences((prev) => ({ ...prev, accentColor: accent.value }))}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                preferences.accentColor === accent.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className={`h-10 w-10 rounded-full ${accent.color}`} />
              <span className="text-sm font-medium">{accent.name}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Font Size */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Type className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Font Size</h3>
            <p className="text-sm text-muted-foreground">Adjust text size for better readability</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {FONT_SIZES.map((size) => (
            <button
              key={size.value}
              onClick={() => setPreferences((prev) => ({ ...prev, fontSize: size.value }))}
              className={`p-4 rounded-lg border-2 transition-all ${
                preferences.fontSize === size.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className={`font-medium mb-1 ${size.class}`}>Aa</div>
              <div className="text-sm">{size.name}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Your preferences are saved to your account</p>
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? "Saving..." : saved ? "Saved!" : "Save Preferences"}
        </Button>
      </div>
    </div>
  )
}
