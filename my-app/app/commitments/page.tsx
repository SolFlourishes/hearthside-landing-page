import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Our Commitments - Hearthside Works",
  description:
    "Our unwavering commitment to your privacy and accessibility. Learn how we protect your data and ensure our tools are accessible to everyone.",
}

export default function CommitmentsPage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#F9FAFB] via-[#FFF5F0] to-[#F9FAFB]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1F2937] mb-4 text-balance">
                Our Commitments
              </h1>
              <p className="text-lg text-[#6B7280] leading-relaxed">
                Trust is the foundation of clear communication. This page outlines our unwavering commitment to your
                privacy and to making our tools accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="font-serif text-3xl font-bold text-[#1F2937] mb-6 flex items-center gap-3">
                  <span
                    className="w-12 h-12 bg-[#007B8C] rounded-xl flex items-center justify-center text-2xl"
                    aria-hidden="true"
                  >
                    🔒
                  </span>
                  Your Privacy is Paramount
                </h2>
              </div>

              {/* Privacy Q&A */}
              <div className="space-y-8">
                <article className="bg-[#F9FAFB] rounded-xl p-6 border border-[#E5E7EB]">
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] mb-3">
                    Can you see what I type into the translator?
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    <strong className="text-[#1F2937]">No.</strong> The text you enter for translation or analysis is
                    sent securely to the AI for processing and is immediately discarded. It is never stored, and it is
                    never seen by any human at Hearthside Works, LLC. Your conversations and thoughts are your own.
                  </p>
                </article>

                <article className="bg-[#F9FAFB] rounded-xl p-6 border border-[#E5E7EB]">
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] mb-3">What Data Do You Collect?</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    We only store anonymous feedback data (star ratings, comments, and your "golden" edits) to help us
                    identify areas for improvement. This data is completely disconnected from any personal identifiers.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#F9FAFB]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="font-serif text-3xl font-bold text-[#1F2937] mb-6 flex items-center gap-3">
                  <span
                    className="w-12 h-12 bg-[#E28A6D] rounded-xl flex items-center justify-center text-2xl"
                    aria-hidden="true"
                  >
                    ♿
                  </span>
                  Commitment to Accessibility
                </h2>
              </div>

              <article className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  Hearthside Works is dedicated to ensuring the Clarity Coach is accessible to all users. Our goal is to
                  conform to the{" "}
                  <a
                    href="https://www.w3.org/WAI/WCAG21/quickref/"
                    className="text-[#007B8C] hover:text-[#006270] underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
                  </a>{" "}
                  standards.
                </p>
                <div className="bg-[#F9FAFB] rounded-lg p-4 border-l-4 border-[#FFC72C]">
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    <strong className="text-[#1F2937]">Our Accessibility Features:</strong>
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-[#6B7280]" role="list">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFC72C] mt-1" aria-hidden="true">
                        ✓
                      </span>
                      <span>Semantic HTML for screen reader compatibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFC72C] mt-1" aria-hidden="true">
                        ✓
                      </span>
                      <span>Keyboard navigation support throughout the application</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFC72C] mt-1" aria-hidden="true">
                        ✓
                      </span>
                      <span>High contrast color ratios for readability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFC72C] mt-1" aria-hidden="true">
                        ✓
                      </span>
                      <span>Clear focus indicators for interactive elements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFC72C] mt-1" aria-hidden="true">
                        ✓
                      </span>
                      <span>Alternative text for all meaningful images</span>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#007B8C]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-serif text-3xl font-bold text-white text-balance">
                Questions About Our Commitments?
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                We're here to help. Reach out to us with any questions or concerns about privacy and accessibility.
              </p>
              <Button
                size="lg"
                className="bg-white text-[#007B8C] hover:bg-[#F9FAFB] px-8 py-5 text-base rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
