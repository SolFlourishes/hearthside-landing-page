import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export default async function HistoryPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: history } = await supabase
    .from("communication_history")
    .select(`
      *,
      recipient_profiles (
        name
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Communication History</h1>
        <p className="text-muted-foreground">Your past interactions with Clarity Coach</p>
      </div>

      {history && history.length > 0 ? (
        <div className="space-y-4">
          {history.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {item.interaction_type === "draft"
                        ? "Draft"
                        : item.interaction_type === "analyze"
                          ? "Analyze"
                          : "Chat"}
                    </CardTitle>
                    <CardDescription>
                      {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                      {item.recipient_profiles && (
                        <Badge variant="secondary" className="ml-2">
                          {item.recipient_profiles.name}
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                  {item.rating && <Badge>{"⭐".repeat(item.rating)}</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Original:</p>
                    <p className="text-sm line-clamp-3">{item.original_text}</p>
                  </div>
                  {item.result_text && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Result:</p>
                      <p className="text-sm line-clamp-3">{item.result_text}</p>
                    </div>
                  )}
                  {item.user_feedback && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Your Feedback:</p>
                      <p className="text-sm italic">{item.user_feedback}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No History Yet</CardTitle>
            <CardDescription>
              Your communication history will appear here after you use Draft, Analyze, or Chat
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
