"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrashIcon, FileTextIcon, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { exportConversation } from "@/lib/export-utils"
import { ExportMenu } from "@/components/export-menu"

interface Conversation {
  id: string
  title: string
  messages: unknown[]
  is_draft: boolean
  created_at: string
  updated_at: string
  mode?: string
  is_favorited?: boolean
}

interface ConversationsListProps {
  conversations: Conversation[]
  isDraft: boolean
}

export function ConversationsList({ conversations, isDraft }: ConversationsListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [localConversations, setLocalConversations] = useState(conversations)

  const toggleFavorite = async (id: string, currentState: boolean) => {
    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_favorited: !currentState }),
      })

      if (!response.ok) throw new Error("Failed to toggle favorite")

      setLocalConversations(
        localConversations.map((conv) => (conv.id === id ? { ...conv, is_favorited: !currentState } : conv)),
      )
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this conversation?")) {
      return
    }

    setDeletingId(id)
    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete conversation")
      }

      router.refresh()
    } catch (error) {
      console.error("Error deleting conversation:", error)
      alert("Failed to delete conversation")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-3">
      {localConversations.map((conversation) => {
        const messageCount = Array.isArray(conversation.messages) ? conversation.messages.length : 0
        const conversationLink = conversation.mode
          ? `/apps/clarity/${conversation.mode}?conversation=${conversation.id}`
          : `/apps/clarity?conversation=${conversation.id}`

        return (
          <div
            key={conversation.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Link href={conversationLink} className="font-medium hover:underline truncate">
                  {conversation.title || `${conversation.mode || "Chat"} conversation`}
                </Link>
                {isDraft && <Badge variant="secondary">Draft</Badge>}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileTextIcon className="h-3 w-3" />
                  {messageCount} messages
                </span>
                <span>{new Date(conversation.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(conversation.id, conversation.is_favorited || false)}
                className="px-2"
              >
                <Star
                  className={`h-4 w-4 ${conversation.is_favorited ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                />
              </Button>
              <ExportMenu
                onExport={(format) => exportConversation(conversation, { format })}
                label=""
                variant="ghost"
                size="sm"
              />
              <Button asChild variant="outline" size="sm">
                <Link href={conversationLink}>{isDraft ? "Resume" : "View"}</Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(conversation.id)}
                disabled={deletingId === conversation.id}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
