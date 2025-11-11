import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; error_description?: string; error_code?: string }>
}) {
  const params = await searchParams

  const getErrorMessage = () => {
    if (params.error_code === "otp_expired") {
      return "Your confirmation link has expired. Please request a new one by signing up again."
    }
    if (params.error === "access_denied") {
      return "Access was denied. This may be because the link expired or was already used."
    }
    if (params.error_description) {
      return decodeURIComponent(params.error_description)
    }
    if (params.error) {
      return `Error: ${params.error}`
    }
    return "An authentication error occurred. Please try again."
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{getErrorMessage()}</p>
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href="/auth/login">Return to Sign In</Link>
              </Button>
              {params.error_code === "otp_expired" && (
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/auth/sign-up">Sign Up Again</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
