"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { PoliticalValue } from "@/lib/political-profiles"
import { InfoTooltip } from "@/components/info-tooltip"

interface PoliticalValuesSelectorProps {
  label: string
  selectedValues: string[]
  onChange: (values: string[]) => void
  disabled?: boolean
  tooltip?: string
}

export function PoliticalValuesSelector({
  label,
  selectedValues = [], // Default to empty array to prevent undefined errors
  onChange,
  disabled = false, // Default disabled to false
  tooltip,
}: PoliticalValuesSelectorProps) {
  const availableValues: Array<{ value: PoliticalValue; label: string; description: string }> = [
    {
      value: "anti-establishment",
      label: "Anti-Establishment",
      description: "Skeptical of traditional institutions",
    },
    { value: "populist", label: "Populist", description: "Focus on 'ordinary people' vs. elites" },
    {
      value: "traditional-conservative",
      label: "Traditional Conservative",
      description: "Values institutions and civic norms",
    },
    { value: "social-justice", label: "Social Justice", description: "Focus on equity and systemic change" },
    { value: "economic-freedom", label: "Economic Freedom", description: "Free markets and entrepreneurship" },
    { value: "law-and-order", label: "Law and Order", description: "Emphasizes public safety" },
    { value: "environmentalist", label: "Environmentalist", description: "Prioritizes climate action" },
    { value: "religious-values", label: "Religious/Faith-Based", description: "Guided by faith principles" },
    { value: "secular-humanist", label: "Secular Humanist", description: "Reason and science focused" },
    { value: "nationalist", label: "Nationalist", description: "Prioritizes national sovereignty" },
    { value: "globalist", label: "Globalist", description: "Values international cooperation" },
  ]

  const handleToggle = (value: PoliticalValue) => {
    const currentValues = Array.isArray(selectedValues) ? selectedValues : []

    if (currentValues.includes(value)) {
      onChange(currentValues.filter((v) => v !== value))
    } else {
      onChange([...currentValues.filter((v) => v !== "none"), value])
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-xs font-medium flex items-center gap-1">
        {label}
        {tooltip && <InfoTooltip content={tooltip} />}
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availableValues.map((item) => (
          <div key={item.value} className="flex items-start gap-2">
            <Checkbox
              id={`${label}-${item.value}`}
              checked={Array.isArray(selectedValues) && selectedValues.includes(item.value)} // Added array check
              onCheckedChange={() => handleToggle(item.value)}
              disabled={disabled}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <label
                htmlFor={`${label}-${item.value}`}
                className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
              </label>
              <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
