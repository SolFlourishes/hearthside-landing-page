"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

interface FeedbackWidgetProps {
  rating: number
  comment: string
  onRatingChange: (rating: number) => void
  onCommentChange: (comment: string) => void
  onSubmit: () => void
  isSuccess: boolean
}

export function FeedbackWidget({
  rating,
  comment,
  onRatingChange,
  onCommentChange,
  onSubmit,
  isSuccess,
}: FeedbackWidgetProps) {
  return (
    <div className="mt-4 pt-4 border-t">
      <p className="text-xs font-medium mb-2">Rate this:</p>
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => onRatingChange(star)} className="focus:outline-none">
            <Star className={`w-5 h-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
      <Textarea
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
        placeholder="Optional: Tell us more..."
        className="text-xs min-h-[60px] mb-2"
      />
      <Button onClick={onSubmit} size="sm" disabled={rating === 0 || isSuccess}>
        {isSuccess ? "Feedback Submitted!" : "Submit Feedback"}
      </Button>
    </div>
  )
}
