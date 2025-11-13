"use client"

import { useEffect } from "react"
import { Footer } from "@/components/footer"
import { Gamepad2, BookOpen, Heart, Users } from "lucide-react"

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#007B8C] to-[#005A68] dark:from-[#006270] dark:to-[#004A56] text-white py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">About Hearthside Works</h1>
              <p className="text-base md:text-lg leading-relaxed text-white/90">
                We create a community of belonging—a "Kith" (one's friends, family, and community)—where every
                individual is actively supported to flourish through connection and understanding.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-10 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-4 text-center">
                Our Purpose
              </h2>
              <p className="text-base text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-6 text-center">
                Hearthside Works is a human development company that uses technology to create a safe, warm space (the
                "Hearthside") for mutual understanding. We are built on the belief that emotional safety and
                professional success are inseparable.
              </p>
              <div className="bg-[#E28A6D]/10 dark:bg-[#E28A6D]/20 border-l-4 border-[#E28A6D] p-5 rounded-r-lg">
                <p className="font-serif text-xl text-[#1F2937] dark:text-[#F9FAFB] font-semibold mb-2">
                  Hear Me, See Me, Know Me
                </p>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-sm">
                  Our motto defines the three ascending levels of connection we aim to facilitate—from clarity in
                  communication, to recognition of unique styles, to authentic belonging and trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-10 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6 text-center">
                Our Founder
              </h2>
              <div className="bg-white dark:bg-[#1F2937] rounded-xl p-8 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0 shadow-lg">
                    <img
                      src="/images/1758627371170-20-281-29.jpg"
                      alt="Sol Roberts-Lieb, Founder & CEO of Hearthside Works"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                      Sol Roberts-Lieb, Founder & CEO
                    </h3>
                    <div className="space-y-3 text-[#6B7280] dark:text-[#9CA3AF] text-sm leading-relaxed">
                      <p>
                        With extensive experience spanning education, technology, and leadership, Sol Roberts-Lieb
                        founded Hearthside Works to address a fundamental challenge: helping people genuinely connect
                        and understand one another in an increasingly complex world.
                      </p>
                      <p>
                        Drawing from years of working with diverse teams and communities, he recognized that emotional
                        safety and effective communication are not just nice-to-haves—they're essential for both
                        personal flourishing and professional success.
                      </p>
                      <p>
                        This insight led to the creation of Clarity Coach, Hearthside Works' flagship SaaS product,
                        which combines research-backed frameworks from linguistics, moral psychology, and neurodiversity
                        studies with modern AI technology to help people bridge communication gaps and build authentic
                        connections.
                      </p>
                      <div className="pt-2">
                        <a
                          href="https://www.linkedin.com/in/sdlieb/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#007B8C] hover:text-[#005A68] dark:text-[#4DB8C9] dark:hover:text-[#007B8C] font-medium"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          Connect on LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divisions Section */}
        <section className="py-10 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-8 text-center">
              Our Divisions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Hearthside Games */}
              <div className="bg-white dark:bg-[#1F2937] rounded-xl p-8 shadow-sm border border-[#E5E7EB] dark:border-[#374151] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#007B8C]/10 dark:bg-[#007B8C]/20 rounded-lg flex items-center justify-center mb-4">
                  <Gamepad2 className="w-6 h-6 text-[#007B8C] dark:text-[#4DB8C9]" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-3">
                  Hearthside Games
                </h3>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  Our games and entertainment arm creates engaging experiences that bring people together and foster
                  meaningful connections through play.
                </p>
              </div>

              {/* Hearthside Stories */}
              <div className="bg-white dark:bg-[#1F2937] rounded-xl p-8 shadow-sm border border-[#E5E7EB] dark:border-[#374151] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#E28A6D]/10 dark:bg-[#E28A6D]/20 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-[#E28A6D]" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-3">
                  Hearthside Stories
                </h3>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  Books, stories, and publications that explore the human experience and help us understand ourselves
                  and each other more deeply.
                </p>
              </div>

              {/* Hearthside Care */}
              <div className="bg-white dark:bg-[#1F2937] rounded-xl p-8 shadow-sm border border-[#E5E7EB] dark:border-[#374151] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#FFC72C]/10 dark:bg-[#FFC72C]/20 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-[#FFC72C]" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-3">
                  Hearthside Care
                </h3>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  Community support programs, including our Elder Program, where community members help support others
                  in their journey to flourish.
                </p>
              </div>

              {/* Hearthside Cultivates */}
              <div className="bg-white dark:bg-[#1F2937] rounded-xl p-8 shadow-sm border border-[#E5E7EB] dark:border-[#374151] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#007B8C]/10 dark:bg-[#007B8C]/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#007B8C] dark:text-[#4DB8C9]" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-3">
                  Hearthside Cultivates
                </h3>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  Professional development and consulting services that help organizations build cultures of
                  psychological safety and effective communication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Economic Model Section */}
        <section className="py-10 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-4 text-center">
                Purpose Over Profit
              </h2>
              <p className="text-base text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-6 text-center">
                Our business model aligns commerce with compassion, ensuring that financial success directly supports
                our social mission.
              </p>
              <div className="space-y-4">
                <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-lg p-6 border border-[#E5E7EB] dark:border-[#374151]">
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Free Tier: Universal Access
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Everyone deserves to be heard. We provide core tools to solve immediate communication challenges at
                    no cost.
                  </p>
                </div>
                <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-lg p-6 border border-[#E5E7EB] dark:border-[#374151]">
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Premium Tier: Personal Growth
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Invest in your flourishing with advanced tools for proactive skill-building and deep
                    personalization.
                  </p>
                </div>
                <div className="bg-[#FFC72C]/10 dark:bg-[#FFC72C]/20 rounded-lg p-6 border-2 border-[#FFC72C]">
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Elder Tier: Community Support
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Be the reason someone else can flourish. Includes all premium features and sponsors a membership for
                    a user in need, directly supporting our mission of universal access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
