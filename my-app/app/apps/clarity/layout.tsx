import type React from "react"
import { Footer } from "@/components/footer"
import { ClarityHeader } from "@/components/clarity-header"

export default function ClarityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pt-16">
        <ClarityHeader />
      </div>
      <div className="pt-16">{children}</div>
      <Footer />
    </>
  )
}
