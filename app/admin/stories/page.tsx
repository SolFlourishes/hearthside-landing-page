"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, Eye, Clock } from "lucide-react"

interface Story {
  id: string
  title: string
  content: string
  excerpt: string
  type: "ai-generated" | "player-submitted"
  status: string
  submittedBy?: {
    name: string
    email: string
  }
  metadata: {
    characterName?: string
    outcome?: string
  }
  createdAt: { seconds: number }
}

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")
  const [reviewerName, setReviewerName] = useState("")
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetchPendingStories()
  }, [])

  const fetchPendingStories = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/stories/admin/pending")
      const data = await response.json()

      if (data.success) {
        setStories(data.stories)
      }
    } catch (error) {
      console.error("Error fetching pending stories:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReview = async (action: "approve" | "reject") => {
    if (!selectedStory || !reviewerName.trim()) {
      alert("Please enter your name as the reviewer")
      return
    }

    setProcessing(true)
    try {
      const response = await fetch("/api/stories/admin/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storyId: selectedStory.id,
          action,
          reviewNotes,
          reviewedBy: reviewerName,
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert(data.message)
        setSelectedStory(null)
        setReviewNotes("")
        fetchPendingStories()
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert("An error occurred while reviewing the story")
      console.error(error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Story Review Dashboard</h1>
          <p className="text-slate-400">Review and approve player-submitted stories</p>
        </div>

        {/* Reviewer Name Input */}
        <Card className="bg-slate-900 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-lg">Reviewer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-md">
              <Label htmlFor="reviewerName" className="text-white">
                Your Name
              </Label>
              <Input
                id="reviewerName"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Enter your name"
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending Stories List */}
          <div>
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Pending Stories ({stories.length})
                </CardTitle>
                <CardDescription className="text-slate-400">Click a story to review</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-slate-400 text-center py-8">Loading...</div>
                ) : stories.length === 0 ? (
                  <div className="text-slate-400 text-center py-8">No pending stories</div>
                ) : (
                  <div className="space-y-3">
                    {stories.map((story) => (
                      <Card
                        key={story.id}
                        className={`cursor-pointer transition-all ${
                          selectedStory?.id === story.id
                            ? "bg-purple-900/30 border-purple-500"
                            : "bg-slate-800 border-slate-700 hover:border-slate-600"
                        }`}
                        onClick={() => setSelectedStory(story)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-white text-base line-clamp-2">{story.title}</CardTitle>
                            <Badge variant="outline" className="border-blue-500/50 text-blue-300 shrink-0">
                              Player
                            </Badge>
                          </div>
                          {story.submittedBy && (
                            <CardDescription className="text-slate-400 text-sm">
                              By: {story.submittedBy.name}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-300 text-sm line-clamp-2">{story.excerpt}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Story Review Panel */}
          <div>
            <Card className="bg-slate-900 border-slate-700 sticky top-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Story Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedStory ? (
                  <div className="text-slate-400 text-center py-12">Select a story to review</div>
                ) : (
                  <div className="space-y-6">
                    {/* Story Details */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{selectedStory.title}</h3>
                      {selectedStory.submittedBy && (
                        <div className="text-sm text-slate-400 space-y-1 mb-4">
                          <div>
                            <span className="font-medium">Submitted by:</span> {selectedStory.submittedBy.name}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {selectedStory.submittedBy.email}
                          </div>
                          {selectedStory.metadata?.characterName && (
                            <div>
                              <span className="font-medium">Character:</span> {selectedStory.metadata.characterName}
                            </div>
                          )}
                          {selectedStory.metadata?.outcome && (
                            <div>
                              <span className="font-medium">Outcome:</span> {selectedStory.metadata.outcome}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Story Content */}
                    <div className="max-h-96 overflow-y-auto bg-slate-800 rounded-lg p-4">
                      <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">{selectedStory.content}</p>
                    </div>

                    {/* Review Notes */}
                    <div>
                      <Label htmlFor="reviewNotes" className="text-white">
                        Review Notes (Optional)
                      </Label>
                      <Textarea
                        id="reviewNotes"
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        placeholder="Add any notes about this review..."
                        rows={3}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleReview("approve")}
                        disabled={processing || !reviewerName.trim()}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve & Publish
                      </Button>
                      <Button
                        onClick={() => handleReview("reject")}
                        disabled={processing || !reviewerName.trim()}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>

                    {!reviewerName.trim() && (
                      <p className="text-sm text-amber-400 text-center">Please enter your name above to review</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
