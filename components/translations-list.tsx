"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

interface Translation {
  id: string
  mode: string
  original_message: string
  translation: string
  explanation?: string
  communication_mode: string
  created_at: string
  sender_context?: any
  receiver_context?: any
}

interface TranslationsListProps {
  translations: Translation[]
}

export function TranslationsList({ translations }: TranslationsListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this translation?")) return

    setDeletingId(id)
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { error } = await supabase.from("clarity_translations").delete().eq("id", id)

      if (error) throw error

      // Refresh the page to show updated list
      window.location.reload()
    } catch (err) {
      console.error("Error deleting translation:", err)
      alert("Failed to delete translation")
    } finally {
      setDeletingId(null)
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-3">
      {translations.map((trans) => {
        const isExpanded = expandedId === trans.id
        const preview = trans.original_message.substring(0, 100) + (trans.original_message.length > 100 ? "..." : "")

        return (
          <Card key={trans.id} className="p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <Badge variant="secondary" className="text-xs">
                    {trans.mode}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {trans.communication_mode}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{isExpanded ? trans.original_message : preview}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{formatDistanceToNow(new Date(trans.created_at), { addSuffix: true })}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => toggleExpand(trans.id)}>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(trans.id)}
                  disabled={deletingId === trans.id}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-4 pt-4 border-t space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Translation:</h4>
                  <div className="text-sm bg-muted/50 p-3 rounded-md">{trans.translation}</div>
                </div>
                {trans.explanation && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Explanation:</h4>
                    <div
                      className="text-sm bg-muted/50 p-3 rounded-md prose prose-sm dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: trans.explanation }}
                    />
                  </div>
                )}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
