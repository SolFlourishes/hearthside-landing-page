"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Copy, Check, Edit, Save, X, RefreshCw, Info } from "lucide-react"

const loadingTips = [
  "Average translation time is 5-10 seconds.",
  "Analyzing tone, subtext, and pragmatic meaning...",
  "Tip: Providing clear context leads to better translations.",
  "Did you know? The 'Double Empathy Problem' suggests communication gaps are a two-way street.",
  "Checking for potential misinterpretations...",
  "Tip: Indirect communicators often use questions to make suggestions softly.",
  "Considering how different neurotypes might perceive this message...",
]

export default function DraftModePage() {
  const [intent, setIntent] = useState("")
  const [draft, setDraft] = useState("")
  const [senderStyle, setSenderStyle] = useState("let-ai-decide")
  const [receiverStyle, setReceiverStyle] = useState("indirect")
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const [senderNeurotype, setSenderNeurotype] = useState("Unsure")
  const [receiverNeurotype, setReceiverNeurotype] = useState("Unsure")
  const [senderGeneration, setSenderGeneration] = useState("unsure")
  const [receiverGeneration, setReceiverGeneration] = useState("unsure")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(loadingTips[0])
  const [error, setError] = useState<string | null>(null)
  const [aiResponse, setAiResponse] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedResponse, setEditedResponse] = useState("")
  const [isSavingEdit, setIsSavingEdit] = useState(false)
  const [editSaveSuccess, setEditSaveSuccess] = useState(false)
  const [isReanalyzing, setIsReanalyzing] = useState(false)
  const [reanalysisResult, setReanalysisResult] = useState<string | null>(null)
  const [feedbackDocId, setFeedbackDocId] = useState<string | null>(null)
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

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setAiResponse(null)
    setFeedbackSuccess({ explanation: false, response: false })
    setIsEditing(false)
    setEditedResponse("")
    setEditSaveSuccess(false)
    setIsReanalyzing(false)
    setReanalysisResult(null)
    setFeedbackDocId(null)
    setIsLoading(true)

    try {
      let finalSenderStyle = senderStyle
      if (senderStyle === "let-ai-decide") {
        const textForClassification = intent || draft
        if (!textForClassification) throw new Error("Please provide text for the AI to analyze your style.")

        const clsRes = await fetch(`/api/clarity/classify-style`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: textForClassification }),
        })
        if (!clsRes.ok) throw new Error("Could not classify style.")
        const data = await clsRes.json()
        finalSenderStyle = data.style
      }

      const requestBody = {
        mode: "draft",
        text: draft,
        context: intent,
        sender: finalSenderStyle,
        receiver: receiverStyle,
        senderNeurotype,
        receiverNeurotype,
        senderGeneration,
        receiverGeneration,
      }

      const transRes = await fetch(`/api/clarity/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })

      if (!transRes.ok) {
        const errData = await transRes.json()
        throw new Error(errData.error || "An error occurred during translation.")
      }

      const data = await transRes.json()
      setAiResponse(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditClick = () => {
    setEditedResponse(aiResponse.response)
    setIsEditing(true)
    setEditSaveSuccess(false)
    setReanalysisResult(null)
    setFeedbackDocId(null)
  }

  const handleSaveEdit = async () => {
    setIsSavingEdit(true)
    setError(null)
    try {
      const res = await fetch(`/api/clarity/feedback/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalResponse: aiResponse.response,
          editedResponse,
          mode: "draft",
        }),
      })
      if (!res.ok) throw new Error("Failed to save your edit.")
      const { docId } = await res.json()
      setFeedbackDocId(docId)
      setEditSaveSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSavingEdit(false)
    }
  }

  const handleReanalyze = async () => {
    if (!feedbackDocId) {
      setError("Please save your edit before re-analyzing.")
      return
    }
    setIsReanalyzing(true)
    setError(null)
    setReanalysisResult(null)
    try {
      const requestBody = {
        mode: "analyze",
        text: editedResponse,
        analyzeContext: `The user edited the AI's suggestion. Analyze their new version for clarity and potential misinterpretations. Original AI suggestion was: "${aiResponse.response}"`,
        interpretation: "How does my new version sound?",
        sender: senderStyle,
        receiver: receiverStyle,
        senderNeurotype,
        receiverNeurotype,
        senderGeneration,
        receiverGeneration,
      }

      const transRes = await fetch(`/api/clarity/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })

      if (!transRes.ok) throw new Error("Failed to re-analyze.")
      const data = await transRes.json()
      setReanalysisResult(data.explanation)

      await fetch(`/api/clarity/feedback/reanalysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docId: feedbackDocId, reanalysisText: data.explanation }),
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsReanalyzing(false)
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
          mode: "draft",
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
    setIntent("")
    setDraft("")
    setError(null)
    setAiResponse(null)
    setFeedbackSuccess({ explanation: false, response: false })
    setIsAdvancedMode(false)
    setSenderStyle("let-ai-decide")
    setReceiverStyle("indirect")
    setSenderNeurotype("Unsure")
    setReceiverNeurotype("Unsure")
    setSenderGeneration("unsure")
    setReceiverGeneration("unsure")
    setIsEditing(false)
    setEditedResponse("")
    setEditSaveSuccess(false)
    setIsReanalyzing(false)
    setReanalysisResult(null)
    setFeedbackDocId(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-3">Draft a Message</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Clearly defining your intent helps the AI create a more accurate translation.
          </p>
        </div>

        <form onSubmit={handleTranslate} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <Label htmlFor="intent" className="text-base font-semibold mb-2 block">
                What I Mean (Intent) <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="intent"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder="What is the goal of your message?"
                required
                className="min-h-[150px]"
              />
            </Card>

            <Card className="p-6">
              <Label htmlFor="draft" className="text-base font-semibold mb-2 block">
                What I Want to Say <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="draft"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="What are your key points or raw thoughts?"
                required
                className="min-h-[150px]"
              />
            </Card>
          </div>

          <Card className="p-6 bg-muted/50">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                  My Communication Style
                  <TooltipIcon text="Direct: You say what you mean. Indirect: You use context and subtext." />
                </Label>
                <RadioPillGroup
                  name="sender"
                  value={senderStyle}
                  onChange={setSenderStyle}
                  options={["direct", "indirect", "let-ai-decide"]}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Audience's Style</Label>
                <RadioPillGroup
                  name="receiver"
                  value={receiverStyle}
                  onChange={setReceiverStyle}
                  options={["direct", "indirect"]}
                />
              </div>
            </div>

            <div className="text-center mb-4">
              <label className="flex items-center justify-center gap-2 text-sm text-muted-foreground cursor-pointer">
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
              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                    My Neurotype
                    <TooltipIcon text="Autism: May prefer direct, literal language. ADHD: May communicate in non-linear ways." />
                  </Label>
                  <RadioPillGroup
                    name="sender-nt"
                    value={senderNeurotype}
                    onChange={setSenderNeurotype}
                    options={neurotypes}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Audience's Neurotype</Label>
                  <RadioPillGroup
                    name="receiver-nt"
                    value={receiverNeurotype}
                    onChange={setReceiverNeurotype}
                    options={neurotypes}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                    My Generation
                    <TooltipIcon text="Gen Z: ~1997-2012, Millennial: ~1981-1996, Gen X: ~1965-1980, Boomer: ~1946-1964" />
                  </Label>
                  <RadioPillGroup
                    name="sender-gen"
                    value={senderGeneration}
                    onChange={setSenderGeneration}
                    options={generations}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Audience's Generation</Label>
                  <RadioPillGroup
                    name="receiver-gen"
                    value={receiverGeneration}
                    onChange={setReceiverGeneration}
                    options={generations}
                  />
                </div>
              </div>
            )}
          </Card>

          <div className="flex justify-center items-center gap-4">
            <Button type="submit" size="lg" disabled={isLoading || !intent || !draft}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {loadingMessage}
                </span>
              ) : (
                "Translate"
              )}
            </Button>
            <Button type="button" onClick={handleReset} variant="outline" size="lg">
              Reset
            </Button>
          </div>
        </form>

        {error && (
          <Card className="mt-6 p-4 bg-destructive/10 border-destructive">
            <p className="text-destructive text-center">{error}</p>
          </Card>
        )}

        {aiResponse && (
          <div className="mt-12 pt-8 border-t grid md:grid-cols-2 gap-6">
            <Card className="p-6 relative">
              <CopyButton text={aiResponse.explanation} />
              <h3 className="text-lg font-bold font-serif text-primary mb-4">How They Might Hear It (Explanation)</h3>
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: aiResponse.explanation }}
              />
              <FeedbackWidget
                rating={explanationFeedback.rating}
                comment={explanationFeedback.comment}
                onRatingChange={(rating) => setExplanationFeedback({ ...explanationFeedback, rating })}
                onCommentChange={(comment) => setExplanationFeedback({ ...explanationFeedback, comment })}
                onSubmit={() => handleFeedbackSubmit("explanation")}
                isSuccess={feedbackSuccess.explanation}
              />
            </Card>

            <Card className="p-6 relative">
              <CopyButton text={isEditing ? editedResponse : aiResponse.response} />
              <h3 className="text-lg font-bold font-serif text-primary mb-4">The Translation (Suggested Draft)</h3>
              {isEditing ? (
                <Textarea
                  value={editedResponse}
                  onChange={(e) => setEditedResponse(e.target.value)}
                  className="min-h-[200px] mb-4"
                />
              ) : (
                <div
                  className="prose prose-sm dark:prose-invert max-w-none mb-4"
                  dangerouslySetInnerHTML={{ __html: aiResponse.response }}
                />
              )}

              <div className="flex flex-wrap gap-2 items-center mb-4">
                {!isEditing ? (
                  <Button onClick={handleEditClick} variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit this translation
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSaveEdit} disabled={isSavingEdit} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      {isSavingEdit ? "Saving..." : "Save"}
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleReanalyze}
                      disabled={isReanalyzing || !editSaveSuccess}
                      variant="outline"
                      size="sm"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${isReanalyzing ? "animate-spin" : ""}`} />
                      {isReanalyzing ? "Analyzing..." : "Re-analyze My Edit"}
                    </Button>
                  </>
                )}
              </div>

              {editSaveSuccess && (
                <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                  Thank you! Your feedback has been saved.
                </p>
              )}

              {reanalysisResult && (
                <Card className="p-4 bg-muted mb-4">
                  <h4 className="font-bold text-sm mb-2">Analysis of Your Edit</h4>
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: reanalysisResult }}
                  />
                </Card>
              )}

              {!isEditing && (
                <FeedbackWidget
                  rating={responseFeedback.rating}
                  comment={responseFeedback.comment}
                  onRatingChange={(rating) => setResponseFeedback({ ...responseFeedback, rating })}
                  onCommentChange={(comment) => setResponseFeedback({ ...responseFeedback, comment })}
                  onSubmit={() => handleFeedbackSubmit("response")}
                  isSuccess={feedbackSuccess.response}
                />
              )}
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}

function RadioPillGroup({
  name,
  value,
  onChange,
  options,
}: {
  name: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <label
          key={option}
          className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-colors ${
            value === option ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="hidden"
          />
          <span className="capitalize">{option.replace("-", " ")}</span>
        </label>
      ))}
    </div>
  )
}

function TooltipIcon({ text }: { text: string }) {
  return (
    <div className="group relative inline-block">
      <Info className="w-4 h-4 text-muted-foreground" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-popover text-popover-foreground text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border shadow-lg z-10">
        {text}
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    const stripHtml = (html: string) => {
      const doc = new DOMParser().parseFromString(html, "text/html")
      return doc.body.textContent || ""
    }
    const plainText = stripHtml(text)
    navigator.clipboard.writeText(plainText).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <Button
      type="button"
      onClick={handleCopy}
      variant="ghost"
      size="sm"
      className="absolute top-3 right-3"
      title="Copy to clipboard"
    >
      {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </Button>
  )
}

function FeedbackWidget({
  rating,
  comment,
  onRatingChange,
  onCommentChange,
  onSubmit,
  isSuccess,
}: {
  rating: number
  comment: string
  onRatingChange: (rating: number) => void
  onCommentChange: (comment: string) => void
  onSubmit: () => void
  isSuccess: boolean
}) {
  return (
    <div className="mt-4 pt-4 border-t space-y-2">
      <p className="text-sm font-medium">Rate this:</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
          >
            ★
          </button>
        ))}
      </div>
      <Textarea
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
        placeholder="Optional: Tell us more..."
        className="min-h-[60px] text-sm"
      />
      <Button onClick={onSubmit} disabled={rating === 0 || isSuccess} size="sm" className="w-full">
        {isSuccess ? "Thank you!" : "Submit Feedback"}
      </Button>
    </div>
  )
}
