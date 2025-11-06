"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Edit, Save, X, RefreshCw } from "lucide-react"
import { RadioPillGroup } from "./RadioPillGroup"
import { CopyButton } from "./CopyButton"
import { FeedbackWidget } from "./FeedbackWidget"
import { MarkdownRenderer } from "./MarkdownRenderer"
import { FileUpload } from "@/components/file-upload"

const loadingTips = [
  "Average translation time is 5-10 seconds.",
  "Analyzing tone, subtext, and pragmatic meaning...",
  "Tip: Providing clear context leads to better translations.",
  "Did you know? The 'Double Empathy Problem' suggests communication gaps are a two-way street.",
  "Checking for potential misinterpretations...",
  "Tip: Indirect communicators often use questions to make suggestions softly.",
  "Considering how different neurotypes might perceive this message...",
]

const EXAMPLE_SCENARIOS = {
  promotion: {
    intent:
      "I want to ask for a promotion. I've been here for three years, consistently exceeded my goals, and taken on additional responsibilities. I deserve recognition for my contributions.",
    draft:
      "Hey, I wanted to talk about my role. I've been doing a lot of extra work and think I should be promoted. Can we discuss this?",
    senderStyle: "direct",
    receiverStyle: "indirect",
  },
  feedback: {
    intent:
      "I need to give constructive feedback to a team member who keeps missing deadlines. I want them to improve without feeling attacked.",
    draft: "You've been missing a lot of deadlines lately and it's affecting the team. You need to do better.",
    senderStyle: "direct",
    receiverStyle: "indirect",
  },
  request: {
    intent:
      "I need to ask my manager for time off during a busy period. I want to be respectful of the team's needs while also taking care of my own.",
    draft: "I know we're busy, but I really need some time off next month. Is that okay?",
    senderStyle: "indirect",
    receiverStyle: "direct",
  },
}

