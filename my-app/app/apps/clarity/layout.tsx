import type React from "react"
import { Footer } from "@/components/footer"
import { ConsentBanner } from "@/components/consent-banner"
import { ErrorBoundary } from "@/components/error-boundary"

export default function ClarityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ErrorBoundary>
        <div>{children}</div>
        <Footer />
        <ConsentBanner />
      </ErrorBoundary>
    </div>
  )
}
