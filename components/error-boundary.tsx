"use client"

import { Component, type ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    if (process.env.NODE_ENV === "production") {
      console.error("Error boundary caught:", error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Card className="p-8 text-center max-w-2xl mx-auto my-8">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="text-left mb-4 p-4 bg-muted rounded text-xs">
              <summary className="cursor-pointer font-semibold mb-2">Error details (dev only)</summary>
              <pre className="whitespace-pre-wrap">{this.state.error.message}</pre>
              {this.state.error.stack && (
                <pre className="whitespace-pre-wrap mt-2 text-destructive">{this.state.error.stack}</pre>
              )}
            </details>
          )}
          <Button onClick={() => window.location.reload()} size="lg">
            Refresh Page
          </Button>
        </Card>
      )
    }

    return this.props.children
  }
}
