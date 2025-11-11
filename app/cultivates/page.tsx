import Link from "next/link"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, GraduationCap, TrendingUp } from "lucide-react"

export default function CultivatesPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007B8C] to-[#005A68] dark:from-[#006270] dark:to-[#004A56] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-10 h-10" aria-hidden="true" />
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">Hearthside Cultivates</h1>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-white/90">
              Professional development and consulting services that help organizations build cultures of psychological
              safety and effective communication.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-[#1F2937]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6 text-center">
              Growing Thriving Organizations
            </h2>
            <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-center mb-12">
              At Hearthside Cultivates, we partner with organizations to create environments where every team member can
              flourish. Through workshops, training, and consulting, we help build the communication skills and
              psychological safety that drive both individual and organizational success.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#007B8C]/10 dark:bg-[#007B8C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-[#007B8C] dark:text-[#4DB8C9]" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">Workshops</h3>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  Interactive training sessions on communication and collaboration
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#E28A6D]/10 dark:bg-[#E28A6D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-[#E28A6D]" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">Consulting</h3>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  Strategic guidance for building cultures of psychological safety
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFC72C]/10 dark:bg-[#FFC72C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-[#FFC72C]" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">Training</h3>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  Ongoing development programs for lasting organizational change
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-[#F9FAFB] dark:bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-12 text-center">
            Our Services
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white dark:bg-[#1F2937] rounded-xl p-8 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
              <h3 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                Communication Workshops
              </h3>
              <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4">
                Interactive sessions that help teams understand different communication styles, build empathy, and
                develop practical skills for clearer, more effective communication.
              </p>
              <ul className="list-disc list-inside text-[#6B7280] dark:text-[#9CA3AF] space-y-2">
                <li>Understanding communication differences</li>
                <li>Building psychological safety in teams</li>
                <li>Practical tools for everyday interactions</li>
                <li>Customized to your organization's needs</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-[#1F2937] rounded-xl p-8 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
              <h3 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                Organizational Consulting
              </h3>
              <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4">
                Strategic partnership to help your organization build a culture where everyone can thrive. We work with
                leadership to identify barriers to effective communication and create actionable plans for improvement.
              </p>
              <ul className="list-disc list-inside text-[#6B7280] dark:text-[#9CA3AF] space-y-2">
                <li>Culture assessment and analysis</li>
                <li>Leadership coaching and development</li>
                <li>Change management support</li>
                <li>Long-term strategic planning</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-[#1F2937] rounded-xl p-8 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
              <h3 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                Professional Development Programs
              </h3>
              <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4">
                Ongoing training programs that build lasting skills and create sustainable change. Our programs combine
                workshops, coaching, and practical application to ensure real growth.
              </p>
              <ul className="list-disc list-inside text-[#6B7280] dark:text-[#9CA3AF] space-y-2">
                <li>Multi-session training programs</li>
                <li>Individual and group coaching</li>
                <li>Progress tracking and assessment</li>
                <li>Certification opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-[#1F2937]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-8">
              Let's talk about how Hearthside Cultivates can help your team build stronger connections and more
              effective communication.
            </p>
            <Button asChild size="lg" className="bg-[#007B8C] hover:bg-[#006270] text-white">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
