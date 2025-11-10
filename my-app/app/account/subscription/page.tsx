import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckIcon } from "lucide-react"
import Link from "next/link"

export default async function SubscriptionPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirectTo=/account/subscription")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  const currentTier = profile?.subscription_tier || "free"

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Subscription</h1>
          <p className="text-muted-foreground mt-2">Manage your subscription and billing</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold capitalize">{currentTier}</h3>
                  <Badge variant={currentTier === "premium" ? "default" : "secondary"}>Active</Badge>
                </div>
                {currentTier === "premium" && profile?.subscription_end_date && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Renews on {new Date(profile.subscription_end_date).toLocaleDateString()}
                  </p>
                )}
              </div>
              {currentTier === "free" && <Button size="lg">Upgrade to Premium</Button>}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className={currentTier === "free" ? "border-2" : ""}>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>Access to Clarity Coach</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>20 AI requests per hour</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>Basic conversation history</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>Community support</span>
                </li>
              </ul>
              {currentTier === "free" && (
                <Badge variant="secondary" className="w-full justify-center py-2">
                  Current Plan
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card className={currentTier === "premium" ? "border-2 border-primary" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Premium
                <Badge>Popular</Badge>
              </CardTitle>
              <CardDescription>For power users and professionals</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Everything in Free, plus:</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>Unlimited AI requests</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>Advanced conversation history</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>Early access to new features</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <span>Export conversations</span>
                </li>
              </ul>
              {currentTier === "premium" ? (
                <Badge variant="default" className="w-full justify-center py-2">
                  Current Plan
                </Badge>
              ) : (
                <Button className="w-full" size="lg" asChild>
                  <Link href="/account/subscription/checkout">Upgrade to Premium</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {currentTier === "premium" && (
          <Card>
            <CardHeader>
              <CardTitle>Manage Subscription</CardTitle>
              <CardDescription>Update your billing and subscription settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Billing Information</p>
                  <p className="text-sm text-muted-foreground">Update payment method</p>
                </div>
                <Button variant="outline">Manage Billing</Button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Cancel Subscription</p>
                  <p className="text-sm text-muted-foreground">Downgrade to free tier</p>
                </div>
                <Button variant="outline">Cancel Plan</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
