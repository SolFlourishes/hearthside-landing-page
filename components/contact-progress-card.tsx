"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, MessageSquare } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

interface ContactProgressCardProps {
  contact: any
}

export function ContactProgressCard({ contact }: ContactProgressCardProps) {
  const [interactions, setInteractions] = useState<any[]>([])
  const [progress, setProgress] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProgress()
  }, [contact.id])

  async function loadProgress() {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { data, error } = await supabase
        .from("clarity_contact_interactions")
        .select("*")
        .eq("contact_id", contact.id)
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) throw error

      setInteractions(data || [])
      calculateProgress(data || [])
    } catch (error) {
      console.error("Error loading progress:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function calculateProgress(data: any[]) {
    if (data.length === 0) {
      setProgress(null)
      return
    }

    const recentInteractions = data.slice(0, 5)
    const olderInteractions = data.slice(5, 10)

    const avgRecent = {
      satisfaction: average(recentInteractions.map((i) => i.user_satisfaction_rating)),
      requiredEdit: recentInteractions.filter((i) => i.required_edit).length / recentInteractions.length,
      achievedGoal: recentInteractions.filter((i) => i.achieved_goal).length / recentInteractions.length,
    }

    const avgOlder = {
      satisfaction: average(olderInteractions.map((i) => i.user_satisfaction_rating)),
      requiredEdit: olderInteractions.filter((i) => i.required_edit).length / Math.max(olderInteractions.length, 1),
      achievedGoal: olderInteractions.filter((i) => i.achieved_goal).length / Math.max(olderInteractions.length, 1),
    }

    setProgress({
      satisfactionTrend: avgRecent.satisfaction - avgOlder.satisfaction,
      editTrend: avgOlder.requiredEdit - avgRecent.requiredEdit, // Lower is better
      goalTrend: avgRecent.achievedGoal - avgOlder.achievedGoal,
      totalInteractions: data.length,
    })
  }

  function average(arr: number[]) {
    const filtered = arr.filter((n) => n != null)
    return filtered.length > 0 ? filtered.reduce((a, b) => a + b, 0) / filtered.length : 0
  }

  function TrendIndicator({ value }: { value: number }) {
    if (Math.abs(value) < 0.1) return <Minus className="w-4 h-4 text-muted-foreground" />
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-500" />
    return <TrendingDown className="w-4 h-4 text-red-500" />
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">Loading progress...</p>
      </Card>
    )
  }

  if (!progress) {
    return (
      <Card className="p-6">
        <h3 className="font-semibold mb-2">Communication Progress</h3>
        <p className="text-sm text-muted-foreground">
          No interactions yet. Use Clarity Coach's Draft, Analyze, or Chat modes with this contact to track your
          progress.
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Communication Progress with {contact.name}</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <p className="text-sm font-medium">Total Interactions</p>
            <p className="text-2xl font-bold">{progress.totalInteractions}</p>
          </div>
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Communication Effectiveness</span>
            <div className="flex items-center gap-2">
              <TrendIndicator value={progress.goalTrend} />
              <span className="text-sm font-medium">{Math.abs(progress.goalTrend * 100).toFixed(0)}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Needing Less Assistance</span>
            <div className="flex items-center gap-2">
              <TrendIndicator value={progress.editTrend} />
              <span className="text-sm font-medium">{Math.abs(progress.editTrend * 100).toFixed(0)}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Your Confidence</span>
            <div className="flex items-center gap-2">
              <TrendIndicator value={progress.satisfactionTrend} />
              <span className="text-sm font-medium">
                {progress.satisfactionTrend > 0 ? "+" : ""}
                {progress.satisfactionTrend.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            {progress.editTrend > 0 && progress.goalTrend > 0
              ? "🎉 You're making great progress! You're communicating more effectively and need less help."
              : progress.totalInteractions < 5
                ? "Keep practicing! More interactions will give us better insights into your progress."
                : "You're learning how to communicate better with " + contact.name + ". Keep it up!"}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-semibold mb-2">Recent Interactions</h4>
        <div className="space-y-2">
          {interactions.slice(0, 3).map((interaction) => (
            <div key={interaction.id} className="text-xs p-2 bg-muted rounded">
              <div className="flex items-center justify-between">
                <span className="font-medium capitalize">{interaction.mode}</span>
                <span className="text-muted-foreground">{new Date(interaction.created_at).toLocaleDateString()}</span>
              </div>
              {interaction.context && <p className="text-muted-foreground mt-1 line-clamp-1">{interaction.context}</p>}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
