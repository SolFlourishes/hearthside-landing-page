import { RefreshCw } from "lucide-react"
import { Card } from "@/components/ui/card"

interface LoadingStateProps {
  message?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingState({ message = "Loading...", size = "md" }: LoadingStateProps) {
  const sizeClasses = {
    sm: "p-4",
    md: "p-8",
    lg: "p-12",
  }

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <Card className={`text-center ${sizeClasses[size]}`}>
      <RefreshCw className={`${iconSizes[size]} animate-spin mx-auto mb-4 text-primary`} aria-label="Loading" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </Card>
  )
}
