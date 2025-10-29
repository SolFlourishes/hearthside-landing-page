import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Users, HandHeart, Shield } from "lucide-react"

export default function CarePage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#FFC72C] to-[#e6b028] text-[#1F2937] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-10 h-10" aria-hidden="true" />
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">Hearthside Care</h1>
              </div>
              <p className="text-lg md:text-xl leading-relaxed">
                Community support programs where we care for each other and ensure everyone has access to the tools they
                need to flourish.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6 text-center">
                Kith and Kin: We Care for Each Other
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-center mb-12">
                At Hearthside Care, we believe that everyone deserves access to tools that help them connect and
                communicate effectively. Through our community support programs, we ensure that financial barriers never
                prevent someone from finding their voice.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFC72C]/10 dark:bg-[#FFC72C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#FFC72C]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">Community</h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Building a network of mutual support and care
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#007B8C]/10 dark:bg-[#007B8C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HandHeart className="w-8 h-8 text-[#007B8C] dark:text-[#4DB8C9]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Accessibility
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Ensuring everyone has access to our tools
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E28A6D]/10 dark:bg-[#E28A6D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-[#E28A6D]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">Support</h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Providing resources and assistance when needed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Elder Program Section */}
        <section className="py-16 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#FFC72C]/20 to-[#FFC72C]/10 dark:from-[#FFC72C]/30 dark:to-[#FFC72C]/20 rounded-xl p-8 md:p-12 border-2 border-[#FFC72C]">
                <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6">
                  The Elder Program
                </h2>
                <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-8">
                  Our flagship community support initiative. Elders are community members who sponsor premium
                  subscriptions for those in need, ensuring that everyone has access to the full power of our tools like
                  the Clarity Coach.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">For Elders</h3>
                    <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                      Become an Elder and directly support someone's journey to better communication. Your contribution
                      makes a real difference in someone's life.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                      For Recipients
                    </h3>
                    <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                      If you need support accessing our premium tools, the Elder Program is here for you. Apply to
                      receive a sponsored subscription.
                    </p>
                  </div>
                </div>
                <Button asChild className="bg-[#007B8C] hover:bg-[#006270] text-white">
                  <Link href="/elder-program">Learn More About the Elder Program</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Foundation Section */}
        <section className="py-16 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6">
                Hearthside Foundation
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-8">
                The Hearthside Foundation is our non-profit arm that manages the Elder Program and other community
                outreach initiatives. Through the Foundation, we ensure that our mission of universal access remains at
                the heart of everything we do.
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
