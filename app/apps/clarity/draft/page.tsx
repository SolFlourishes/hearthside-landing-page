"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Edit, Save, X, RefreshCw, ChevronDown, ChevronUp, Sparkles } from "lucide-react"
import { RadioPillGroup } from "./RadioPillGroup"
import { CopyButton } from "./CopyButton"
import { FeedbackWidget } from "./FeedbackWidget"
import { MarkdownRenderer } from "./MarkdownRenderer"
import { AudienceSelector } from "@/components/audience-selector"
import { AccessGate, type AccessTier } from "@/components/access-gate"
import { ReportButton } from "@/components/report-button"
import { getAccessTier, setAccessTier as storeAccessTier } from "@/lib/access-storage"
import { RelationshipSelector } from "@/components/relationship-selector"
import type { RelationshipContext } from "@/lib/communication-profiles"
import { AnalysisInfoCard } from "@/components/analysis-info-card"
import { InfoTooltip } from "@/components/info-tooltip"
import { CommunicationModeSelector, type CommunicationMode } from "@/components/communication-mode-selector"
import { PoliticalIdentitySelector } from "@/components/political-identity-selector"
import { PoliticalValuesSelector } from "@/components/political-values-selector"
import type { PoliticalIdentity } from "@/lib/political-profiles"
import { createBrowserClient } from "@supabase/ssr"
import { getCommunicationArchetype } from "@/lib/communication-profiles"

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
  policyDiscussion: {
    intent:
      "I want to discuss healthcare policy with my uncle who has different political views. I need to bridge our differences and find common ground.",
    draft: "Hey uncle, I've been thinking a lot about healthcare policy lately. I think we need to discuss it further.",
    senderStyle: "direct",
    receiverStyle: "indirect",
  },
}

