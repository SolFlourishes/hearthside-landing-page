"use client"

import { Button } from "@/components/ui/button"

interface RadioPillGroupProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: string[]
}

export function RadioPillGroup({ name, value, onChange, options }: RadioPillGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          type="button"
          variant={value === option ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(option)}
          className="capitalize text-xs"
        >
          {option.replace(/-/g, " ")}
        </Button>
      ))}
    </div>
  )
}
