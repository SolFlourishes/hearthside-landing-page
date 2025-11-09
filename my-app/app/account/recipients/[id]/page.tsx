import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecipientForm } from "../recipient-form"

export default async function EditRecipientPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: recipient } = await supabase
    .from("recipient_profiles")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (!recipient) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Edit Recipient Profile</h1>
        <p className="text-muted-foreground">Update {recipient.name}'s communication preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recipient Information</CardTitle>
          <CardDescription>Keep this profile up to date for the best results</CardDescription>
        </CardHeader>
        <CardContent>
          <RecipientForm recipient={recipient} />
        </CardContent>
      </Card>
    </div>
  )
}
