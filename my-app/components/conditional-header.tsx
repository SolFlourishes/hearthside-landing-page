"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"
import { ClarityHeader } from "./clarity-header"

export function ConditionalHeader() {
  const pathname = usePathname()
  const isClarityApp = pathname?.startsWith("/apps/clarity")

  if (isClarityApp) {
    return <ClarityHeader />
  }

  return <Header />
}
