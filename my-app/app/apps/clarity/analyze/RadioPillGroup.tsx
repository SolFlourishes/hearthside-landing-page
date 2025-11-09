"use client"

import { Button } from "@/components/ui/button"

interface RadioPillGroupProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: string[]
  disabled?: boolean
}

export function RadioPillGroup({ name, value, onChange, options, disabled }: RadioPillGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          type="button"
          variant={value === option ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(option)}
          disabled={disabled}
          className="capitalize text-xs"
        >
          {typeof option === "string" ? option.replace(/-/g, " ") : option}
        </Button>
      ))}
    </div>
  )
}
