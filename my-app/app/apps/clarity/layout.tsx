import type React from "react"
import { Footer } from "@/components/footer"
import { ClarityHeader } from "@/components/clarity-header"
import { ErrorBoundary } from "@/components/error-boundary"
import { ConsentBanner } from "@/components/consent-banner"

export default function ClarityLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ClarityHeader />
      <div>{children}</div>
      <Footer />
      <ConsentBanner />
    </ErrorBoundary>
  )
}
