"use client"

import { useEffect } from "react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Gamepad2, Users, Heart, Sparkles } from "lucide-react"

export default function GamesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#007B8C] to-[#005A68] dark:from-[#006270] dark:to-[#004A56] text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Gamepad2 className="w-10 h-10" aria-hidden="true" />
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">Hearthside Games</h1>
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-white/90">
                Games and entertainment experiences that bring people together, foster meaningful connections, and help
                us understand each other through play.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6 text-center">
                Connection Through Play
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-center mb-12">
                At Hearthside Games, we believe that play is a powerful tool for building understanding and empathy. Our
                games are designed to create spaces where people can connect authentically, learn about different
                perspectives, and grow together.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#007B8C]/10 dark:bg-[#007B8C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#007B8C] dark:text-[#4DB8C9]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Build Community
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Games that bring people together and create lasting bonds
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E28A6D]/10 dark:bg-[#E28A6D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-[#E28A6D]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Foster Empathy
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Experience different perspectives and build understanding
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFC72C]/10 dark:bg-[#FFC72C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-[#FFC72C]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Inspire Growth
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Learn and develop through engaging gameplay
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Game Section */}
        <section className="py-16 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-12 text-center">
              Our Games
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-[#1F2937] rounded-xl overflow-hidden shadow-lg border border-[#E5E7EB] dark:border-[#374151]">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src="/project-cohesion-elegant-text.jpg"
                      alt="Project Cohesion - Text-based identity-driven game"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                      Project Cohesion
                    </h3>
                    <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-6">
                      A text-based identity-driven game where your choices truly matter. Navigate a fragmented reality
                      using natural language and over 200 verbs that map to nearly 30 core intents. Every decision
                      shapes who you become in a world that remembers and reacts to your true self.
                    </p>
                    <Button asChild className="bg-[#007B8C] hover:bg-[#006270] text-white">
                      <Link href="/games/project-cohesion">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4">
                  More games coming soon! We're constantly developing new experiences to help people connect and grow.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
