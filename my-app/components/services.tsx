import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Services() {
  const services = [
    {
      category: "Products",
      title: "The Clarity Coach",
      description:
        "Bridge communication gaps with AI-powered translation between different communication styles. Understand what others truly mean and express yourself with clarity across diverse perspectives.",
      features: ["Style translation", "Intent analysis", "Communication coaching"],
      image: "/clarity-coach-communication-translation.jpg",
      link: "/apps/clarity",
    },
    {
      category: "Services",
      title: "Hearthside Cultivates",
      description:
        "Professional development workshops and consulting services designed to foster psychological safety and effective communication in your organization.",
      features: ["Team workshops", "Leadership coaching", "Custom training"],
      image: "/professional-workshop-with-diverse-team-collaborat.jpg",
      link: "/cultivates",
    },
    {
      category: "Community",
      title: "Elder Program",
      description:
        "Be the reason someone else can flourish. Join our community of Elders who support others by sponsoring Clarity Coach subscriptions for those in need.",
      features: ["Support others", "Build community", "Create belonging"],
      image: "/diverse-community-gathering-in-warm-welcoming-circ.jpg",
      link: "/elder-program",
    },
  ]

  return (
    <section className="py-10 bg-gradient-to-b from-white to-[#F9FAFB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2937] mb-3 text-balance">
            Tools for Flourishing
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Discover apps, resources, and services designed to help you build meaningful connections and thrive in your
            personal and professional life.
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service, index) => (
            <article
              key={index}
              className={`grid lg:grid-cols-2 gap-6 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[300px]">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={`${service.title} - ${service.description}`}
                    className="w-full h-full object-cover max-h-[300px]"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <span className="text-xs font-semibold text-[#007B8C] uppercase tracking-wide">
                      {service.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-3 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2937] text-balance">
                  {service.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{service.description}</p>

                {/* Features */}
                <ul className="space-y-1.5" role="list">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full bg-[#FFC72C] flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#1F2937] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild size="sm" className="bg-[#007B8C] hover:bg-[#006270] text-white px-5 rounded-xl">
                  <Link href={service.link}>Learn More</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
