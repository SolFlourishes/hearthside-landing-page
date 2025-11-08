"use client"

import { Label } from "@/components/ui/label"
import type { RelationshipContext } from "@/lib/communication-profiles"

interface RelationshipSelectorProps {
  value: RelationshipContext
  onChange: (value: RelationshipContext) => void
  label: string
  disabled?: boolean
}

export function RelationshipSelector({ value, onChange, label, disabled }: RelationshipSelectorProps) {
  const relationships: { value: RelationshipContext; label: string }[] = [
    { value: "boss", label: "Boss/Manager" },
    { value: "colleague", label: "Colleague/Peer" },
    { value: "direct-report", label: "Direct Report" },
    { value: "client", label: "Client/Customer" },
    { value: "friend", label: "Friend" },
    { value: "family", label: "Family Member" },
    { value: "romantic-partner", label: "Romantic Partner" },
    { value: "teacher", label: "Teacher/Professor" },
    { value: "student", label: "Student" },
    { value: "stranger", label: "Stranger/New Contact" },
    { value: "other", label: "Other" },
  ]

  return (
    <div>
      <Label className="text-sm font-medium mb-2 block">{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as RelationshipContext)}
        disabled={disabled}
        className="w-full p-2 border rounded-md bg-background text-sm"
      >
        {relationships.map((rel) => (
          <option key={rel.value} value={rel.value}>
            {rel.label}
          </option>
        ))}
      </select>
    </div>
  )
}
