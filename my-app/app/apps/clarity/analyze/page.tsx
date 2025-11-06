"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"
import { FileUpload } from "@/components/file-upload"

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
  const [message, setMessage] = useState("")
  const [situationContext, setSituationContext] = useState("")
  const [interpretation, setInterpretation] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
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
                  <Label className="text-xs font-medium mb-2 flex items-center gap-2">
                    Their Style
                    {/* TooltipIcon text="Direct: They say what they mean. Indirect: They use context." /> */}
                  </Label>
                  {/* RadioPillGroup
                    name="sender"
                    value={senderStyle}
                    onChange={setSenderStyle}
                    options={["direct", "indirect"]}
                  /> */}
                </div>

                <div>
                  <Label className="text-xs font-medium mb-2 block">My Style</Label>
                  {/* RadioPillGroup
                    name="receiver"
                    value={receiverStyle}
                    onChange={setReceiverStyle}
                    options={["direct", "indirect", "let-ai-decide"]}
                  /> */}
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
                    <Label className="text-xs font-medium mb-2 flex items-center gap-2">
                      Their Neurotype
                      {/* TooltipIcon text="Autism: May prefer direct language. ADHD: May communicate non-linearly." /> */}
                    </Label>
                    {/* RadioPillGroup
                      name="sender-nt"
                      value={senderNeurotype}
                      onChange={setSenderNeurotype}
                      options={neurotypes}
                    /> */}
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-2 block">My Neurotype</Label>
                    {/* RadioPillGroup
                      name="receiver-nt"
                      value={receiverNeurotype}
                      onChange={setReceiverNeurotype}
                      options={neurotypes}
                    /> */}
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-2 flex items-center gap-2">
                      Their Generation
                      {/* TooltipIcon text="Gen Z: ~1997-2012, Millennial: ~1981-1996, Gen X: ~1965-1980" /> */}
                    </Label>
                    {/* RadioPillGroup
                      name="sender-gen"
                      value={senderGeneration}
                      onChange={setSenderGeneration}
                      options={generations}
                    /> */}
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-2 block">My Generation</Label>
                    {/* RadioPillGroup
                      name="receiver-gen"
                      value={receiverGeneration}
                      onChange={setReceiverGeneration}
                      options={generations}
                    /> */}
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
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Card className="p-4 relative">
              {/* CopyButton text={aiResponse.explanation} */}
              <h3 className="text-base font-bold font-serif text-primary mb-3">What They Likely Meant</h3>
              <div
                className="prose prose-sm dark:prose-invert max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: aiResponse.explanation }}
              />
              {/* FeedbackWidget
                rating={explanationFeedback.rating}
                comment={explanationFeedback.comment}
                onRatingChange={(rating) => setExplanationFeedback({ ...explanationFeedback, rating })}
                onCommentChange={(comment) => setExplanationFeedback({ ...explanationFeedback, comment })}
                onSubmit={() => handleFeedbackSubmit("explanation")}
                isSuccess={feedbackSuccess.explanation}
              /> */}
            </Card>

            <Card className="p-4 relative">
              {/* CopyButton text={aiResponse.response} */}
              <h3 className="text-base font-bold font-serif text-primary mb-3">Suggested Response</h3>
              <div
                className="prose prose-sm dark:prose-invert max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: aiResponse.response }}
              />
              {/* FeedbackWidget
                rating={responseFeedback.rating}
                comment={responseFeedback.comment}
                onRatingChange={(rating) => setResponseFeedback({ ...responseFeedback, rating })}
                onCommentChange={(comment) => setResponseFeedback({ ...responseFeedback, comment })}
                onSubmit={() => handleFeedbackSubmit("response")}
                isSuccess={feedbackSuccess.response}
              /> */}
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}

// function RadioPillGroup({
//   name,
//   value,
//   onChange,
//   options,
// }: {
//   name: string
//   value: string
//   onChange: (value: string) => void
//   options: string[]
// }) {
//   return (
//     <div className="flex flex-wrap gap-2">
//       {options.map((option) => (
//         <label
//           key={option}
//           className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-colors ${
//             value === option ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
//           }`}
//         >
//           <input
//             type="radio"
//             name={name}
//             value={option}
//             checked={value === option}
//             onChange={(e) => onChange(e.target.value)}
//             className="hidden"
//           />
//           <span className="capitalize">{option.replace("-", " ")}</span>
//         </label>
//       ))}
//     </div>
//   )
// }

// function TooltipIcon({ text }: { text: string }) {
//   return (
//     <div className="group relative inline-block">
//       <Info className="w-4 h-4 text-muted-foreground" />
//       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-popover text-popover-foreground text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border shadow-lg z-10">
//         {text}
//       </div>
//     </div>
//   )
// }

// function CopyButton({ text }: { text: string }) {
//   const [isCopied, setIsCopied] = useState(false)

//   const handleCopy = () => {
//     const stripHtml = (html: string) => {
//       const doc = new DOMParser().parseFromString(html, "text/html")
//       return doc.body.textContent || ""
//     }
//     const plainText = stripHtml(text)
//     navigator.clipboard.writeText(plainText).then(() => {
//       setIsCopied(true)
//       setTimeout(() => setIsCopied(false), 2000)
//     })
//   }

//   return (
//     <Button
//       type="button"
//       onClick={handleCopy}
//       variant="ghost"
//       size="sm"
//       className="absolute top-3 right-3"
//       title="Copy to clipboard"
//     >
//       {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
//     </Button>
//   )
// }

// function FeedbackWidget({
//   rating,
//   comment,
//   onRatingChange,
//   onCommentChange,
//   onSubmit,
//   isSuccess,
// }: {
//   rating: number
//   comment: string
//   onRatingChange: (rating: number) => void
//   onCommentChange: (comment: string) => void
//   onSubmit: () => void
//   isSuccess: boolean
// }) {
//   return (
//     <div className="mt-3 pt-3 border-t space-y-2">
//       <p className="text-xs font-medium">Rate this:</p>
//       <div className="flex gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             type="button"
//             onClick={() => onRatingChange(star)}
//             className={`text-xl ${star <= rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
//           >
//             ★
//           </button>
//         ))}
//       </div>
//       <Textarea
//         value={comment}
//         onChange={(e) => onCommentChange(e.target.value)}
//         placeholder="Optional: Tell us more..."
//         className="min-h-[50px] text-xs"
//       />
//       <Button onClick={onSubmit} disabled={rating === 0 || isSuccess} size="sm" className="w-full">
//         {isSuccess ? "Thank you!" : "Submit Feedback"}
//       </Button>
//     </div>
//   )
// }
