import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CommunicationQuiz } from "./communication-quiz"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function CommunicationQuizPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Link href="/account/dashboard">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Communication Style Quiz</h1>
        <p className="text-muted-foreground">
          Answer these questions to help Clarity Coach understand your communication preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Discover Your Style</CardTitle>
          <CardDescription>This quiz takes about 5 minutes and helps personalize your experience</CardDescription>
        </CardHeader>
        <CardContent>
          <CommunicationQuiz existingResults={profile?.communication_style as Record<string, unknown> | null} />
        </CardContent>
      </Card>
    </div>
  )
}
