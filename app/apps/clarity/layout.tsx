import type React from "react"
import { ConsentBanner } from "@/components/consent-banner"
import { ErrorBoundary } from "@/components/error-boundary"
import { ClarityNav } from "@/components/clarity-nav"

export default function ClarityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ErrorBoundary>
        <ClarityNav />
        <div>{children}</div>
        <ConsentBanner />
      </ErrorBoundary>
    </div>
  )
}
