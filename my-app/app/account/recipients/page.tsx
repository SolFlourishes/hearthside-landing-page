import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { RecipientList } from "./recipient-list"

export default async function RecipientsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: recipients } = await supabase
    .from("recipient_profiles")
    .select("*")
    .eq("user_id", user.id)
    .order("last_used_at", { ascending: false, nullsFirst: false })

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Recipient Profiles</h1>
          <p className="text-muted-foreground">Save communication profiles for people you interact with regularly</p>
        </div>
        <Button asChild>
          <Link href="/account/recipients/new">Add Recipient</Link>
        </Button>
      </div>

      {recipients && recipients.length > 0 ? (
        <RecipientList recipients={recipients} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Recipients Yet</CardTitle>
            <CardDescription>
              Create recipient profiles to save time when drafting or analyzing messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/account/recipients/new">Create Your First Recipient</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
