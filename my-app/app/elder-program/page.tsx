import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Users, Gift, CheckCircle } from "lucide-react"

export default function ElderProgramPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#FFC72C] to-[#e6b028] text-[#1F2937] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-10 h-10" aria-hidden="true" />
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">The Elder Program</h1>
              </div>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Be the reason someone else can flourish. The Elder Program connects community members who want to
                support others with those who need access to our tools.
              </p>
              <p className="font-serif text-xl italic">Kith and Kin: We care for each other.</p>
            </div>
          </div>
        </section>

        {/* What is Elder Program Section */}
        <section className="py-16 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6 text-center">
                What is the Elder Program?
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-center mb-12">
                The Elder Program is our community-driven initiative that ensures everyone has access to the tools they
                need to communicate effectively and flourish. Elders sponsor premium subscriptions to the Clarity Coach
                for community members who need support, creating a network of mutual care and belonging.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-xl p-8 border border-[#E5E7EB] dark:border-[#374151]">
                  <div className="w-12 h-12 bg-[#FFC72C]/10 dark:bg-[#FFC72C]/20 rounded-lg flex items-center justify-center mb-4">
                    <Gift className="w-6 h-6 text-[#FFC72C]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-3">For Elders</h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4">
                    As an Elder, you receive all the benefits of our Premium tier while directly supporting someone in
                    need. Your contribution sponsors a full premium subscription for a community member.
                  </p>
                  <ul className="space-y-2 text-[#6B7280] dark:text-[#9CA3AF]">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#007B8C] dark:text-[#4DB8C9] flex-shrink-0 mt-0.5" />
                      <span>All Premium features included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#007B8C] dark:text-[#4DB8C9] flex-shrink-0 mt-0.5" />
                      <span>Sponsor one full premium subscription</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#007B8C] dark:text-[#4DB8C9] flex-shrink-0 mt-0.5" />
                      <span>Support the Hearthside Foundation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#007B8C] dark:text-[#4DB8C9] flex-shrink-0 mt-0.5" />
                      <span>Join a community of care</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-xl p-8 border border-[#E5E7EB] dark:border-[#374151]">
                  <div className="w-12 h-12 bg-[#007B8C]/10 dark:bg-[#007B8C]/20 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-[#007B8C] dark:text-[#4DB8C9]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-3">
                    For Recipients
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4">
                    If you need support accessing our premium tools, the Elder Program is here for you. Apply to receive
                    a sponsored subscription and gain full access to the Clarity Coach.
                  </p>
                  <ul className="space-y-2 text-[#6B7280] dark:text-[#9CA3AF]">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#007B8C] dark:text-[#4DB8C9] flex-shrink-0 mt-0.5" />
                      <span>Full Premium access at no cost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#007B8C] dark:text-[#4DB8C9] flex-shrink-0 mt-0.5" />
                      <span>All advanced features and tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#007B8C] dark:text-[#4DB8C9] flex-shrink-0 mt-0.5" />
                      <span>No judgment, just support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#007B8C] dark:text-[#4DB8C9] flex-shrink-0 mt-0.5" />
                      <span>Part of a caring community</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-12 text-center">
                How It Works
              </h2>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#007B8C] text-white rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                      Become an Elder
                    </h3>
                    <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                      Sign up for the Elder tier subscription. You'll get all Premium features while your contribution
                      sponsors someone in need.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#007B8C] text-white rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                      We Match Recipients
                    </h3>
                    <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                      The Hearthside Foundation manages applications from community members who need support and matches
                      them with Elder sponsorships.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#007B8C] text-white rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                      Everyone Flourishes
                    </h3>
                    <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                      Recipients gain full access to the Clarity Coach, Elders know they're making a difference, and our
                      community grows stronger together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-[#FFC72C]/20 to-[#FFC72C]/10 dark:from-[#FFC72C]/30 dark:to-[#FFC72C]/20 rounded-xl p-8 border-2 border-[#FFC72C] text-center">
                  <h3 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                    Become an Elder
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-6">
                    Support someone's journey to better communication while enjoying all Premium features.
                  </p>
                  <Button asChild size="lg" className="bg-[#007B8C] hover:bg-[#006270] text-white w-full">
                    <a href="http://clarity.hearthsideworks.com" target="_blank" rel="noopener noreferrer">
                      Join as an Elder
                    </a>
                  </Button>
                </div>

                <div className="bg-gradient-to-br from-[#007B8C]/20 to-[#007B8C]/10 dark:from-[#007B8C]/30 dark:to-[#007B8C]/20 rounded-xl p-8 border-2 border-[#007B8C] text-center">
                  <h3 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                    Apply for Support
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-6">
                    Need access to our premium tools? Apply to receive a sponsored subscription.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-[#007B8C] text-[#007B8C] hover:bg-[#007B8C]/10 w-full bg-transparent"
                  >
                    <Link href="/contact">Apply Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Foundation Section */}
        <section className="py-16 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6">
                Managed by Hearthside Foundation
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-8">
                The Elder Program is managed by the Hearthside Foundation, our non-profit arm dedicated to ensuring
                universal access to communication tools. All Elder contributions directly support the Foundation's
                mission.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-[#007B8C] text-[#007B8C] hover:bg-[#007B8C]/10 bg-transparent"
              >
                <Link href="/foundation">Learn More About the Foundation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
