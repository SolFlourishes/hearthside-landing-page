"use client"

import { Label } from "@/components/ui/label"
import { RadioPillGroup } from "@/app/apps/clarity/draft/RadioPillGroup"

export type CommunicationMode = "personal" | "political"

interface CommunicationModeSelectorProps {
  value: CommunicationMode
  onChange: (mode: CommunicationMode) => void
  disabled?: boolean
}

export function CommunicationModeSelector({ value, onChange, disabled }: CommunicationModeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold">Communication Type</Label>
      <RadioPillGroup
        name="communication-mode"
        value={value}
        onChange={(v) => onChange(v as CommunicationMode)}
        options={["personal", "political"]}
        disabled={disabled}
      />
      <p className="text-xs text-muted-foreground">
        {value === "personal"
          ? "Focus on neurotype, generation, and relationship dynamics"
          : "Focus on political identity and cross-partisan communication"}
      </p>
    </div>
  )
}
