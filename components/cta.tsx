import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-10 bg-gradient-to-br from-[#007B8C] to-[#006270] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 id="cta-heading" className="font-serif text-2xl sm:text-3xl font-bold text-white text-balance">
            Start Communicating with Clarity
          </h2>
          <p className="text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
            Try the Clarity Coach and discover how understanding different communication styles can transform your
            relationships and help you express yourself with confidence.
          </p>

          <nav aria-label="Call to action" className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#007B8C] hover:bg-[#F9FAFB] px-6 py-4 text-base rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/apps/clarity" aria-label="Try the Clarity Coach application">
                Try Clarity Coach
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#007B8C] px-6 py-4 text-base rounded-xl transition-all bg-transparent"
            >
              <Link href="/elder-program" aria-label="Support the community through the Elder Program">
                Support the Community
              </Link>
            </Button>
          </nav>

          <div className="pt-6 border-t border-white/20">
            <p className="text-white/80 text-sm mb-0">Building meaningful connections, one conversation at a time</p>
          </div>
        </div>
      </div>
    </section>
  )
}
