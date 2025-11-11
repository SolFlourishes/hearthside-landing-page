import type React from "react"
import { ConsentBanner } from "@/components/consent-banner"
import { ErrorBoundary } from "@/components/error-boundary"

export default function ClarityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ErrorBoundary>
        <div>{children}</div>
        <ConsentBanner />
      </ErrorBoundary>
    </div>
  )
}
