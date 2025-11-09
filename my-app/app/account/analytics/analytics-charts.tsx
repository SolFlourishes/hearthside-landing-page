"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { format } from "date-fns"

interface AnalyticsChartsProps {
  analytics: Array<{
    period_start: string
    draft_count: number
    analyze_count: number
    chat_count: number
    avg_rating: number | null
  }>
  history: Array<{
    created_at: string
    interaction_type: string
    rating: number | null
  }>
}

export function AnalyticsCharts({ analytics, history }: AnalyticsChartsProps) {
  // Prepare data for usage over time chart
  const usageData = analytics
    .slice(0, 14)
    .reverse()
    .map((item) => ({
      date: format(new Date(item.period_start), "MMM d"),
      Drafts: item.draft_count,
      Analyses: item.analyze_count,
      Chats: item.chat_count,
    }))

  // Prepare data for rating trend chart
  const ratingData = analytics
    .slice(0, 14)
    .reverse()
    .filter((item) => item.avg_rating !== null)
    .map((item) => ({
      date: format(new Date(item.period_start), "MMM d"),
      rating: item.avg_rating,
    }))

  // Calculate interaction type distribution
  const draftCount = history.filter((h) => h.interaction_type === "draft").length
  const analyzeCount = history.filter((h) => h.interaction_type === "analyze").length
  const chatCount = history.filter((h) => h.interaction_type === "chat").length
  const total = draftCount + analyzeCount + chatCount

  const distributionData = [
    { name: "Draft", value: draftCount, percentage: total > 0 ? ((draftCount / total) * 100).toFixed(1) : 0 },
    { name: "Analyze", value: analyzeCount, percentage: total > 0 ? ((analyzeCount / total) * 100).toFixed(1) : 0 },
    { name: "Chat", value: chatCount, percentage: total > 0 ? ((chatCount / total) * 100).toFixed(1) : 0 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Usage Over Time</CardTitle>
          <CardDescription>Your interaction history over the past 2 weeks</CardDescription>
        </CardHeader>
        <CardContent>
          {usageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Drafts" stroke="hsl(var(--chart-1))" />
                <Line type="monotone" dataKey="Analyses" stroke="hsl(var(--chart-2))" />
                <Line type="monotone" dataKey="Chats" stroke="hsl(var(--chart-3))" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground py-8">No data available yet</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rating Trend</CardTitle>
          <CardDescription>Your average rating over time</CardDescription>
        </CardHeader>
        <CardContent>
          {ratingData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rating" stroke="hsl(var(--chart-4))" name="Average Rating" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground py-8">No rating data available yet</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interaction Distribution</CardTitle>
          <CardDescription>How you use Clarity Coach</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            {distributionData.map((item) => (
              <div key={item.name}>
                <p className="text-2xl font-bold">{item.percentage}%</p>
                <p className="text-sm text-muted-foreground">{item.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
