import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#007B8C] to-[#006270] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white text-balance">
            Ready to Find Your Hearthside?
          </h2>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            Join our community of individuals committed to meaningful connection and personal growth. Start your journey
            toward belonging today.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              size="lg"
              className="bg-white text-[#007B8C] hover:bg-[#F9FAFB] px-8 py-5 text-base rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#007B8C] px-8 py-5 text-base rounded-xl transition-all bg-transparent"
            >
              Explore Elder Program
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-white/80 text-sm mb-4">Trusted by individuals and organizations worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="text-white/90">
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-xs">Active Users</div>
              </div>
              <div className="text-white/90">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs">Organizations</div>
              </div>
              <div className="text-white/90">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-xs">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