export default function DraftModePage() {
  const [accessTier, setAccessTier] = useState<AccessTier | null>(null)
  const [intent, setIntent] = useState("")
  const [draft, setDraft] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [audience, setAudience] = useState("adult-to-adult")
  const [senderStyle, setSenderStyle] = useState("let-ai-decide")
  const [receiverStyle, setReceiverStyle] = useState("indirect")
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const [senderNeurotype, setSenderNeurotype] = useState("Unsure")
  const [receiverNeurotype, setReceiverNeurotype] = useState("Unsure")
  const [senderGeneration, setSenderGeneration] = useState("unsure")
  const [receiverGeneration, setReceiverGeneration] = useState("unsure")
  const [receiverRelationship, setReceiverRelationship] = useState<RelationshipContext>("colleague")
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
  const [showContextOptions, setShowContextOptions] = useState(false)
  const [communicationMode, setCommunicationMode] = useState<CommunicationMode>("personal")
  const [senderPolitical, setSenderPolitical] = useState<PoliticalIdentity>("unsure")
  const [receiverPolitical, setReceiverPolitical] = useState<PoliticalIdentity>("unsure")
  const [senderPoliticalValues, setSenderPoliticalValues] = useState<string[]>([])
  const [receiverPoliticalValues, setReceiverPoliticalValues] = useState<string[]>([])
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [communicationArchetype, setCommunicationArchetype] = useState<string | null>(null)

  const generations = ["Boomer", "Gen X", "Xennial", "Millennial", "Gen Z", "Gen Alpha", "unsure"]
  const neurotypes = ["Autism", "ADHD", "Neurotypical", "Unsure"]
  const politicalIdentities = ["Liberal", "Conservative", "Moderate", "Independent", "unsure"]

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const example = params.get("example") as keyof typeof EXAMPLE_SCENARIOS
    if (example && EXAMPLE_SCENARIOS[example]) {
      const scenario = EXAMPLE_SCENARIOS[example]
      setIntent(scenario.intent)
      setDraft(scenario.draft)
      setSenderStyle(scenario.senderStyle)
      setReceiverStyle(scenario.receiverStyle)
      if (example === "policyDiscussion") {
        setCommunicationMode("political")
      } else {
        setCommunicationMode("personal")
      }
    }
  }, [])

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
            // Auto-populate sender fields from profile
            if (profile.neurotype) setSenderNeurotype(profile.neurotype)
            if (profile.generation) setSenderGeneration(profile.generation)

            // Parse communication style if available
            if (profile.communication_style) {
              const style = profile.communication_style
              // The quiz stores detailed scores, but we can infer preferences
              console.log("[v0] Loaded communication profile:", style)
              const archetype = getCommunicationArchetype(profile.communication_style)
              setCommunicationArchetype(archetype)
              console.log("[v0] Loaded communication archetype:", archetype)
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
      const requestBody = {
        mode: "draft",
        text: draft,
        context: intent,
        communicationMode,
        ...(communicationMode === "personal"
          ? {
              senderNeurotype,
              receiverNeurotype,
              senderGeneration,
              receiverGeneration,
              receiverRelationship,
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

      if (!transRes.ok) throw new Error("An error occurred during translation.")
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
        ...(communicationMode === "personal"
          ? {
              senderNeurotype,
              receiverNeurotype,
              senderGeneration,
              receiverGeneration,
            }
          : {
              senderPolitical,
              receiverPolitical,
              senderPoliticalValues,
              receiverPoliticalValues,
            }),
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
    setAudience("adult-to-adult")
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
    setReceiverRelationship("colleague")
    setIsEditing(false)
    setEditedResponse("")
    setEditSaveSuccess(false)
    setIsReanalyzing(false)
    setReanalysisResult(null)
    setFeedbackDocId(null)
    setCommunicationMode("personal")
    setSenderPolitical("unsure")
    setReceiverPolitical("unsure")
    setSenderPoliticalValues([])
    setReceiverPoliticalValues([])
    setCommunicationArchetype(null)
  }

  const handleAccessGranted = (tier: AccessTier) => {
    storeAccessTier(tier)
    setAccessTier(tier)
  }

  if (!accessTier) {
    return <AccessGate mode="draft" onAccessGranted={handleAccessGranted} />
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Draft a Message</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-2">
            Transform your thoughts into clear, effective communication. Enter your goal and draft, then we'll help you
            refine it based on how your audience might interpret it.
          </p>
          <a
            href="/apps/clarity/how-to-use"
            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
          >
            Learn how to get the best results →
          </a>
        </div>

        {!aiResponse && (
          <Card className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Try an example:
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
                      if (key === "policyDiscussion") {
                        setCommunicationMode("political")
                      } else {
                        setCommunicationMode("personal")
                      }
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
          <form onSubmit={handleTranslate} className="space-y-6">
            <Card className="p-6 border-2 border-primary/20">
              <div className="space-y-5">
                <div className="pb-4 border-b">
                  <CommunicationModeSelector
                    value={communicationMode}
                    onChange={setCommunicationMode}
                    disabled={isLoading}
                  />
                </div>

                <div className="pb-4 border-b">
                  <AudienceSelector value={audience} onChange={setAudience} disabled={isLoading} />
                </div>

                <div>
                  <Label htmlFor="intent" className="text-base font-semibold mb-2 block">
                    What do you want to achieve? <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="intent"
                    value={intent}
                    onChange={(e) => setIntent(e.target.value)}
                    placeholder={
                      communicationMode === "personal"
                        ? "Example: I want to ask for a promotion because I've exceeded my goals for 3 years..."
                        : "Example: I want to discuss healthcare policy with my uncle who has different political views..."
                    }
                    required
                    className="min-h-[100px] text-base"
                    aria-required="true"
                  />
                </div>

                <div>
                  <Label htmlFor="draft" className="text-base font-semibold mb-2 block">
                    What are you thinking of saying? <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="draft"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={
                      communicationMode === "personal"
                        ? "Example: Hey boss, I think I deserve a promotion..."
                        : "Example: I think we need universal healthcare because people are suffering..."
                    }
                    required
                    className="min-h-[120px] text-base"
                    aria-required="true"
                  />
                </div>
              </div>
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
                            (senderNeurotype !== "Unsure" || senderGeneration !== "unsure") &&
                            " • "}
                          {senderNeurotype !== "Unsure" && `${senderNeurotype}`}
                          {senderNeurotype !== "Unsure" && senderGeneration !== "unsure" && " • "}
                          {senderGeneration !== "unsure" && `${senderGeneration}`}
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
                        ? "We'll automatically detect your communication style from your message. Adding context about you and your audience helps us provide more specific, tailored guidance that accounts for neurotype, generational differences, and relationship dynamics."
                        : "We'll automatically detect your communication style from your message. Adding political identity context helps us navigate moral foundations, values differences, and bridge-building strategies for cross-partisan dialogue."}
                    </p>
                  </div>

                  {communicationMode === "personal" ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm pb-2 border-b flex items-center gap-2">
                          About You
                          {profileLoaded && (senderNeurotype !== "Unsure" || senderGeneration !== "unsure") && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-normal">
                              From your profile
                            </span>
                          )}
                        </h4>
                        <div>
                          <Label className="text-xs font-medium mb-2 flex items-center gap-1">
                            Your Neurotype
                            <InfoTooltip content="How your brain processes communication. Autism: prefers literal, direct language. ADHD: may provide extra context. Neurotypical: comfortable with social hints." />
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
                            Your Generation
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

                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm pb-2 border-b">About Your Audience</h4>
                        <div>
                          <RelationshipSelector
                            label="Your Relationship"
                            value={receiverRelationship}
                            onChange={setReceiverRelationship}
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-medium mb-2 flex items-center gap-1">
                            Their Neurotype
                            <InfoTooltip content="If you know how they communicate, we can adapt your message. Autistic people prefer direct language without implied meanings." />
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
                            Their Generation
                            <InfoTooltip content="Different generations expect different formality levels. Boomers prefer context, Gen Z values brevity and authenticity." />
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
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm pb-2 border-b">About You</h4>
                        <PoliticalIdentitySelector
                          label="Your Political Identity"
                          value={senderPolitical}
                          onChange={setSenderPolitical}
                          disabled={isLoading}
                          tooltip="Your general political orientation. This helps us understand your moral foundations and communication patterns."
                        />
                        {senderPolitical !== "unsure" && (
                          <PoliticalValuesSelector
                            label="Your Communication Values"
                            selectedValues={senderPoliticalValues}
                            onChange={setSenderPoliticalValues}
                            disabled={isLoading}
                          />
                        )}
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm pb-2 border-b">About Your Audience</h4>
                        <PoliticalIdentitySelector
                          label="Their Political Identity"
                          value={receiverPolitical}
                          onChange={setReceiverPolitical}
                          disabled={isLoading}
                          tooltip="Their general political orientation. This helps us identify bridge-building strategies and shared values."
                        />
                        {receiverPolitical !== "unsure" && (
                          <PoliticalValuesSelector
                            label="Their Communication Values"
                            selectedValues={receiverPoliticalValues}
                            onChange={setReceiverPoliticalValues}
                            disabled={isLoading}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>

            <div className="flex justify-center">
              <Button type="submit" size="lg" disabled={isLoading || !intent || !draft} className="px-12">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Translating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Translate My Message
                  </span>
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
            <Card className="p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">Your Original Draft</h3>
              <div className="p-3 bg-white dark:bg-gray-900 rounded border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-foreground whitespace-pre-wrap">{draft}</p>
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">
                Compare this with the translation below to see how your message was refined for clarity.
              </p>
            </Card>

            <AnalysisInfoCard
              detectedStyle={aiResponse.detectedStyle || "auto-detected from your message"}
              yourNeurotype={senderNeurotype}
              theirNeurotype={receiverNeurotype}
              yourGeneration={senderGeneration}
              theirGeneration={receiverGeneration}
              relationship={receiverRelationship}
              yourPolitical={senderPolitical}
              theirPolitical={receiverPolitical}
              mode="draft"
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
                <div className="text-sm text-amber-900 dark:text-amber-100">
                  <MarkdownRenderer content={aiResponse.attachmentGuidance} />
                </div>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 relative">
                <ReportButton content={aiResponse.explanation} mode="draft" type="explanation" />
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
                <ReportButton content={isEditing ? editedResponse : aiResponse.response} mode="draft" type="response" />
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
          </div>
        )}
      </div>
    </main>
  )
}
