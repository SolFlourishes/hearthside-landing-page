import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Users, Briefcase } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#007B8C] to-[#005A68] dark:from-[#006270] dark:to-[#004A56] text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-10 h-10" aria-hidden="true" />
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">Get in Touch</h1>
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-white/90">
                We'd love to hear from you. Whether you have questions, need support, or want to learn more about our
                services, we're here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options Section */}
        <section className="py-16 bg-white dark:bg-[#1F2937]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-12 text-center">
                How Can We Help?
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#007B8C]/10 dark:bg-[#007B8C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-[#007B8C] dark:text-[#4DB8C9]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    General Inquiries
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4">
                    Questions about our products or services
                  </p>
                  <a
                    href="mailto:info@hearthsideworks.com"
                    className="text-[#007B8C] dark:text-[#4DB8C9] hover:underline"
                  >
                    info@hearthsideworks.com
                  </a>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E28A6D]/10 dark:bg-[#E28A6D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#E28A6D]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Elder Program
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4">
                    Apply for support or become an Elder
                  </p>
                  <a
                    href="mailto:elder@hearthsideworks.com"
                    className="text-[#007B8C] dark:text-[#4DB8C9] hover:underline"
                  >
                    elder@hearthsideworks.com
                  </a>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFC72C]/10 dark:bg-[#FFC72C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-[#FFC72C]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Consulting & Training
                  </h3>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4">
                    Workshops and organizational services
                  </p>
                  <a
                    href="mailto:cultivates@hearthsideworks.com"
                    className="text-[#007B8C] dark:text-[#4DB8C9] hover:underline"
                  >
                    cultivates@hearthsideworks.com
                  </a>
                </div>
              </div>

              {/* Contact Form Placeholder */}
              <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-xl p-8 border border-[#E5E7EB] dark:border-[#374151]">
                <h3 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6 text-center">
                  Send Us a Message
                </h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#007B8C]"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#007B8C]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#007B8C]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#007B8C]"
                      required
                    ></textarea>
                  </div>
                  <Button type="submit" size="lg" className="bg-[#007B8C] hover:bg-[#006270] text-white w-full">
                    Send Message
                  </Button>
                </form>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] text-center mt-4">
                  Note: This is a demo form. Please use the email addresses above to contact us directly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
