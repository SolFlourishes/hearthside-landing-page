"use client"

import { Label } from "@/components/ui/label"
import { RadioPillGroup } from "@/app/apps/clarity/draft/RadioPillGroup"
import type { PoliticalIdentity } from "@/lib/political-profiles"
import { InfoTooltip } from "@/components/info-tooltip"

interface PoliticalIdentitySelectorProps {
  label: string
  value: PoliticalIdentity
  onChange: (identity: PoliticalIdentity) => void
  disabled?: boolean
  tooltip?: string
}

export function PoliticalIdentitySelector({
  label,
  value,
  onChange,
  disabled,
  tooltip,
}: PoliticalIdentitySelectorProps) {
  const identities: Array<{ value: PoliticalIdentity; label: string }> = [
    { value: "progressive", label: "Progressive" },
    { value: "liberal", label: "Liberal" },
    { value: "moderate", label: "Moderate" },
    { value: "conservative", label: "Conservative" },
    { value: "libertarian", label: "Libertarian" },
    { value: "unsure", label: "Unsure" },
  ]

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium flex items-center gap-1">
        {label}
        {tooltip && <InfoTooltip content={tooltip} />}
      </Label>
      <RadioPillGroup
        name={`political-identity-${label}`}
        value={value}
        onChange={(v) => onChange(v as PoliticalIdentity)}
        options={identities.map((i) => i.value)}
        disabled={disabled}
      />
    </div>
  )
}