export default function DraftModePage() {
  const [intent, setIntent] = useState("")
  const [draft, setDraft] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const example = params.get("example") as keyof typeof EXAMPLE_SCENARIOS
    if (example && EXAMPLE_SCENARIOS[example]) {
      const scenario = EXAMPLE_SCENARIOS[example]
      setIntent(scenario.intent)
      setDraft(scenario.draft)
      setSenderStyle(scenario.senderStyle)
      setReceiverStyle(scenario.receiverStyle)
    }
  }, [])

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
        attachedFiles: uploadedFiles,
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
    setUploadedFiles([])
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
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="text-center mb-4">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Draft a Message</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Transform your thoughts into clear, effective communication.
          </p>
        </div>

        {!aiResponse && (
          <Card className="mb-4 p-3 bg-primary/5 border-primary/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-sm">
                <span className="font-semibold">Try an example:</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.entries(EXAMPLE_SCENARIOS).map(([key, scenario]) => (
                  <Button
                    key={key}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIntent(scenario.intent)
                      setDraft(scenario.draft)
                      setSenderStyle(scenario.senderStyle)
                      setReceiverStyle(scenario.receiverStyle)
                    }}
                    className="capitalize text-xs"
                  >
                    {key}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {aiResponse && (
          <Card className="mb-4 p-4 bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium">Your Request:</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{intent}</p>
              </div>
              <Button onClick={handleReset} variant="outline" size="sm">
                New Message
              </Button>
            </div>
          </Card>
        )}

        {!aiResponse && (
          <form onSubmit={handleTranslate} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <Label htmlFor="intent" className="text-sm font-semibold mb-1 block">
                  Your Goal <span className="text-destructive">*</span>
                </Label>
                <p className="text-xs text-muted-foreground mb-2">What do you want to achieve?</p>
                <Textarea
                  id="intent"
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  placeholder="Example: I want to ask for a promotion..."
                  required
                  className="min-h-[120px]"
                />
              </Card>

              <Card className="p-4">
                <Label htmlFor="draft" className="text-sm font-semibold mb-1 block">
                  Your Draft <span className="text-destructive">*</span>
                </Label>
                <p className="text-xs text-muted-foreground mb-2">What are you thinking of saying?</p>
                <Textarea
                  id="draft"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Example: Hey boss, I think I deserve a promotion..."
                  required
                  className="min-h-[120px]"
                />
              </Card>
            </div>

            <Card className="p-4">
              <Label className="text-sm font-semibold mb-2 block">Additional Context (Optional)</Label>
              <p className="text-xs text-muted-foreground mb-3">
                Attach documents for additional context (e.g., previous email threads, background information)
              </p>
              <FileUpload onFilesChange={setUploadedFiles} maxFiles={3} disabled={isLoading} />
            </Card>

            <Card className="p-4 bg-muted/50">
              <h3 className="font-serif text-base font-bold mb-3 text-center">Communication Styles</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-xs font-medium mb-2 flex items-center gap-2">Your Style</Label>
                  <RadioPillGroup
                    name="sender"
                    value={senderStyle}
                    onChange={setSenderStyle}
                    options={["direct", "indirect", "let-ai-decide"]}
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium mb-2 flex items-center gap-2">Their Style</Label>
                  <RadioPillGroup
                    name="receiver"
                    value={receiverStyle}
                    onChange={setReceiverStyle}
                    options={["direct", "indirect"]}
                  />
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="text-center mb-3">
                  <label className="flex items-center justify-center gap-2 text-xs text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAdvancedMode}
                      onChange={() => setIsAdvancedMode(!isAdvancedMode)}
                      className="w-4 h-4"
                    />
                    {isAdvancedMode ? "Hide" : "Show"} Additional Options
                  </label>
                </div>

                {isAdvancedMode && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-medium mb-2 flex items-center gap-2">Your Neurotype</Label>
                      <RadioPillGroup
                        name="sender-nt"
                        value={senderNeurotype}
                        onChange={setSenderNeurotype}
                        options={neurotypes}
                      />
                    </div>

                    <div>
                      <Label className="text-xs font-medium mb-2 flex items-center gap-2">Their Neurotype</Label>
                      <RadioPillGroup
                        name="receiver-nt"
                        value={receiverNeurotype}
                        onChange={setReceiverNeurotype}
                        options={neurotypes}
                      />
                    </div>

                    <div>
                      <Label className="text-xs font-medium mb-2 flex items-center gap-2">Your Generation</Label>
                      <RadioPillGroup
                        name="sender-gen"
                        value={senderGeneration}
                        onChange={setSenderGeneration}
                        options={generations}
                      />
                    </div>

                    <div>
                      <Label className="text-xs font-medium mb-2 block">Their Generation</Label>
                      <RadioPillGroup
                        name="receiver-gen"
                        value={receiverGeneration}
                        onChange={setReceiverGeneration}
                        options={generations}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <div className="flex justify-center items-center gap-4">
              <Button type="submit" size="lg" disabled={isLoading || !intent || !draft}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Translating...
                  </span>
                ) : (
                  "Translate"
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
              <CopyButton text={aiResponse.explanation} />
              <h3 className="text-base font-bold font-serif text-primary mb-3">How They Might Hear It</h3>
              <MarkdownRenderer content={aiResponse.explanation} />
              <FeedbackWidget
                rating={explanationFeedback.rating}
                comment={explanationFeedback.comment}
                onRatingChange={(rating) => setExplanationFeedback({ ...explanationFeedback, rating })}
                onCommentChange={(comment) => setExplanationFeedback({ ...explanationFeedback, comment })}
                onSubmit={() => handleFeedbackSubmit("explanation")}
                isSuccess={feedbackSuccess.explanation}
              />
            </Card>

            <Card className="p-4 relative">
              <CopyButton text={isEditing ? editedResponse : aiResponse.response} />
              <h3 className="text-base font-bold font-serif text-primary mb-3">The Translation</h3>
              {isEditing ? (
                <Textarea
                  value={editedResponse}
                  onChange={(e) => setEditedResponse(e.target.value)}
                  className="min-h-[150px] mb-3 text-sm"
                />
              ) : (
                <div className="mb-3">
                  <MarkdownRenderer content={aiResponse.response} />
                </div>
              )}

              <div className="flex flex-wrap gap-2 items-center mb-3">
                {!isEditing ? (
                  <Button onClick={handleEditClick} variant="outline" size="sm">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSaveEdit} disabled={isSavingEdit} size="sm">
                      <Save className="w-3 h-3 mr-1" />
                      {isSavingEdit ? "Saving..." : "Save"}
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                      <X className="w-3 h-3 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleReanalyze}
                      disabled={isReanalyzing || !editSaveSuccess}
                      variant="outline"
                      size="sm"
                    >
                      <RefreshCw className={`w-3 h-3 mr-1 ${isReanalyzing ? "animate-spin" : ""}`} />
                      Re-analyze
                    </Button>
                  </>
                )}
              </div>

              {editSaveSuccess && <p className="text-xs text-green-600 dark:text-green-400 mb-3">Feedback saved!</p>}

              {reanalysisResult && (
                <Card className="p-3 bg-muted mb-3">
                  <h4 className="font-bold text-xs mb-2">Analysis of Your Edit</h4>
                  <div className="text-xs">
                    <MarkdownRenderer content={reanalysisResult} />
                  </div>
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
