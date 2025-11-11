"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface CommunicationQuizProps {
  existingResults: Record<string, unknown> | null
}

const questions = [
  {
    id: "formality",
    question: "How would you describe your typical communication style?",
    options: [
      { value: "very_formal", label: "Very formal - I use proper titles and complete sentences" },
      { value: "formal", label: "Somewhat formal - Professional but approachable" },
      { value: "neutral", label: "Balanced - Adapts to the situation" },
      { value: "casual", label: "Casual - Friendly and relaxed" },
      { value: "very_casual", label: "Very casual - Informal, uses slang" },
    ],
  },
  {
    id: "directness",
    question: "When giving feedback or making requests, I tend to:",
    options: [
      { value: "very_direct", label: "Be very direct and straightforward" },
      { value: "direct", label: "Be mostly direct with some context" },
      { value: "balanced", label: "Balance directness with politeness" },
      { value: "indirect", label: "Be indirect and hint at things" },
      { value: "very_indirect", label: "Be very indirect, using lots of softening language" },
    ],
  },
  {
    id: "detail_level",
    question: "When explaining something, I prefer to:",
    options: [
      { value: "minimal", label: "Give just the key points" },
      { value: "moderate", label: "Provide some context and examples" },
      { value: "detailed", label: "Give thorough explanations with background" },
      { value: "comprehensive", label: "Cover all angles and possibilities" },
    ],
  },
  {
    id: "emotional_expression",
    question: "In professional communication, I:",
    options: [
      { value: "reserved", label: "Keep emotions private and stay professional" },
      { value: "moderate", label: "Show some emotion when appropriate" },
      { value: "expressive", label: "Express emotions openly" },
      { value: "very_expressive", label: "Share feelings and personal experiences freely" },
    ],
  },
  {
    id: "conflict_style",
    question: "When there is a disagreement, I tend to:",
    options: [
      { value: "avoid", label: "Avoid confrontation and seek harmony" },
      { value: "accommodate", label: "Try to find middle ground" },
      { value: "collaborate", label: "Address it directly to find solutions" },
      { value: "compete", label: "Stand firm on my position" },
    ],
  },
]

export function CommunicationQuiz({ existingResults }: CommunicationQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>((existingResults as Record<string, string>) || {})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          communication_style: answers,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save quiz results")
      }

      router.push("/account/dashboard")
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1
  const canProceed = answers[question.id] !== undefined

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>

        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">{question.question}</h3>

        <RadioGroup value={answers[question.id] || ""} onValueChange={(value) => handleAnswer(question.id, value)}>
          {question.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex-1 bg-transparent"
        >
          Previous
        </Button>

        {isLastQuestion ? (
          <Button type="button" onClick={handleSubmit} disabled={!canProceed || isLoading} className="flex-1">
            {isLoading ? "Saving..." : "Complete Quiz"}
          </Button>
        ) : (
          <Button type="button" onClick={handleNext} disabled={!canProceed} className="flex-1">
            Next
          </Button>
        )}
      </div>
    </div>
  )
}
