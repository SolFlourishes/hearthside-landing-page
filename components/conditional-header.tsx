"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"

export function ConditionalHeader() {
  const pathname = usePathname()
  const isClarityApp = pathname?.startsWith("/apps/clarity")

  return <Header />
}
