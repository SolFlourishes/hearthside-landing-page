import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ConversationsList } from "@/components/conversations-list"

export default async function ConversationsPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirectTo=/account/conversations")
  }

  const { data: conversations } = await supabase
    .from("clarity_conversations")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_draft", false)
    .order("updated_at", { ascending: false })

  const { data: drafts } = await supabase
    .from("clarity_conversations")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_draft", true)
    .order("updated_at", { ascending: false })

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Conversation History</h1>
            <p className="text-muted-foreground mt-2">View and manage your Clarity Coach conversations</p>
          </div>
          <Button asChild>
            <Link href="/apps/clarity">New Conversation</Link>
          </Button>
        </div>

        {drafts && drafts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Saved Drafts</CardTitle>
              <CardDescription>Resume your unfinished conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <ConversationsList conversations={drafts} isDraft={true} />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Past Conversations</CardTitle>
            <CardDescription>Your conversation history with Clarity Coach</CardDescription>
          </CardHeader>
          <CardContent>
            {conversations && conversations.length > 0 ? (
              <ConversationsList conversations={conversations} isDraft={false} />
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No conversations yet</p>
                <Button asChild>
                  <Link href="/apps/clarity">Start Your First Conversation</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
