"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"
import { FileUpload } from "@/components/file-upload"
import { AudienceSelector } from "@/components/audience-selector"
import { AccessGate, type AccessTier } from "@/components/access-gate"
import { ReportButton } from "@/components/report-button"

const loadingTips = [
  "Average analysis time is 5-10 seconds.",
  "Analyzing tone, subtext, and pragmatic meaning...",
  "Tip: Providing clear context leads to better analysis.",
  "Did you know? The 'Double Empathy Problem' suggests communication gaps are a two-way street.",
  "Checking for potential misinterpretations...",
  "Tip: Indirect communicators often use questions to make suggestions softly.",
  "Considering how different neurotypes might perceive this message...",
]

export default function AnalyzeModePage() {
  const [accessTier, setAccessTier] = useState<AccessTier | null>(null)
  const [message, setMessage] = useState("")
  const [situationContext, setSituationContext] = useState("")
  const [interpretation, setInterpretation] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [audience, setAudience] = useState("adult-to-adult")
  const [senderStyle, setSenderStyle] = useState("indirect")
  const [receiverStyle, setReceiverStyle] = useState("let-ai-decide")
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const [senderNeurotype, setSenderNeurotype] = useState("Unsure")
  const [receiverNeurotype, setReceiverNeurotype] = useState("Unsure")
  const [senderGeneration, setSenderGeneration] = useState("unsure")
  const [receiverGeneration, setReceiverGeneration] = useState("unsure")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(loadingTips[0])
  const [error, setError] = useState<string | null>(null)
  const [aiResponse, setAiResponse] = useState<any>(null)
  const [explanationFeedback, setExplanationFeedback] = useState({ rating: 0, comment: "" })
  const [responseFeedback, setResponseFeedback] = useState({ rating: 0, comment: "" })
  const [feedbackSuccess, setFeedbackSuccess] = useState({ explanation: false, response: false })

  const generations = ["Boomer", "Gen X", "Xennial", "Millennial", "Gen Z", "Gen Alpha", "unsure"]
  const neurotypes = ["Autism", "ADHD", "Neurotypical", "Unsure"]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMessage((prev) => {
          const currentIndex = loadingTips.indexOf(prev)
          const nextIndex = (currentIndex + 1) % loadingTips.length
          return loadingTips[nextIndex]
        })
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isLoading])

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setAiResponse(null)
    setFeedbackSuccess({ explanation: false, response: false })
    setIsLoading(true)

    try {
      let finalReceiverStyle = receiverStyle
      if (receiverStyle === "let-ai-decide") {
        const clsRes = await fetch(`/api/clarity/classify-style`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: message }),
        })
        if (!clsRes.ok) throw new Error("Could not classify style.")
        const data = await clsRes.json()
        finalReceiverStyle = data.style
      }

      const requestBody = {
        mode: "analyze",
        text: message,
        analyzeContext: situationContext,
        interpretation,
        sender: senderStyle,
        receiver: finalReceiverStyle,
        senderNeurotype,
        receiverNeurotype,
        senderGeneration,
        receiverGeneration,
        attachedFiles: uploadedFiles,
        audience,
      }

      const transRes = await fetch(`/api/clarity/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })

      if (!transRes.ok) {
        const errData = await transRes.json()
        throw new Error(errData.error || "An error occurred during analysis.")
      }

      const data = await transRes.json()
      setAiResponse(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFeedbackSubmit = async (type: "explanation" | "response") => {
    const feedbackData = type === "explanation" ? explanationFeedback : responseFeedback
    if (feedbackData.rating === 0) return

    try {
      const res = await fetch(`/api/clarity/feedback/rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...feedbackData,
          type,
          mode: "analyze",
          timestamp: new Date().toISOString(),
        }),
      })
      if (!res.ok) throw new Error()
      setFeedbackSuccess((prev) => ({ ...prev, [type]: true }))
    } catch (err) {
      setError("Sorry, could not submit feedback.")
    }
  }

  const handleReset = () => {
    setMessage("")
    setSituationContext("")
    setInterpretation("")
    setUploadedFiles([])
    setAudience("adult-to-adult")
    setError(null)
    setAiResponse(null)
    setFeedbackSuccess({ explanation: false, response: false })
    setIsAdvancedMode(false)
    setSenderStyle("indirect")
    setReceiverStyle("let-ai-decide")
    setSenderNeurotype("Unsure")
    setReceiverNeurotype("Unsure")
    setSenderGeneration("unsure")
    setReceiverGeneration("unsure")
  }

  if (!accessTier) {
    return <AccessGate mode="analyze" onAccessGranted={setAccessTier} />
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="text-center mb-4">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Analyze a Message</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Understand what they really meant and how to respond.
          </p>
        </div>

        {aiResponse && (
          <Card className="mb-4 p-4 bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium">Analyzing:</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{message}</p>
              </div>
              <Button onClick={handleReset} variant="outline" size="sm">
                New Analysis
              </Button>
            </div>
          </Card>
        )}

        {!aiResponse && (
          <form onSubmit={handleAnalyze} className="space-y-4">
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
              <AudienceSelector value={audience} onChange={setAudience} disabled={isLoading} />
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <Label htmlFor="message" className="text-sm font-semibold mb-1 block">
                  What They Wrote <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Paste the message..."
                  required
                  className="min-h-[120px]"
                />
              </Card>

              <Card className="p-4">
                <Label htmlFor="context" className="text-sm font-semibold mb-1 block">
                  Situation Context
                </Label>
                <Textarea
                  id="context"
                  value={situationContext}
                  onChange={(e) => setSituationContext(e.target.value)}
                  placeholder="e.g., This is my boss..."
                  className="min-h-[120px]"
                />
              </Card>

              <Card className="p-4">
                <Label htmlFor="interpretation" className="text-sm font-semibold mb-1 block">
                  How I Heard It <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="interpretation"
                  value={interpretation}
                  onChange={(e) => setInterpretation(e.target.value)}
                  placeholder="How did this make you feel?"
                  required
                  className="min-h-[120px]"
                />
              </Card>
            </div>

            <Card className="p-4">
              <Label className="text-sm font-semibold mb-2 block">Additional Context (Optional)</Label>
              <p className="text-xs text-muted-foreground mb-3">
                Attach documents for full conversation history or related context
              </p>
              <FileUpload onFilesChange={setUploadedFiles} maxFiles={3} disabled={isLoading} />
            </Card>

            <Card className="p-4 bg-muted/50">
              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <Label className="text-xs font-medium mb-2 flex items-center gap-2">Their Style</Label>
                </div>

                <div>
                  <Label className="text-xs font-medium mb-2 block">My Style</Label>
                </div>
              </div>

              <div className="text-center mb-3">
                <label className="flex items-center justify-center gap-2 text-xs text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAdvancedMode}
                    onChange={() => setIsAdvancedMode(!isAdvancedMode)}
                    className="w-4 h-4"
                  />
                  Show Advanced Options
                </label>
              </div>

              {isAdvancedMode && (
                <div className="grid md:grid-cols-2 gap-4 pt-3 border-t">
                  <div>
                    <Label className="text-xs font-medium mb-2 flex items-center gap-2">Their Neurotype</Label>
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-2 block">My Neurotype</Label>
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-2 flex items-center gap-2">Their Generation</Label>
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-2 block">My Generation</Label>
                  </div>
                </div>
              )}
            </Card>

            <div className="flex justify-center items-center gap-4">
              <Button type="submit" size="lg" disabled={isLoading || !message || !interpretation}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  "Analyze"
                )}
              </Button>
            </div>
          </form>
        )}

        {isLoading && (
          <Card className="mt-6 p-8 text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-sm text-muted-foreground">{loadingMessage}</p>
          </Card>
        )}

        {error && (
          <Card className="mt-6 p-4 bg-destructive/10 border-destructive">
            <p className="text-destructive text-center text-sm">{error}</p>
          </Card>
        )}

        {aiResponse && !isLoading && (
          <div className="mt-6 space-y-4">
            {aiResponse.attachmentGuidance && uploadedFiles.length > 0 && (
              <Card className="p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                <h3 className="text-base font-bold font-serif text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                  Attachment Guidance
                </h3>
                <div className="text-sm text-amber-900 dark:text-amber-100 prose prose-sm dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: aiResponse.attachmentGuidance }} />
                </div>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 relative">
                <ReportButton content={aiResponse.explanation} mode="analyze" type="explanation" />
                <h3 className="text-base font-bold font-serif text-primary mb-3">What They Likely Meant</h3>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: aiResponse.explanation }}
                />
              </Card>

              <Card className="p-4 relative">
                <ReportButton content={aiResponse.response} mode="analyze" type="response" />
                <h3 className="text-base font-bold font-serif text-primary mb-3">Suggested Response</h3>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: aiResponse.response }}
                />
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
