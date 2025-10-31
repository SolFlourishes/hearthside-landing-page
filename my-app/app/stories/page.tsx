"use client"

import { useEffect } from "react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Pen, Heart, Sparkles, Gamepad2 } from "lucide-react"
import Link from "next/link"

export default function StoriesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#E28A6D] to-[#d67a5d] text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-10 h-10" aria-hidden="true" />
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">Hearthside Stories</h1>
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-white/90">
                Books, stories, and publications that explore the human experience and help us understand ourselves and
                each other more deeply.
              </p>
            </div>
          </div>
        </section>

        {/* Tales from the White Room featured section */}
        <section className="py-12 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-slate-800/50 border-purple-500/30 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video md:aspect-auto">
                  <img
                    src="/abstract-digital-fragmented-reality.jpg"
                    alt="Tales from the White Room"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <Gamepad2 className="w-6 h-6 text-purple-400" />
                    <span className="text-purple-300 font-semibold">New Category</span>
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-white mb-4">Tales from the White Room</h2>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Stories born from the fragmenting reality of Project: Cohesion. Each tale captures a unique journey
                    through identity, choice, and consequence. Read AI-generated narratives from simulations or submit
                    your own playthrough story.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/stories/tales-from-the-white-room">
                      <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                        Read Stories
                      </Button>
                    </Link>
                    <Link href="/stories/tales-from-the-white-room/submit">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-slate-600 text-slate-200 hover:bg-slate-800 bg-transparent"
                      >
                        Submit Your Story
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6 text-center">
                Stories That Connect Us
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-center mb-12">
                Through the power of storytelling, we explore themes of connection, belonging, and human flourishing.
                Our publications aim to create bridges of understanding and inspire meaningful conversations.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E28A6D]/10 dark:bg-[#E28A6D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Pen className="w-8 h-8 text-[#E28A6D]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Authentic Voices
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Stories that reflect real human experiences and emotions
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#007B8C]/10 dark:bg-[#007B8C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-[#007B8C] dark:text-[#4DB8C9]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Empathy Building
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Narratives that help us see through others' eyes
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFC72C]/10 dark:bg-[#FFC72C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-[#FFC72C]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">Inspiration</h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Tales that inspire growth and positive change
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-12 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6">
                More Coming Soon
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-8">
                We're currently developing additional publications. Our stories will explore themes of connection,
                communication, and the journey toward mutual understanding. Stay tuned for announcements!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
