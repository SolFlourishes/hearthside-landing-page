"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Star, MessageSquare, X } from "lucide-react"

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: Replace with actual API call to your feedback service
    // Example: await fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ rating, feedback }) })

    console.log("[v0] Feedback submitted:", { rating, feedback })

    setSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setSubmitted(false)
      setRating(0)
      setFeedback("")
    }, 2000)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#007B8C] hover:bg-[#006270] text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-50"
        aria-label="Open feedback form"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] p-6 shadow-2xl z-50 bg-background">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold">Share Your Feedback</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close feedback form"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[#FFC72C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-[#FFC72C] fill-[#FFC72C]" />
          </div>
          <p className="font-semibold text-foreground mb-2">Thank you!</p>
          <p className="text-sm text-muted-foreground">Your feedback helps us improve.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">How would you rate your experience?</label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating) ? "text-[#FFC72C] fill-[#FFC72C]" : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="feedback-text" className="text-sm font-medium mb-2 block">
              Tell us more (optional)
            </label>
            <Textarea
              id="feedback-text"
              placeholder="What did you like? What could be better?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" disabled={rating === 0} className="w-full bg-[#007B8C] hover:bg-[#006270] text-white">
            Submit Feedback
          </Button>
        </form>
      )}
    </Card>
  )
}
