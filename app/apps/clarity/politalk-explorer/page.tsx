import { Suspense } from "react"
import { PolitalkExplorer } from "./politalk-explorer"

export const metadata = {
  title: "PoliTalk Explorer - Clarity Coach",
  description: "Understand the moral frameworks and worldviews behind political positions",
}

export default function PolitalkExplorerPage() {
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PolitalkExplorer />
      </Suspense>
    </div>
  )
}
