"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { RefreshCw, ChevronDown, ChevronUp, Sparkles } from "lucide-react"
import { RadioPillGroup } from "./RadioPillGroup"
import { FileUpload } from "@/components/file-upload"
import { AudienceSelector } from "@/components/audience-selector"
import { AccessGate, type AccessTier } from "@/components/access-gate"
import { ReportButton } from "@/components/report-button"
import { AnalysisInfoCard } from "@/components/analysis-info-card"
import { RelationshipSelector } from "@/components/relationship-selector"
import { CommunicationModeSelector, type CommunicationMode } from "@/components/communication-mode-selector"
import { PoliticalIdentitySelector } from "@/components/political-identity-selector"
import { PoliticalValuesSelector } from "@/components/political-values-selector"
import type { RelationshipContext } from "@/lib/communication-profiles"
import type { PoliticalIdentity } from "@/lib/political-profiles"
import { getAccessTier, setAccessTier as storeAccessTier } from "@/lib/access-storage"
import { InfoTooltip } from "@/components/info-tooltip"
import { createBrowserClient } from "@supabase/ssr"
import { getCommunicationArchetype } from "@/lib/communication-profiles"

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
  const [senderNeurotype, setSenderNeurotype] = useState("Unsure")
  const [receiverNeurotype, setReceiverNeurotype] = useState("Unsure")
  const [senderGeneration, setSenderGeneration] = useState("unsure")
  const [receiverGeneration, setReceiverGeneration] = useState("unsure")
  const [senderRelationship, setSenderRelationship] = useState<RelationshipContext>("colleague")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(loadingTips[0])
  const [error, setError] = useState<string | null>(null)
  const [aiResponse, setAiResponse] = useState<any>(null)
  const [explanationFeedback, setExplanationFeedback] = useState({ rating: 0, comment: "" })
  const [responseFeedback, setResponseFeedback] = useState({ rating: 0, comment: "" })
  const [feedbackSuccess, setFeedbackSuccess] = useState({ explanation: false, response: false })
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [communicationArchetype, setCommunicationArchetype] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

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
    const storedTier = getAccessTier()
    if (storedTier) {
      setAccessTier(storedTier)
    }
  }, [])

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setAiResponse(null)
    setFeedbackSuccess({ explanation: false, response: false })
    setIsLoading(true)

    try {
      const requestBody = {
        mode: "analyze",
        text: message,
        analyzeContext: situationContext,
        interpretation,
        communicationMode,
        ...(communicationMode === "personal"
          ? {
              senderNeurotype,
              receiverNeurotype,
              senderGeneration,
              receiverGeneration,
              senderRelationship,
            }
          : {
              senderPolitical,
              receiverPolitical,
              senderPoliticalValues,
              receiverPoliticalValues,
            }),
        attachedFiles: uploadedFiles,
        audience,
        accessTier,
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
    setSenderNeurotype("Unsure")
    setReceiverNeurotype("Unsure")
    setSenderGeneration("unsure")
    setReceiverGeneration("unsure")
    setSenderRelationship("colleague")
    setCommunicationMode("personal")
    setSenderPolitical("unsure")
    setReceiverPolitical("unsure")
    setSenderPoliticalValues([])
    setReceiverPoliticalValues([])
  }

  const handleAccessGranted = (tier: AccessTier) => {
    storeAccessTier(tier)
    setAccessTier(tier)
  }

  const [showContextOptions, setShowContextOptions] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [communicationMode, setCommunicationMode] = useState<CommunicationMode>("personal")
  const [senderPolitical, setSenderPolitical] = useState<PoliticalIdentity>("unsure")
  const [receiverPolitical, setReceiverPolitical] = useState<PoliticalIdentity>("unsure")
  const [senderPoliticalValues, setSenderPoliticalValues] = useState<string[]>([])
  const [receiverPoliticalValues, setReceiverPoliticalValues] = useState<string[]>([])

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        )

        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("communication_style, neurotype, generation")
            .eq("id", user.id)
            .single()

          if (profile) {
            // Auto-populate receiver fields (you are receiving the message)
            if (profile.neurotype) setReceiverNeurotype(profile.neurotype)
            if (profile.generation) setReceiverGeneration(profile.generation)

            if (profile.communication_style) {
              const archetype = getCommunicationArchetype(profile.communication_style)
              setCommunicationArchetype(archetype)
              console.log("[v0] Loaded communication archetype for analysis:", archetype)
            }

            setProfileLoaded(true)
          }
        }
      } catch (error) {
        console.error("Error loading user profile:", error)
      }
    }

    loadUserProfile()
  }, [])

  const handleSaveTranslation = async () => {
    setIsSaving(true)
    setSaveSuccess(false)

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("Please log in to save translations")
        setIsSaving(false)
        return
      }

      const { error: saveError } = await supabase.from("clarity_translations").insert({
        user_id: user.id,
        mode: "analyze",
        original_message: message,
        situation_context: situationContext,
        interpretation: interpretation,
        translation: aiResponse.response,
        explanation: aiResponse.explanation,
        communication_mode: communicationMode,
        sender_context: {
          neurotype: senderNeurotype,
          generation: senderGeneration,
          relationship: senderRelationship,
          political: senderPolitical,
          political_values: senderPoliticalValues,
        },
        receiver_context: {
          neurotype: receiverNeurotype,
          generation: receiverGeneration,
          political: receiverPolitical,
          political_values: receiverPoliticalValues,
        },
      })

      if (saveError) throw saveError

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err: any) {
      console.error("Error saving translation:", err)
      setError("Failed to save translation. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (!accessTier) {
    return <AccessGate mode="analyze" onAccessGranted={handleAccessGranted} />
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Analyze a Message</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-2">
            Decode what someone really meant and get suggestions for how to respond. We'll analyze the message based on
            communication styles and help you understand the subtext.
          </p>
          <a
            href="/apps/clarity/how-to-use"
            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
          >
            Learn how to get the best results →
          </a>
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
          <form onSubmit={handleAnalyze} className="space-y-6">
            {/* Primary Inputs - Always Visible */}
            <Card className="p-6 border-2 border-primary/20">
              <div className="space-y-5">
                {/* Communication Mode Selector */}
                <div className="pb-4 border-b">
                  <CommunicationModeSelector
                    value={communicationMode}
                    onChange={setCommunicationMode}
                    disabled={isLoading}
                  />
                </div>

                {/* Audience Selector */}
                <div className="pb-4 border-b">
                  <AudienceSelector value={audience} onChange={setAudience} disabled={isLoading} />
                </div>

                {/* The Message */}
                <div>
                  <Label htmlFor="message" className="text-base font-semibold mb-2 block">
                    What did they say? <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Paste the message you received..."
                    required
                    className="min-h-[120px] text-base"
                    aria-required="true"
                  />
                </div>

                {/* Your Interpretation */}
                <div>
                  <Label htmlFor="interpretation" className="text-base font-semibold mb-2 block">
                    How did you interpret it? <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="interpretation"
                    value={interpretation}
                    onChange={(e) => setInterpretation(e.target.value)}
                    placeholder="Example: I felt like they were annoyed with me..."
                    required
                    className="min-h-[100px] text-base"
                    aria-required="true"
                  />
                </div>

                {/* Optional Situation Context */}
                <div>
                  <Label htmlFor="context" className="text-sm font-medium mb-2 block flex items-center gap-1">
                    Situation Context <span className="text-muted-foreground text-xs">(Optional)</span>
                  </Label>
                  <Textarea
                    id="context"
                    value={situationContext}
                    onChange={(e) => setSituationContext(e.target.value)}
                    placeholder={
                      communicationMode === "personal"
                        ? "Example: This is my boss, and we've been discussing deadlines..."
                        : "Example: This is a family member who has different political views..."
                    }
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <button
                type="button"
                onClick={() => setShowFileUpload(!showFileUpload)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                aria-expanded={showFileUpload}
                aria-controls="file-upload-section"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Add Conversation History</span>
                  <span className="text-xs text-muted-foreground">(Optional)</span>
                </div>
                {showFileUpload ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {showFileUpload && (
                <div id="file-upload-section" className="p-4 pt-0 border-t">
                  <p className="text-xs text-muted-foreground mb-3">
                    Upload documents for full conversation history or related context
                  </p>
                  <FileUpload onFilesChange={setUploadedFiles} maxFiles={3} disabled={isLoading} />
                </div>
              )}
            </Card>

            <Card className="overflow-hidden">
              <button
                type="button"
                onClick={() => setShowContextOptions(!showContextOptions)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                aria-expanded={showContextOptions}
                aria-controls="context-options"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Add Context for Better Results</span>
                  <span className="text-xs text-muted-foreground">(Optional)</span>
                </div>
                {showContextOptions ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {showContextOptions && (
                <div id="context-options" className="p-4 pt-0 border-t space-y-4">
                  {profileLoaded && (
                    <Card className="p-3 bg-primary/10 border-primary/30">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <p className="text-xs font-medium text-foreground">
                          Using your saved profile:
                          {communicationArchetype && <span className="text-primary"> {communicationArchetype}</span>}
                          {communicationArchetype &&
                            (receiverNeurotype !== "Unsure" || receiverGeneration !== "unsure") &&
                            " • "}
                          {receiverNeurotype !== "Unsure" && `${receiverNeurotype}`}
                          {receiverNeurotype !== "Unsure" && receiverGeneration !== "unsure" && " • "}
                          {receiverGeneration !== "unsure" && `${receiverGeneration}`}
                        </p>
                        <a href="/account/profile" className="ml-auto text-xs text-primary hover:underline">
                          Edit Profile
                        </a>
                      </div>
                    </Card>
                  )}

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">How this helps:</strong>{" "}
                      {communicationMode === "personal"
                        ? "We'll automatically detect their communication style from the message. Adding context about you and them helps us provide more accurate interpretation that accounts for neurotype, generational differences, and relationship dynamics."
                        : "We'll automatically detect their communication style from the message. Adding political identity context helps us navigate moral foundations, values differences, and find common ground for constructive dialogue."}
                    </p>
                  </div>

                  {communicationMode === "political" ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* About Them (Sender) */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm pb-2 border-b">About Them (Sender)</h4>
                        <PoliticalIdentitySelector
                          label="Their Political Identity"
                          value={senderPolitical}
                          onChange={setSenderPolitical}
                          disabled={isLoading}
                          tooltip="Their general political orientation. This helps us understand their values and communication patterns."
                        />
                        {senderPolitical !== "unsure" && (
                          <PoliticalValuesSelector
                            label="Their Communication Values"
                            selectedValues={senderPoliticalValues}
                            onChange={setSenderPoliticalValues}
                            disabled={isLoading}
                          />
                        )}
                      </div>

                      {/* About You (Receiver) */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm pb-2 border-b">About You (Receiver)</h4>
                        <PoliticalIdentitySelector
                          label="Your Political Identity"
                          value={receiverPolitical}
                          onChange={setReceiverPolitical}
                          disabled={isLoading}
                          tooltip="Your general political orientation. This helps us frame the analysis in terms you'll understand and suggest bridge-building responses."
                        />
                        {receiverPolitical !== "unsure" && (
                          <PoliticalValuesSelector
                            label="Your Communication Values"
                            selectedValues={receiverPoliticalValues}
                            onChange={setReceiverPoliticalValues}
                            disabled={isLoading}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* About Them (Sender) */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm pb-2 border-b">About Them (Sender)</h4>
                        <div>
                          <RelationshipSelector
                            label="Your Relationship"
                            value={senderRelationship}
                            onChange={setSenderRelationship}
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-medium mb-2 flex items-center gap-1">
                            Their Neurotype
                            <InfoTooltip content="If you know how they communicate, we can interpret their message more accurately. Autistic people tend to be literal and direct." />
                          </Label>
                          <RadioPillGroup
                            name="sender-nt"
                            value={senderNeurotype}
                            onChange={setSenderNeurotype}
                            options={neurotypes}
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-medium mb-2 flex items-center gap-1">
                            Their Generation
                            <InfoTooltip content="Boomer (1946-1964), Gen X (1965-1980), Xennial (1977-1983), Millennial (1981-1996), Gen Z (1997-2012), Gen Alpha (2013+)" />
                          </Label>
                          <RadioPillGroup
                            name="sender-gen"
                            value={senderGeneration}
                            onChange={setSenderGeneration}
                            options={generations}
                          />
                        </div>
                      </div>

                      {/* About You (Receiver) */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm pb-2 border-b flex items-center gap-2">
                          About You (Receiver)
                          {profileLoaded && (receiverNeurotype !== "Unsure" || receiverGeneration !== "unsure") && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-normal">
                              From your profile
                            </span>
                          )}
                        </h4>
                        <div>
                          <Label className="text-xs font-medium mb-2 flex items-center gap-1">
                            Your Neurotype
                            <InfoTooltip content="How your brain processes communication. Helps us explain the message in a way that makes sense to you." />
                          </Label>
                          <RadioPillGroup
                            name="receiver-nt"
                            value={receiverNeurotype}
                            onChange={setReceiverNeurotype}
                            options={neurotypes}
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-medium mb-2 flex items-center gap-1">
                            Your Generation
                            <InfoTooltip content="Your generational background helps us frame the analysis in terms you'll understand." />
                          </Label>
                          <RadioPillGroup
                            name="receiver-gen"
                            value={receiverGeneration}
                            onChange={setReceiverGeneration}
                            options={generations}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>

            <div className="flex justify-center">
              <Button type="submit" size="lg" disabled={isLoading || !message || !interpretation} className="px-12">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Analyze This Message
                  </span>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card className="mt-6 p-8 text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-sm text-muted-foreground">{loadingMessage}</p>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="mt-6 p-4 bg-destructive/10 border-destructive">
            <p className="text-destructive text-center text-sm">{error}</p>
          </Card>
        )}

        {/* Results - Unchanged */}
        {aiResponse && !isLoading && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={handleSaveTranslation}
                disabled={isSaving}
                variant={saveSuccess ? "default" : "outline"}
                size="sm"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Saving...
                  </span>
                ) : saveSuccess ? (
                  "Saved!"
                ) : (
                  "Save Translation"
                )}
              </Button>
            </div>

            <AnalysisInfoCard
              detectedStyle={aiResponse.detectedStyle || "auto-detected from their message"}
              yourNeurotype={receiverNeurotype}
              theirNeurotype={senderNeurotype}
              yourGeneration={receiverGeneration}
              theirGeneration={senderGeneration}
              relationship={senderRelationship}
              mode="analyze"
            />

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
