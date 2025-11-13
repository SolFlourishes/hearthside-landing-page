"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function NotificationScheduler() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    type: "newsletter",
    title: "",
    subject: "",
    content: "",
    scheduledFor: "",
    targetAudience: "all",
    status: "draft",
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (action: "draft" | "schedule" | "send") => {
    setSaving(true)
    setMessage("")

    try {
      const response = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status: action }),
      })

      if (response.ok) {
        setMessage(`Notification ${action}ed successfully`)
        router.refresh()
        // Reset form
        setFormData({
          type: "newsletter",
          title: "",
          subject: "",
          content: "",
          scheduledFor: "",
          targetAudience: "all",
          status: "draft",
        })
      } else {
        setMessage("Failed to save notification")
      }
    } catch (error) {
      console.error("[v0] Error saving notification:", error)
      setMessage("An error occurred")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="type">Notification Type</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newsletter">Community Newsletter</SelectItem>
            <SelectItem value="feature_update">Feature Update</SelectItem>
            <SelectItem value="tips">Communication Tips</SelectItem>
            <SelectItem value="community">Community Highlight</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">Choose the type that best reflects your message's purpose</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Internal Title</Label>
        <Input
          id="title"
          placeholder="e.g., 'March 2025 Newsletter'"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">For admin reference only</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Email Subject Line</Label>
        <Input
          id="subject"
          placeholder="e.g., 'New ways to deepen connection'"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">Keep it personal, clear, and connection-focused</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Message Content</Label>
        <Textarea
          id="content"
          rows={8}
          placeholder="Write a message that emphasizes connection, growth, and understanding..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">
          Will be formatted with Hearthside Works branding. Focus on the human message.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="scheduledFor">Send Date & Time (optional)</Label>
        <Input
          id="scheduledFor"
          type="datetime-local"
          value={formData.scheduledFor}
          onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">
          Leave empty to save as draft. Schedule for future or send immediately.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Target Audience</Label>
        <RadioGroup
          value={formData.targetAudience}
          onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="audience_all" />
            <Label htmlFor="audience_all" className="font-normal">
              All users
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="quiz_completed" id="audience_quiz" />
            <Label htmlFor="audience_quiz" className="font-normal">
              Users who completed the quiz
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="active_users" id="audience_active" />
            <Label htmlFor="audience_active" className="font-normal">
              Active Clarity Coach users
            </Label>
          </div>
        </RadioGroup>
      </div>

      {message && <p className={message.includes("success") ? "text-green-600" : "text-red-600"}>{message}</p>}

      <div className="flex gap-3 pt-4">
        <Button onClick={() => handleSubmit("draft")} variant="outline" disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Draft
        </Button>
        <Button
          onClick={() => handleSubmit("schedule")}
          variant="secondary"
          disabled={saving || !formData.scheduledFor}
        >
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Schedule
        </Button>
        <Button onClick={() => handleSubmit("send")} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Now
        </Button>
      </div>
    </div>
  )
}
