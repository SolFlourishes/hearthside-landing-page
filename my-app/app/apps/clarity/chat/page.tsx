"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Send, Lightbulb } from "lucide-react"

interface Message {
  role: "user" | "model"
  content: string
}

const CONVERSATION_STARTERS = [
  "I need to give difficult feedback to a colleague. How should I approach it?",
  "My manager gave me vague feedback. How do I ask for clarification without seeming defensive?",
  "I'm in a conflict with a team member. How can I resolve this professionally?",
  "I want to negotiate my salary but don't know how to start the conversation.",
  "Someone misunderstood my email and now they're upset. How do I fix this?",
]

export default function ChatModePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "<p>Hi there! I'm the Clarity Coach. How can I help you navigate a communication challenge today?</p><p>You can ask for advice, role-play a conversation, or brainstorm solutions.</p>",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showStarters, setShowStarters] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const example = params.get("example")
    if (example === "conflict") {
      setInput(
        "I'm having a conflict with a coworker who keeps taking credit for my ideas in meetings. How should I address this without making things worse?",
      )
    }
  }, [])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    const newHistory = [...messages, userMessage]
    setMessages(newHistory)
    setInput("")
    setIsLoading(true)
    setShowStarters(false)

    try {
      const response = await fetch(`/api/clarity/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: newHistory }),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || "The server had an issue connecting.")
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "model", content: data.reply }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: `<p>Sorry, I seem to be having trouble connecting. The server reported: ${error instanceof Error ? error.message : "Unknown error"}</p>`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <main className="fixed inset-0 top-16 bg-background">
      <div className="h-full flex flex-col max-w-4xl mx-auto px-4">
        <div className="py-4 border-b border-border">
          <h1 className="font-serif text-2xl font-bold text-foreground">Chat with the Coach</h1>
          <p className="text-sm text-muted-foreground">Get real-time advice on communication challenges</p>
        </div>

        <div className="flex-1 flex flex-col min-h-0 py-4">
          {/* Messages - scrollable area */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2" role="log" aria-live="polite" aria-atomic="false">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-4 prose prose-sm dark:prose-invert break-words ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                  dangerouslySetInnerHTML={{ __html: message.content }}
                />
              </div>
            ))}

            {messages.length === 1 && !isLoading && (
              <div className="flex justify-start">
                <Card className="max-w-[80%] p-4 bg-primary/5 border-primary/20">
                  <button
                    onClick={() => setShowStarters(!showStarters)}
                    className="flex items-center gap-2 text-sm font-semibold mb-2 hover:text-primary transition-colors"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showStarters ? "Hide suggestions" : "Show conversation starters"}
                  </button>
                  {showStarters && (
                    <div className="space-y-2 mt-3">
                      {CONVERSATION_STARTERS.map((starter, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInput(starter)
                            setShowStarters(false)
                          }}
                          className="block w-full text-left p-2 rounded bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all text-xs"
                        >
                          {starter}
                        </button>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex gap-2">
                    <div
                      className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "-0.3s" }}
                    />
                    <div
                      className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "-0.15s" }}
                    />
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border pt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
              aria-label="Chat message form"
            >
              <label htmlFor="chat-input" className="sr-only">
                Describe your situation
              </label>
              <Textarea
                id="chat-input"
                placeholder="Describe your situation... (Enter to send, Shift+Enter for new line)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="min-h-[80px] max-h-[120px] resize-none"
                aria-label="Describe your situation"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="lg" aria-label="Send message">
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              💡 Tip: Share specific details and relationship context for better advice
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
