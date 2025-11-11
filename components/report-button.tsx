"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Flag, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ReportButtonProps {
  content: string
  userMessage?: string
  aiResponse?: string
}

export function ReportButton({ content, userMessage, aiResponse }: ReportButtonProps) {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState<string>("")
  const [reason, setReason] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/clarity/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          reason,
          category,
          userMessage,
          aiResponse,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setOpen(false)
          setSubmitted(false)
          setCategory("")
          setReason("")
        }, 2000)
      }
    } catch (error) {
      console.error("Failed to submit report:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Flag className="h-4 w-4" />
          Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report Concerning Content</DialogTitle>
          <DialogDescription>
            Help us improve safety by reporting inappropriate or concerning responses.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              Thank you for your report. We'll review it promptly.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>What's the issue?</Label>
              <RadioGroup value={category} onValueChange={setCategory}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="harmful-advice" id="harmful-advice" />
                  <Label htmlFor="harmful-advice" className="font-normal">
                    Harmful or dangerous advice
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inappropriate" id="inappropriate" />
                  <Label htmlFor="inappropriate" className="font-normal">
                    Inappropriate content
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inaccurate" id="inaccurate" />
                  <Label htmlFor="inaccurate" className="font-normal">
                    Inaccurate information
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="font-normal">
                    Other concern
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Additional details (optional)</Label>
              <Textarea
                id="reason"
                placeholder="Please describe your concern..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
              />
            </div>

            <Button onClick={handleSubmit} disabled={!category || loading} className="w-full">
              {loading ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
