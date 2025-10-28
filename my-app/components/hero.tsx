import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F9FAFB] via-[#FFF5F0] to-[#F9FAFB]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#E28A6D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#007B8C]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2937] leading-tight text-balance">
                Hearthside Works
              </h1>
              <div className="h-1 w-20 bg-[#FFC72C] mt-3 mx-auto lg:mx-0" aria-hidden="true" />
            </div>

            <p className="text-lg sm:text-xl text-[#6B7280] leading-relaxed text-pretty">
              A safe space for connection and understanding. Tools to help you flourish through meaningful
              relationships.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-[#007B8C] hover:bg-[#006270] text-white px-8 py-5 text-base rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Explore Our Tools
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#E28A6D] text-[#E28A6D] hover:bg-[#E28A6D] hover:text-white px-8 py-5 text-base rounded-xl transition-all bg-transparent"
              >
                Learn More
              </Button>
            </div>

            {/* Motto */}
            <div className="pt-6 border-t border-[#E5E7EB]">
              <p className="font-serif text-base text-[#007B8C] italic">Hear Me, See Me, Know Me.</p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/diverse-people-collaborating-warmly-around-a-table.jpg"
                alt="Diverse group of people collaborating warmly around a table, representing connection and belonging at Hearthside Works"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient for warmth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#E28A6D]/20 to-transparent" aria-hidden="true" />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-xl border border-[#E5E7EB] max-w-xs">
              <p className="text-xs text-[#6B7280] mb-1 uppercase tracking-wide">Our Mission</p>
              <p className="font-serif text-base text-[#1F2937] leading-snug">
                Creating communities of belonging where everyone can flourish
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
