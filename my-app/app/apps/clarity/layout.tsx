import type React from "react"
import { Footer } from "@/components/footer"
import { ClarityHeader } from "@/components/clarity-header"

export default function ClarityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClarityHeader />
      <div>{children}</div>
      <Footer />
    </>
  )
}
