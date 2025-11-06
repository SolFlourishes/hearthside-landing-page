"use client"

import { AlertTriangle, Phone, MessageSquare, ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import type { CrisisResource } from "@/lib/content-safety"

interface CrisisAlertProps {
  message: string
  resources: CrisisResource[]
  severity: "medium" | "high" | "critical"
}

export function CrisisAlert({ message, resources, severity }: CrisisAlertProps) {
  const bgColor = severity === "critical" ? "bg-red-50 dark:bg-red-950" : "bg-amber-50 dark:bg-amber-950"
  const borderColor =
    severity === "critical" ? "border-red-200 dark:border-red-800" : "border-amber-200 dark:border-amber-800"
  const textColor = severity === "critical" ? "text-red-900 dark:text-red-100" : "text-amber-900 dark:text-amber-100"

  return (
    <Alert className={`${bgColor} ${borderColor} ${textColor} mb-6`}>
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle className="text-lg font-semibold mb-2">
        {severity === "critical" ? "Immediate Help Available" : "Support Resources"}
      </AlertTitle>
      <AlertDescription>
        <p className="mb-4">{message}</p>

        <div className="space-y-4">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{resource.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
              <div className="flex flex-wrap gap-2">
                {resource.phone && (
                  <Button size="sm" variant="outline" asChild className="bg-white dark:bg-gray-800">
                    <a href={`tel:${resource.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      {resource.phone}
                    </a>
                  </Button>
                )}
                {resource.text && (
                  <Button size="sm" variant="outline" asChild className="bg-white dark:bg-gray-800">
                    <a href={`sms:${resource.text.split(" ").pop()}`}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {resource.text}
                    </a>
                  </Button>
                )}
                <Button size="sm" variant="outline" asChild className="bg-white dark:bg-gray-800">
                  <a href={resource.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Available: {resource.available}</p>
            </div>
          ))}
        </div>

        {severity === "critical" && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
            <p className="text-sm font-semibold text-red-900 dark:text-red-100">
              If you're in immediate danger, please call 911 or go to your nearest emergency room.
            </p>
          </div>
        )}
      </AlertDescription>
    </Alert>
  )
}
