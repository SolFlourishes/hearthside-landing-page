import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Mission } from "@/components/mission"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <main role="main">
        <Hero />
        <Mission />
        <Services />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
