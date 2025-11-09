import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecipientForm } from "../recipient-form"

export default async function NewRecipientPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">New Recipient Profile</h1>
        <p className="text-muted-foreground">Create a profile for someone you communicate with regularly</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recipient Information</CardTitle>
          <CardDescription>The more details you provide, the better Clarity Coach can help</CardDescription>
        </CardHeader>
        <CardContent>
          <RecipientForm />
        </CardContent>
      </Card>
    </div>
  )
}
