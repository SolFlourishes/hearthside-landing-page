export function Mission() {
  const phases = [
    {
      title: "Hear Me",
      subtitle: "The Clarity",
      description: "Achieve clarity in communication, ensuring your intent is accurately received and understood.",
      icon: "👂",
      color: "bg-[#007B8C]",
      ariaLabel: "Hear Me phase: Achieving clarity in communication",
    },
    {
      title: "See Me",
      subtitle: "The Recognition",
      description: "Validate your unique communication style and strengths. Be recognized for who you truly are.",
      icon: "👁️",
      color: "bg-[#E28A6D]",
      ariaLabel: "See Me phase: Recognition and validation",
    },
    {
      title: "Know Me",
      subtitle: "The Belonging",
      description: "Foster authentic connection and trust, leading to true belonging and psychological safety.",
      icon: "🤝",
      color: "bg-[#FFC72C]",
      ariaLabel: "Know Me phase: Authentic belonging",
    },
  ]

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2937] mb-3 text-balance">
            Our Guiding Compass
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Every product and service we create follows three ascending levels of connection, designed to help you
            flourish through meaningful relationships.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {phases.map((phase, index) => (
            <article
              key={index}
              className="group relative bg-[#F9FAFB] rounded-xl p-5 hover:shadow-xl transition-all duration-300 border border-[#E5E7EB] hover:border-transparent"
              aria-label={phase.ariaLabel}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 ${phase.color} rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform`}
                aria-hidden="true"
              >
                {phase.icon}
              </div>

              {/* Content */}
              <h3 className="font-serif text-lg font-bold text-[#1F2937] mb-1">{phase.title}</h3>
              <p className="text-xs font-semibold text-[#007B8C] mb-2 uppercase tracking-wide">{phase.subtitle}</p>
              <p className="text-[#6B7280] leading-relaxed text-sm">{phase.description}</p>

              {/* Decorative element */}
              <div
                className="absolute top-3 right-3 text-5xl font-serif text-[#E5E7EB] group-hover:text-[#FFC72C]/20 transition-colors"
                aria-hidden="true"
              >
                {index + 1}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
