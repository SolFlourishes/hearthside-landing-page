"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ArrowRight, ArrowLeft, Heart, Users, Lightbulb, MessageCircle, Compass } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

interface TutorialStep {
  title: string
  content: string
  icon: React.ReactNode
  action?: {
    label: string
    href: string
  }
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to Clarity Coach",
    content:
      "This isn't just a translation tool—it's a bridge for human connection. We believe that behind every miscommunication is an opportunity to truly see and understand another person. Let's explore how Clarity Coach helps you build those bridges.",
    icon: <Heart className="h-8 w-8 text-primary" />,
  },
  {
    title: "It Starts With Understanding Yourself",
    content:
      "Before we can connect across differences, we need to understand our own communication style. The Communication Quiz helps you discover your natural patterns—not to label you, but to give you insight into how you express yourself and what you value in communication.",
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    action: {
      label: "Take the Quiz",
      href: "/account/communication-quiz",
    },
  },
  {
    title: "Then We Build Bridges to Others",
    content:
      "Every person has their own communication style shaped by neurotype, generation, culture, and life experience. Clarity Coach helps you understand how your message might land with someone different from you—not to change who you are, but to build a bridge of understanding.",
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    title: "Draft: Say What You Mean",
    content:
      "Have something important to say? Draft mode helps you express your authentic thoughts in a way that connects with your specific audience. It's about being heard—not just speaking, but truly being understood by the person you're trying to reach.",
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    action: {
      label: "Try Draft Mode",
      href: "/apps/clarity/draft",
    },
  },
  {
    title: "Analyze: Understand What They Mean",
    content:
      "Someone's message confused you? Analyze mode helps you see beyond the words to understand what they're really trying to communicate. It bridges the gap between different communication styles, helping you hear the person behind the message.",
    icon: <Compass className="h-8 w-8 text-primary" />,
    action: {
      label: "Try Analyze Mode",
      href: "/apps/clarity/analyze",
    },
  },
  {
    title: "PoliTalk: Understand Different Worldviews",
    content:
      "Sometimes the hardest gaps to bridge are political differences. PoliTalk Explorer doesn't just translate positions—it helps you understand the underlying values and moral frameworks that make someone's views feel true to them. It's about curiosity, not conversion.",
    icon: <Heart className="h-8 w-8 text-primary" />,
    action: {
      label: "Explore PoliTalk",
      href: "/apps/clarity/politalk-explorer",
    },
  },
  {
    title: "Remember: It's About Connection",
    content:
      "Clarity Coach is a tool, but you are the bridge-builder. Use these features not to win arguments or 'fix' how others communicate, but to create genuine understanding. The goal is always connection—seeing others clearly, being seen yourself, and knowing you're not alone.",
    icon: <Users className="h-8 w-8 text-primary" />,
  },
]

export function OnboardingTutorial({ userId }: { userId: string }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkTutorialStatus() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { data, error } = await supabase
        .from("user_profiles")
        .select("tutorial_completed")
        .eq("id", userId)
        .maybeSingle()

      if (!data && !error) {
        const { data: newProfile, error: createError } = await supabase
          .from("user_profiles")
          .insert({ id: userId, tutorial_completed: false })
          .select("tutorial_completed")
          .single()

        if (createError) {
          console.error("[v0] Error creating profile:", createError)
          setIsLoading(false)
          return
        }

        setIsVisible(true)
        setIsLoading(false)
        return
      }

      if (error) {
        console.error("[v0] Error fetching tutorial status:", error)
        setIsLoading(false)
        return
      }

      if (!data.tutorial_completed) {
        setIsVisible(true)
      }

      setIsLoading(false)
    }

    checkTutorialStatus()
  }, [userId])

  const handleComplete = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const { error } = await supabase.from("user_profiles").update({ tutorial_completed: true }).eq("id", userId)

    if (error) {
      console.error("[v0] Error updating tutorial status:", error)
    }

    setIsVisible(false)
  }

  const handleSkip = async () => {
    await handleComplete()
  }

  if (isLoading || !isVisible) return null

  const currentStepData = tutorialSteps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === tutorialSteps.length - 1

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl border-primary/20">
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              {currentStepData.icon}
              <div>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </p>
                <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSkip}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-lg leading-relaxed text-muted-foreground mb-8">{currentStepData.content}</p>

          {currentStepData.action && (
            <div className="mb-6">
              <Button asChild className="w-full sm:w-auto bg-transparent" variant="outline">
                <a href={currentStepData.action.href} target="_blank" rel="noopener noreferrer">
                  {currentStepData.action.label}
                </a>
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2 mb-6">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index === currentStep ? "bg-primary" : index < currentStep ? "bg-primary/50" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={handleSkip}>
              Skip Tutorial
            </Button>
            <div className="flex gap-2">
              {!isFirstStep && (
                <Button variant="outline" onClick={() => setCurrentStep((s) => s - 1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              {!isLastStep ? (
                <Button onClick={() => setCurrentStep((s) => s + 1)}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleComplete}>Get Started</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
