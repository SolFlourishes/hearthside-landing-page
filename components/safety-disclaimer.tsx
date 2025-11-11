"use client"

import { Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SafetyDisclaimer() {
  return (
    <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100">
      <Info className="h-4 w-4" />
      <AlertDescription className="text-sm">
        <strong>Important:</strong> Clarity Coach is a communication tool, not a substitute for professional therapy,
        medical advice, or crisis counseling. If you're experiencing a mental health crisis, please contact the 988
        Suicide & Crisis Lifeline or seek immediate professional help.
      </AlertDescription>
    </Alert>
  )
}
