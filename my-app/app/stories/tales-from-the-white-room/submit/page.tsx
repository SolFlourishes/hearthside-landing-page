"use client"

import type React from "react"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SubmitStoryPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    characterName: "",
    outcome: "",
    submitterName: "",
    submitterEmail: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/stories/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          submittedBy: {
            name: formData.submitterName,
            email: formData.submitterEmail,
          },
          metadata: {
            characterName: formData.characterName,
            outcome: formData.outcome,
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || "Failed to submit story")
      }
    } catch (err) {
      setError("An error occurred while submitting your story")
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <main className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
              <h1 className="font-serif text-4xl font-bold text-white mb-4">Story Submitted!</h1>
              <p className="text-lg text-slate-300 mb-8">
                Thank you for sharing your tale from the White Room. Our team will review your submission and, if
                selected, it will be published for the community to enjoy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/stories/tales-from-the-white-room">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Read Other Stories
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      title: "",
                      content: "",
                      characterName: "",
                      outcome: "",
                      submitterName: "",
                      submitterEmail: "",
                    })
                  }}
                  className="border-slate-600 text-slate-200 hover:bg-slate-800 bg-transparent"
                >
                  Submit Another Story
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

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

        {/* Form Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Submit Your Story</h1>
                <p className="text-lg text-slate-300">
                  Share your unique journey through Project: Cohesion with the community
                </p>
              </div>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Story Submission Guidelines</CardTitle>
                  <CardDescription className="text-slate-300">
                    <ul className="list-disc list-inside space-y-2 mt-2">
                      <li>Stories should be based on your actual playthrough of Project: Cohesion</li>
                      <li>Write in a narrative style (800-2000 words recommended)</li>
                      <li>Focus on your character's journey, choices, and their consequences</li>
                      <li>All submissions will be reviewed before publication</li>
                      <li>By submitting, you grant permission to publish your story</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Story Title */}
                    <div>
                      <Label htmlFor="title" className="text-white">
                        Story Title *
                      </Label>
                      <Input
                        id="title"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="A compelling title for your story"
                        className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                      />
                    </div>

                    {/* Story Content */}
                    <div>
                      <Label htmlFor="content" className="text-white">
                        Your Story *
                      </Label>
                      <Textarea
                        id="content"
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Write your story here... Share your character's journey, the choices you made, and how it all unfolded."
                        rows={15}
                        className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                      />
                      <p className="text-sm text-slate-400 mt-2">{formData.content.length} characters</p>
                    </div>

                    {/* Character Name */}
                    <div>
                      <Label htmlFor="characterName" className="text-white">
                        Character Name
                      </Label>
                      <Input
                        id="characterName"
                        value={formData.characterName}
                        onChange={(e) => setFormData({ ...formData, characterName: e.target.value })}
                        placeholder="Your character's name in the game"
                        className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                      />
                    </div>

                    {/* Outcome */}
                    <div>
                      <Label htmlFor="outcome" className="text-white">
                        Story Outcome
                      </Label>
                      <Input
                        id="outcome"
                        value={formData.outcome}
                        onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                        placeholder="How did your story end? (e.g., 'Achieved cohesion', 'Embraced fragmentation')"
                        className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                      />
                    </div>

                    {/* Submitter Info */}
                    <div className="pt-6 border-t border-slate-700">
                      <h3 className="text-lg font-semibold text-white mb-4">Your Information</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="submitterName" className="text-white">
                            Your Name *
                          </Label>
                          <Input
                            id="submitterName"
                            required
                            value={formData.submitterName}
                            onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
                            placeholder="How should we credit you?"
                            className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                          />
                        </div>

                        <div>
                          <Label htmlFor="submitterEmail" className="text-white">
                            Your Email *
                          </Label>
                          <Input
                            id="submitterEmail"
                            type="email"
                            required
                            value={formData.submitterEmail}
                            onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                            placeholder="We'll contact you if your story is selected"
                            className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                          />
                          <p className="text-sm text-slate-400 mt-1">Your email will not be published</p>
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                        <p className="text-red-300">{error}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {submitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Story
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
