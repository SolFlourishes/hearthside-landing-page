"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrashIcon, FileTextIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Conversation {
  id: string
  title: string
  messages: unknown[]
  is_draft: boolean
  created_at: string
  updated_at: string
}

interface ConversationsListProps {
  conversations: Conversation[]
  isDraft: boolean
}

export function ConversationsList({ conversations, isDraft }: ConversationsListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

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
      {conversations.map((conversation) => {
        const messageCount = Array.isArray(conversation.messages) ? conversation.messages.length : 0

        return (
          <div
            key={conversation.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Link
                  href={`/apps/clarity?conversation=${conversation.id}`}
                  className="font-medium hover:underline truncate"
                >
                  {conversation.title}
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
              <Button asChild variant="outline" size="sm">
                <Link href={`/apps/clarity?conversation=${conversation.id}`}>{isDraft ? "Resume" : "View"}</Link>
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
