import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Target, Users, TrendingUp } from "lucide-react"

export default function FoundationPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#007B8C] to-[#005A68] dark:from-[#006270] dark:to-[#004A56] text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-10 h-10" aria-hidden="true" />
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">Hearthside Foundation</h1>
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-white/90">
                Our non-profit arm dedicated to ensuring universal access to communication tools and building
                communities of belonging.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6 text-center">
                Our Mission
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-center mb-12">
                The Hearthside Foundation exists to ensure that financial barriers never prevent someone from accessing
                the tools they need to communicate effectively and flourish. We believe that everyone deserves to be
                heard, seen, and known.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#007B8C]/10 dark:bg-[#007B8C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-[#007B8C] dark:text-[#4DB8C9]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Universal Access
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Ensuring everyone can access communication tools regardless of financial situation
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFC72C]/10 dark:bg-[#FFC72C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#FFC72C]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Community Building
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Creating networks of mutual support and care
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E28A6D]/10 dark:bg-[#E28A6D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-[#E28A6D]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Human Flourishing
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Supporting individuals in their journey to thrive
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-16 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-12 text-center">
                Our Programs
              </h2>

              <div className="space-y-8">
                <div className="bg-white dark:bg-[#1F2937] rounded-xl p-8 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
                  <h3 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                    The Elder Program
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-6">
                    Our flagship initiative that connects community members who want to support others (Elders) with
                    those who need access to premium tools. Every Elder subscription sponsors a full premium membership
                    for someone in need.
                  </p>
                  <Button asChild className="bg-[#007B8C] hover:bg-[#006270] text-white">
                    <Link href="/elder-program">Learn More About the Elder Program</Link>
                  </Button>
                </div>

                <div className="bg-white dark:bg-[#1F2937] rounded-xl p-8 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
                  <h3 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                    Community Outreach
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    We partner with organizations, schools, and community groups to provide access to our tools and
                    training for underserved populations. Our goal is to reach those who would benefit most from better
                    communication resources.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#1F2937] rounded-xl p-8 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
                  <h3 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                    Research & Development
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    The Foundation supports ongoing research into communication differences, neurodiversity, and
                    effective strategies for building understanding. This research directly informs the development of
                    our tools and programs.
                  </p>
                </div>
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
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-center mb-8">
                The Foundation is funded through the Elder Program and ensures that Hearthside Works' financial success
                directly supports our social mission. This model aligns commerce with compassion, creating a sustainable
                path to universal access.
              </p>
              <div className="bg-[#FFC72C]/10 dark:bg-[#FFC72C]/20 border-l-4 border-[#FFC72C] p-6 rounded-r-lg">
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  <strong className="text-[#1F2937] dark:text-[#F9FAFB]">Our Commitment:</strong> For every Elder
                  subscription, we sponsor one full premium membership for someone in need. This 1:1 model ensures that
                  growth in our paying user base directly translates to expanded access for those who need support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6">
                Support Our Mission
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-8">
                Join us in creating a world where everyone has access to the tools they need to be heard, seen, and
                known.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#007B8C] hover:bg-[#006270] text-white">
                  <a href="http://clarity.hearthsideworks.com" target="_blank" rel="noopener noreferrer">
                    Become an Elder
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-[#007B8C] text-[#007B8C] hover:bg-[#007B8C]/10 bg-transparent"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
