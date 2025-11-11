"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, Shield, Users, Baby } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export type AccessTier = "anonymous" | "authenticated" | "supervised"

interface AccessGateProps {
  onAccessGranted: (tier: AccessTier) => void
  mode: "draft" | "analyze" | "chat"
}

export function AccessGate({ onAccessGranted, mode }: AccessGateProps) {
  const [selectedTier, setSelectedTier] = useState<AccessTier | null>(null)
  const [showParentalConsent, setShowParentalConsent] = useState(false)

  const handleContinue = () => {
    if (selectedTier === "supervised") {
      setShowParentalConsent(true)
    } else if (selectedTier) {
      onAccessGranted(selectedTier)
    }
  }

  const handleParentalConsent = () => {
    onAccessGranted("supervised")
  }

  if (showParentalConsent) {
    return (
      <Card className="mx-auto max-w-2xl p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold">Parental Consent Required</h2>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              For children under 13, we require parental consent to comply with COPPA (Children's Online Privacy
              Protection Act).
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <p className="text-muted-foreground">By clicking "I Consent as Parent/Guardian," you confirm that:</p>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>You are the parent or legal guardian of the child who will use this service</li>
              <li>You consent to your child using Clarity Coach with full features</li>
              <li>You understand that conversations may be saved for improving the service</li>
              <li>You have reviewed our Privacy Policy and Terms of Service</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleParentalConsent} className="flex-1">
              I Consent as Parent/Guardian
            </Button>
            <Button variant="outline" onClick={() => setShowParentalConsent(false)} className="flex-1">
              Go Back
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="mx-auto max-w-2xl p-8">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <h2 className="text-2xl font-bold">Choose Your Access Level</h2>
        </div>

        <p className="text-muted-foreground">
          Clarity Coach offers different access levels to ensure safety and privacy for all users.
        </p>

        <RadioGroup value={selectedTier || ""} onValueChange={(value) => setSelectedTier(value as AccessTier)}>
          <div className="space-y-4">
            {/* Anonymous Access */}
            <Card className="cursor-pointer p-4 transition-colors hover:border-primary">
              <Label htmlFor="anonymous" className="flex cursor-pointer items-start gap-4">
                <RadioGroupItem value="anonymous" id="anonymous" className="mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Anonymous Access (No Account Needed)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Perfect for anyone who needs help without creating an account. No personal data collected.
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
                    <li>Draft and Analyze modes available</li>
                    <li>{mode === "chat" ? "Limited chat features" : "Full features for this mode"}</li>
                    <li>No conversation history saved</li>
                    <li>10 uses per hour</li>
                    <li>All safety features active</li>
                  </ul>
                </div>
              </Label>
            </Card>

            {/* Authenticated Access */}
            <Card className="cursor-pointer p-4 transition-colors hover:border-primary">
              <Label htmlFor="authenticated" className="flex cursor-pointer items-start gap-4">
                <RadioGroupItem value="authenticated" id="authenticated" className="mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Full Access (Age 13+)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For users 13 and older who want full features and conversation history.
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
                    <li>All modes with full features</li>
                    <li>Conversation history saved</li>
                    <li>File uploads</li>
                    <li>100 uses per hour</li>
                    <li>Account creation available</li>
                  </ul>
                </div>
              </Label>
            </Card>

            {/* Supervised Access */}
            <Card className="cursor-pointer p-4 transition-colors hover:border-primary">
              <Label htmlFor="supervised" className="flex cursor-pointer items-start gap-4">
                <RadioGroupItem value="supervised" id="supervised" className="mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Baby className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Supervised Access (Under 13 with Parent)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For children under 13 with parental consent and supervision.
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
                    <li>Full features with parental oversight</li>
                    <li>Enhanced safety filtering</li>
                    <li>Requires parental consent</li>
                    <li>Age-appropriate content only</li>
                  </ul>
                </div>
              </Label>
            </Card>
          </div>
        </RadioGroup>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            All access levels include crisis detection and resources. Your safety is our priority.
          </AlertDescription>
        </Alert>

        <div className="flex gap-4">
          <Button onClick={handleContinue} disabled={!selectedTier} className="flex-1">
            Continue
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="/apps/clarity/terms" className="underline hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/apps/clarity/privacy" className="underline hover:text-primary">
            Privacy Policy
          </a>
        </p>
      </div>
    </Card>
  )
}
