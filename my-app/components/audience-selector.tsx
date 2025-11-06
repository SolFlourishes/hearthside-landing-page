"use client"

import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"

interface AudienceSelectorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function AudienceSelector({ value, onChange, disabled }: AudienceSelectorProps) {
  const audiences = [
    { value: "adult-to-adult", label: "Adult to Adult", description: "Professional or peer communication" },
    { value: "parent-to-kid", label: "Parent to Kid", description: "Explaining to children" },
    { value: "kid-to-parent", label: "Kid to Parent", description: "Helping kids communicate with adults" },
    { value: "kid-to-kid", label: "Kid to Kid", description: "Peer communication for children" },
  ]

  const isJrMode = value !== "adult-to-adult"

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold flex items-center gap-2">
        Communication Audience
        {isJrMode && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-medium">
            <Sparkles className="w-3 h-3" />
            Jr Mode
          </span>
        )}
      </Label>
      <div className="grid grid-cols-2 gap-2">
        {audiences.map((audience) => (
          <label
            key={audience.value}
            className={`relative flex flex-col p-3 rounded-lg border-2 cursor-pointer transition-all ${
              value === audience.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input
              type="radio"
              name="audience"
              value={audience.value}
              checked={value === audience.value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="sr-only"
            />
            <span className="text-sm font-medium">{audience.label}</span>
            <span className="text-xs text-muted-foreground mt-0.5">{audience.description}</span>
          </label>
        ))}
      </div>
      {isJrMode && (
        <p className="text-xs text-muted-foreground bg-purple-50 dark:bg-purple-950/20 p-2 rounded border border-purple-200 dark:border-purple-800">
          🌟 Clarity Coach Jr. uses kid-friendly language and examples that children can understand.
        </p>
      )}
    </div>
  )
}
