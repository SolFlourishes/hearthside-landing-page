import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Gamepad2, Users, Target, Lightbulb } from "lucide-react"

export default function ProjectCohesionPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#007B8C] to-[#005A68] dark:from-[#006270] dark:to-[#004A56] text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Gamepad2 className="w-10 h-10" aria-hidden="true" />
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">Project Cohesion</h1>
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-8">
                A collaborative game experience that brings teams together through shared challenges and helps players
                understand different communication styles.
              </p>
              <Button size="lg" className="bg-white text-[#007B8C] hover:bg-white/90">
                Coming Soon
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6 text-center">
                About the Game
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-center mb-12">
                Project Cohesion is designed to help teams build stronger connections through collaborative gameplay.
                Players work together to solve challenges while learning about different communication styles and
                building empathy.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#007B8C]/10 dark:bg-[#007B8C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#007B8C] dark:text-[#4DB8C9]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Team Building
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Strengthen team bonds through collaborative challenges
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E28A6D]/10 dark:bg-[#E28A6D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-[#E28A6D]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Communication Skills
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Learn to understand different communication styles
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFC72C]/10 dark:bg-[#FFC72C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-[#FFC72C]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Problem Solving
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Develop critical thinking through engaging puzzles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section className="py-16 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6">
                Currently in Development
              </h2>
              <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-8">
                Project Cohesion is currently under active development. We're working hard to create an experience that
                truly helps teams connect and grow together. Stay tuned for updates!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
