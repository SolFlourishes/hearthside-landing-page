"use client"

import { AlertTriangle, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function AlphaBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 border-b-2 border-amber-500/50 backdrop-blur">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded">ALPHA 0.1</span>
                <span className="font-semibold text-sm text-foreground">Early Development Version</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Leadership Leader is in active development. Features may be incomplete, unstable, or change without
                notice. We appreciate your patience and feedback as we build something great together.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
