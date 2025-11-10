"use client"

import type React from "react"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Users, Briefcase, MapPin, Phone, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      })

      // Reset form
      e.currentTarget.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly via email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
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

              {/* Contact Form */}
              <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-xl p-8 border border-[#E5E7EB] dark:border-[#374151]">
                <h3 className="font-serif text-2xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-6 text-center">
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-2"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#007B8C] dark:focus:ring-[#4DB8C9]"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-2"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#007B8C] dark:focus:ring-[#4DB8C9]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-2"
                    >
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#007B8C] dark:focus:ring-[#4DB8C9]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#007B8C] dark:focus:ring-[#4DB8C9]"
                      required
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-[#007B8C] hover:bg-[#006270] dark:bg-[#4DB8C9] dark:hover:bg-[#3da7b8] text-white w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map and Location Section */}
        <section className="py-16 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-12 text-center">
                Visit Us
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Map */}
                <div className="rounded-xl overflow-hidden border border-[#E5E7EB] dark:border-[#374151] h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98823492346469!3d40.74844097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1704891234567!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hearthside Works Location"
                  ></iframe>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 border border-[#E5E7EB] dark:border-[#374151]">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#007B8C]/10 dark:bg-[#007B8C]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-[#007B8C] dark:text-[#4DB8C9]" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                          Office Address
                        </h3>
                        <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                          350 Fifth Avenue
                          <br />
                          New York, NY 10118
                          <br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 border border-[#E5E7EB] dark:border-[#374151]">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#E28A6D]/10 dark:bg-[#E28A6D]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-[#E28A6D]" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                          Phone & Email
                        </h3>
                        <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                          <a href="tel:+15551234567" className="hover:text-[#007B8C] dark:hover:text-[#4DB8C9]">
                            +1 (555) 123-4567
                          </a>
                          <br />
                          <a
                            href="mailto:info@hearthsideworks.com"
                            className="hover:text-[#007B8C] dark:hover:text-[#4DB8C9]"
                          >
                            info@hearthsideworks.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 border border-[#E5E7EB] dark:border-[#374151]">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#FFC72C]/10 dark:bg-[#FFC72C]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-[#FFC72C]" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                          Business Hours
                        </h3>
                        <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
