"use client"

import { useState, useEffect } from "react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Sparkles, Users, Eye } from "lucide-react"
import Link from "next/link"
import { EmptyState } from "@/components/empty-state"
import { LoadingState } from "@/components/loading-state"

interface Story {
  id: string
  title: string
  excerpt: string
  imageUrl: string
  type: "ai-generated" | "player-submitted"
  metadata: {
    characterName?: string
    outcome?: string
  }
  publishedAt: { seconds: number }
  views: number
}

export default function TalesFromTheWhiteRoomPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "ai-generated" | "player-submitted">("all")

  useEffect(() => {
    fetchStories()
  }, [filter])

  const fetchStories = async () => {
    setLoading(true)
    try {
      const url = filter === "all" ? "/api/stories/list" : `/api/stories/list?type=${filter}`
      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setStories(data.stories)
      }
    } catch (error) {
      console.error("Error fetching stories:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <main>
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-slate-900/20" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">Hearthside Stories</Badge>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
                Tales from the White Room
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
                Stories born from the fragmenting reality of Project: Cohesion. Each tale captures a unique journey
                through identity, choice, and consequence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link href="/stories/tales-from-the-white-room/submit">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Submit Your Story
                  </Button>
                </Link>
                <Link href="/games/project-cohesion">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-600 text-slate-200 hover:bg-slate-800 bg-transparent"
                  >
                    Learn About Project: Cohesion
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">{stories.length}</div>
                  <div className="text-sm text-slate-400">Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">Free</div>
                  <div className="text-sm text-slate-400">To Read</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-400 mb-1">Open</div>
                  <div className="text-sm text-slate-400">Submissions</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 bg-slate-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={
                  filter === "all"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                }
              >
                All Stories
              </Button>
              <Button
                variant={filter === "ai-generated" ? "default" : "outline"}
                onClick={() => setFilter("ai-generated")}
                className={
                  filter === "ai-generated"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                }
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Generated
              </Button>
              <Button
                variant={filter === "player-submitted" ? "default" : "outline"}
                onClick={() => setFilter("player-submitted")}
                className={
                  filter === "player-submitted"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                }
              >
                <Users className="w-4 h-4 mr-2" />
                Player-Submitted
              </Button>
            </div>
          </div>
        </section>

        {/* Stories Grid */}
        <section className="py-12 bg-slate-900/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <LoadingState message="Loading stories from the White Room..." size="lg" />
            ) : stories.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title={
                  filter === "all"
                    ? "No Stories Yet"
                    : `No ${filter === "ai-generated" ? "AI-Generated" : "Player-Submitted"} Stories`
                }
                description={
                  filter === "all"
                    ? "Be the first to share your journey through the White Room. Your story could inspire others and help build our community."
                    : `No ${filter === "ai-generated" ? "AI-generated" : "player-submitted"} stories are available yet. Try another category or submit your own tale.`
                }
                action={{
                  label: "Submit Your Story",
                  onClick: () => (window.location.href = "/stories/tales-from-the-white-room/submit"),
                }}
                secondaryAction={
                  filter !== "all"
                    ? {
                        label: "View All Stories",
                        onClick: () => setFilter("all"),
                      }
                    : {
                        label: "Learn About Project: Cohesion",
                        onClick: () => (window.location.href = "/games/project-cohesion"),
                      }
                }
              />
            ) : (
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {stories.map((story) => (
                  <Link key={story.id} href={`/stories/tales-from-the-white-room/${story.id}`}>
                    <Card className="group bg-slate-800/50 border-slate-700 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 h-full cursor-pointer overflow-hidden">
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={story.imageUrl || "/placeholder.svg"}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <Badge
                            className={
                              story.type === "ai-generated"
                                ? "bg-purple-500/90 text-white border-0"
                                : "bg-blue-500/90 text-white border-0"
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
                        </div>
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                          <Eye className="w-3.5 h-3.5 text-slate-300" />
                          <span className="text-slate-200 text-sm font-medium">{story.views}</span>
                        </div>
                      </div>
                      <CardHeader className="space-y-3">
                        <CardTitle className="text-white text-2xl font-serif line-clamp-2 group-hover:text-purple-300 transition-colors">
                          {story.title}
                        </CardTitle>
                        {story.metadata?.characterName && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-500">Persona:</span>
                            <span className="text-purple-300 font-medium">{story.metadata.characterName}</span>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-300 leading-relaxed line-clamp-3">{story.excerpt}</p>
                        {story.metadata?.outcome && (
                          <div className="flex items-center gap-2 pt-2 border-t border-slate-700/50">
                            <span className="text-slate-500 text-sm">Outcome:</span>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {story.metadata.outcome}
                            </Badge>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-purple-400 text-sm font-medium group-hover:gap-3 transition-all">
                          <span>Read Story</span>
                          <BookOpen className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 bg-slate-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-white mb-4">What Are These Stories?</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Tales from the White Room are narratives generated from actual and simulated playthroughs of Project:
                Cohesion. Each story captures the unique choices, consequences, and identity evolution of a character
                navigating the fragmenting reality.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Whether AI-generated from simulation data or submitted by players themselves, these stories showcase the
                infinite possibilities within the world of Cohesion and help build a community of players sharing their
                experiences.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
