"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface NotificationPreferences {
  email_enabled: boolean
  saved_items: "instant" | "daily" | "never"
  quiz_reminders: boolean
  communication_tips: "weekly" | "monthly" | "never"
  feature_updates: boolean
  connection_reminders: boolean
  digest_frequency: "weekly" | "monthly" | "never"
}

interface NotificationPreferencesFormProps {
  initialPreferences: NotificationPreferences
}

export function NotificationPreferencesForm({ initialPreferences }: NotificationPreferencesFormProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>(initialPreferences)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSave = async () => {
    setSaving(true)
    setMessage("")

    try {
      const response = await fetch("/api/user/notification-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences }),
      })

      if (response.ok) {
        setMessage("Preferences saved successfully")
        router.refresh()
      } else {
        setMessage("Failed to save preferences")
      }
    } catch (error) {
      console.error("[v0] Error saving preferences:", error)
      setMessage("An error occurred")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Master switch */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="space-y-1">
          <Label htmlFor="email_enabled" className="text-base font-medium">
            Email Notifications
          </Label>
          <p className="text-sm text-muted-foreground">Receive updates and support via email</p>
        </div>
        <Switch
          id="email_enabled"
          checked={preferences.email_enabled}
          onCheckedChange={(checked) => setPreferences({ ...preferences, email_enabled: checked })}
        />
      </div>

      <div className={preferences.email_enabled ? "" : "opacity-50 pointer-events-none"}>
        {/* Communication Activity */}
        <div className="space-y-4 pb-6 border-b">
          <h3 className="font-medium">Your Communication Activity</h3>

          <div className="space-y-2">
            <Label>Saved Conversations & Translations</Label>
            <p className="text-sm text-muted-foreground mb-2">Get confirmations when you save meaningful exchanges</p>
            <RadioGroup
              value={preferences.saved_items}
              onValueChange={(value) => setPreferences({ ...preferences, saved_items: value as any })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="instant" id="saved_instant" />
                <Label htmlFor="saved_instant" className="font-normal">
                  Instant confirmation
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="saved_daily" />
                <Label htmlFor="saved_daily" className="font-normal">
                  Daily digest
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="saved_never" />
                <Label htmlFor="saved_never" className="font-normal">
                  Don't notify
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Personal Growth */}
        <div className="space-y-4 py-6 border-b">
          <h3 className="font-medium">Growth & Learning</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="quiz_reminders">Communication Quiz Reminders</Label>
              <p className="text-sm text-muted-foreground">Gentle reminders to refresh your profile as you grow</p>
            </div>
            <Switch
              id="quiz_reminders"
              checked={preferences.quiz_reminders}
              onCheckedChange={(checked) => setPreferences({ ...preferences, quiz_reminders: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label>Communication Insights</Label>
            <p className="text-sm text-muted-foreground mb-2">Reflections tailored to your communication style</p>
            <RadioGroup
              value={preferences.communication_tips}
              onValueChange={(value) => setPreferences({ ...preferences, communication_tips: value as any })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="tips_weekly" />
                <Label htmlFor="tips_weekly" className="font-normal">
                  Weekly
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="tips_monthly" />
                <Label htmlFor="tips_monthly" className="font-normal">
                  Monthly
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="tips_never" />
                <Label htmlFor="tips_never" className="font-normal">
                  Not right now
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Connection */}
        <div className="space-y-4 py-6 border-b">
          <h3 className="font-medium">Building Bridges</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="connection_reminders">Connection Reminders</Label>
              <p className="text-sm text-muted-foreground">Gentle prompts to nurture relationships</p>
            </div>
            <Switch
              id="connection_reminders"
              checked={preferences.connection_reminders}
              onCheckedChange={(checked) => setPreferences({ ...preferences, connection_reminders: checked })}
            />
          </div>
        </div>

        {/* Platform Updates */}
        <div className="space-y-4 py-6 border-b">
          <h3 className="font-medium">Platform Updates</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="feature_updates">New Features</Label>
              <p className="text-sm text-muted-foreground">Learn about new ways to deepen connection</p>
            </div>
            <Switch
              id="feature_updates"
              checked={preferences.feature_updates}
              onCheckedChange={(checked) => setPreferences({ ...preferences, feature_updates: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label>Hearthside Works Updates</Label>
            <p className="text-sm text-muted-foreground mb-2">Stories, insights, and community highlights</p>
            <RadioGroup
              value={preferences.digest_frequency}
              onValueChange={(value) => setPreferences({ ...preferences, digest_frequency: value as any })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="digest_weekly" />
                <Label htmlFor="digest_weekly" className="font-normal">
                  Weekly
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="digest_monthly" />
                <Label htmlFor="digest_monthly" className="font-normal">
                  Monthly
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="digest_never" />
                <Label htmlFor="digest_never" className="font-normal">
                  Not for me
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        {message && <p className={message.includes("success") ? "text-green-600" : "text-red-600"}>{message}</p>}
        <Button onClick={handleSave} disabled={saving} className="ml-auto">
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Preferences
        </Button>
      </div>
    </div>
  )
}
