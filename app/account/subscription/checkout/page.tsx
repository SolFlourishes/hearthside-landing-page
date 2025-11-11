import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"
import Link from "next/link"

export default async function CheckoutPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirectTo=/account/subscription/checkout")
  }

  const { data: profile } = await supabase.from("user_profiles").select("subscription_tier").eq("id", user.id).single()

  if (profile?.subscription_tier === "premium") {
    redirect("/account/subscription")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Upgrade to Premium</h1>
          <p className="text-muted-foreground mt-2">Unlock unlimited access to all features</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Premium Plan</CardTitle>
            <CardDescription>Everything you need for professional communication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-6 border-y">
              <span className="text-5xl font-bold">$29</span>
              <span className="text-xl text-muted-foreground">/month</span>
              <p className="text-sm text-muted-foreground mt-2">Cancel anytime, no questions asked</p>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Unlimited AI requests</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Advanced conversation history and search</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Priority support with faster response times</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Early access to new features and updates</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Export and download your conversations</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Custom AI settings and preferences</span>
              </li>
            </ul>

            <div className="pt-6 space-y-3">
              <p className="text-center text-sm text-muted-foreground mb-4">
                Payment processing powered by Stripe (Coming Soon)
              </p>
              <Button className="w-full" size="lg" disabled>
                Subscribe Now (Coming Soon)
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/account/subscription">Back to Plans</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Can I cancel anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your
                billing period.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">What payment methods do you accept?</h4>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards through Stripe's secure payment processing.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Is there a free trial?</h4>
              <p className="text-sm text-muted-foreground">
                The free tier is always available with generous limits. Upgrade anytime to unlock premium features.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
