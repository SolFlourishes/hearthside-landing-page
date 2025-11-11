"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Shield } from "lucide-react"

interface AgeVerificationModalProps {
  onVerified: (ageGroup: "child" | "teen" | "adult") => void
  onCancel: () => void
}

export function AgeVerificationModal({ onVerified, onCancel }: AgeVerificationModalProps) {
  const [ageGroup, setAgeGroup] = useState<string>("")

  const handleContinue = () => {
    if (ageGroup === "child") {
      // Show parent consent requirement
      alert(
        "For users under 13, parental consent is required. Please have a parent or guardian review our Privacy Policy and contact us at privacy@hearthsideworks.com to set up an account.",
      )
      onCancel()
    } else {
      onVerified(ageGroup as "child" | "teen" | "adult")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
      <Card className="max-w-lg w-full p-8 bg-background">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#007B8C]/10 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-[#007B8C]" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold">Welcome to Clarity Coach</h2>
            <p className="text-sm text-muted-foreground">Age-appropriate experience</p>
          </div>
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          To provide you with an age-appropriate experience and comply with children's privacy laws (COPPA), please
          select your age group:
        </p>

        <RadioGroup value={ageGroup} onValueChange={setAgeGroup} className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="child" id="child" />
            <Label htmlFor="child" className="flex-1 cursor-pointer">
              <div className="font-semibold">Under 13</div>
              <div className="text-xs text-muted-foreground">Requires parental consent</div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="teen" id="teen" />
            <Label htmlFor="teen" className="flex-1 cursor-pointer">
              <div className="font-semibold">13-17</div>
              <div className="text-xs text-muted-foreground">Teen-appropriate content</div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="adult" id="adult" />
            <Label htmlFor="adult" className="flex-1 cursor-pointer">
              <div className="font-semibold">18+</div>
              <div className="text-xs text-muted-foreground">Full access to all features</div>
            </Label>
          </div>
        </RadioGroup>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900 dark:text-blue-100 leading-relaxed">
            Your privacy is important to us. In anonymous mode, we don't collect personal information. All data is
            deleted after 24 hours.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleContinue}
            disabled={!ageGroup}
            className="flex-1 bg-[#007B8C] hover:bg-[#006270] text-white"
          >
            Continue
          </Button>
          <Button onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </Card>
    </div>
  )
}
