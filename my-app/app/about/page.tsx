import { Footer } from "@/components/footer"
import { Gamepad2, BookOpen, Heart, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#007B8C] to-[#005A68] dark:from-[#006270] dark:to-[#004A56] text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">About Hearthside Works</h1>
              <p className="text-lg md:text-xl leading-relaxed text-white/90">
                We create a community of belonging—a "Kith" (one's friends, family, and community)—where every
                individual is actively supported to flourish through connection and understanding.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6 text-center">
                Our Purpose
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-8 text-center">
                Hearthside Works is a human development company that uses technology to create a safe, warm space (the
                "Hearthside") for mutual understanding. We are built on the belief that emotional safety and
                professional success are inseparable.
              </p>
              <div className="bg-[#E28A6D]/10 dark:bg-[#E28A6D]/20 border-l-4 border-[#E28A6D] p-6 rounded-r-lg">
                <p className="font-serif text-2xl text-[#1F2937] dark:text-[#F9FAFB] font-semibold mb-2">
                  Hear Me, See Me, Know Me
                </p>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  Our motto defines the three ascending levels of connection we aim to facilitate—from clarity in
                  communication, to recognition of unique styles, to authentic belonging and trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divisions Section */}
        <section className="py-16 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-12 text-center">
              Our Divisions
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
        <section className="py-16 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6 text-center">
                Purpose Over Profit
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-8 text-center">
                Our business model aligns commerce with compassion, ensuring that financial success directly supports
                our social mission.
              </p>
              <div className="space-y-6">
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
