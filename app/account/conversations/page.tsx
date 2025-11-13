import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ConversationsList } from "@/components/conversations-list"
import { TranslationsList } from "@/components/translations-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BatchExportActions } from "@/components/batch-export-actions"

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

  const { data: translations } = await supabase
    .from("clarity_translations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Clarity Coach History</h1>
            <p className="text-muted-foreground mt-2">View and manage your saved conversations and translations</p>
          </div>
          <Button asChild>
            <Link href="/apps/clarity">New Conversation</Link>
          </Button>
        </div>

        <Tabs defaultValue="conversations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="conversations">
              Conversations {conversations && `(${conversations.length})`}
            </TabsTrigger>
            <TabsTrigger value="translations">Translations {translations && `(${translations.length})`}</TabsTrigger>
            <TabsTrigger value="drafts">Drafts {drafts && `(${drafts.length})`}</TabsTrigger>
          </TabsList>

          <TabsContent value="conversations" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Saved Conversations</CardTitle>
                    <CardDescription>Your chat history with Clarity Coach</CardDescription>
                  </div>
                  {conversations && conversations.length > 0 && (
                    <BatchExportActions data={conversations} type="conversations" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {conversations && conversations.length > 0 ? (
                  <ConversationsList conversations={conversations} isDraft={false} />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No conversations yet</p>
                    <Button asChild>
                      <Link href="/apps/clarity/chat">Start Your First Conversation</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="translations" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Saved Translations</CardTitle>
                    <CardDescription>Your draft and analyze message translations</CardDescription>
                  </div>
                  {translations && translations.length > 0 && (
                    <BatchExportActions data={translations} type="translations" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {translations && translations.length > 0 ? (
                  <TranslationsList translations={translations} />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No translations yet</p>
                    <Button asChild>
                      <Link href="/apps/clarity/draft">Create Your First Translation</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drafts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Drafts</CardTitle>
                <CardDescription>Resume your unfinished conversations</CardDescription>
              </CardHeader>
              <CardContent>
                {drafts && drafts.length > 0 ? (
                  <ConversationsList conversations={drafts} isDraft={true} />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No drafts saved</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
