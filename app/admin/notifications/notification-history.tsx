"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, Send, Trash2 } from "lucide-react"

interface Notification {
  id: string
  type: string
  title: string
  subject: string
  status: string
  scheduled_for: string | null
  sent_at: string | null
  recipient_count: number
  sent_count: number
  created_at: string
}

interface NotificationHistoryProps {
  notifications: Notification[]
}

export function NotificationHistory({ notifications }: NotificationHistoryProps) {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No notifications yet. Create your first connection-focused message above.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">{notification.title}</h3>
              <Badge variant={notification.status === "sent" ? "default" : "secondary"}>{notification.status}</Badge>
              <Badge variant="outline">{notification.type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{notification.subject}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {notification.sent_at
                  ? `Sent ${new Date(notification.sent_at).toLocaleDateString()}`
                  : notification.scheduled_for
                    ? `Scheduled for ${new Date(notification.scheduled_for).toLocaleDateString()}`
                    : `Created ${new Date(notification.created_at).toLocaleDateString()}`}
              </span>
              {notification.status === "sent" && (
                <span className="flex items-center gap-1">
                  <Send className="h-3 w-3" />
                  {notification.sent_count} / {notification.recipient_count} sent
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            {notification.status === "draft" && (
              <Button variant="ghost" size="sm" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
