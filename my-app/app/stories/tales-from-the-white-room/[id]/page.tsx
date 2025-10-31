"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Sparkles, Users, Eye, Calendar } from "lucide-react"
import Link from "next/link"

interface Story {
  id: string
  title: string
  content: string
  imageUrl: string
  type: "ai-generated" | "player-submitted"
  metadata: {
    characterName?: string
    playthrough?: number
    outcome?: string
    keyChoices?: string[]
  }
  publishedAt: { seconds: number }
  views: number
  submittedBy?: {
    name: string
  }
}

export default function StoryPage() {
  const params = useParams()
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStory()
  }, [params.id])

  const fetchStory = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/stories/${params.id}`)
      const data = await response.json()

      if (data.success) {
        setStory(data.story)
      }
    } catch (error) {
      console.error("Error fetching story:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-slate-400 text-lg">Loading story...</div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-400 text-lg mb-4">Story not found</div>
          <Link href="/stories/tales-from-the-white-room">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Stories
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const publishedDate = new Date(story.publishedAt.seconds * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <main>
        {/* Header */}
        <section className="py-8 bg-slate-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/stories/tales-from-the-white-room">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tales from the White Room
              </Button>
            </Link>
          </div>
        </section>

        {/* Story Content */}
        <article className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Cover Image */}
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                <img
                  src={story.imageUrl || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge
                  variant="outline"
                  className={
                    story.type === "ai-generated"
                      ? "border-purple-500/50 text-purple-300"
                      : "border-blue-500/50 text-blue-300"
                  }
                >
                  {story.type === "ai-generated" ? (
                    <>
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI-Generated
                    </>
                  ) : (
                    <>
                      <Users className="w-3 h-3 mr-1" />
                      Player Story
                    </>
                  )}
                </Badge>
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <Eye className="w-4 h-4" />
                  {story.views} views
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  {publishedDate}
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-balance">{story.title}</h1>

              {/* Story Metadata Card */}
              {(story.metadata?.characterName || story.submittedBy) && (
                <Card className="bg-slate-800/50 border-slate-700 mb-8">
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      {story.metadata?.characterName && (
                        <div>
                          <div className="text-slate-400 mb-1">Character</div>
                          <div className="text-white font-medium">{story.metadata.characterName}</div>
                        </div>
                      )}
                      {story.metadata?.playthrough && (
                        <div>
                          <div className="text-slate-400 mb-1">Playthrough</div>
                          <div className="text-white font-medium">#{story.metadata.playthrough}</div>
                        </div>
                      )}
                      {story.metadata?.outcome && (
                        <div>
                          <div className="text-slate-400 mb-1">Outcome</div>
                          <div className="text-white font-medium">{story.metadata.outcome}</div>
                        </div>
                      )}
                      {story.submittedBy && (
                        <div>
                          <div className="text-slate-400 mb-1">Submitted By</div>
                          <div className="text-white font-medium">{story.submittedBy.name}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Story Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="text-slate-200 leading-relaxed whitespace-pre-wrap">{story.content}</div>
              </div>

              {/* Key Choices */}
              {story.metadata?.keyChoices && story.metadata.keyChoices.length > 0 && (
                <Card className="bg-slate-800/50 border-slate-700 mt-8">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-white mb-4">Key Choices Made</h3>
                    <ul className="space-y-2">
                      {story.metadata.keyChoices.map((choice, index) => (
                        <li key={index} className="text-slate-300 flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>{choice}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* CTA */}
              <div className="mt-12 pt-8 border-t border-slate-700 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Share Your Story</h3>
                <p className="text-slate-300 mb-6">
                  Have your own tale from Project: Cohesion? Submit it for a chance to be featured!
                </p>
                <Link href="/stories/tales-from-the-white-room/submit">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Submit Your Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
