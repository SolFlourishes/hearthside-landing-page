"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Send } from "lucide-react"

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
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-3">Chat with the Coach</h1>
            <p className="text-muted-foreground">
              Get real-time advice on navigating tricky conversations and communication challenges.
            </p>
          </div>

          {messages.length === 1 && !isLoading && (
            <Card className="mb-6 p-6 bg-primary/5 border-primary/20">
              <h3 className="font-semibold mb-3 text-center">Try asking about:</h3>
              <div className="grid gap-2">
                {CONVERSATION_STARTERS.map((starter, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(starter)}
                    className="text-left p-3 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Chat Container */}
          <Card className="p-6 h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4" role="log" aria-live="polite" aria-atomic="false">
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

            {/* Input */}
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
                placeholder="Describe your situation... (Press Enter to send, Shift+Enter for new line)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="min-h-[60px] resize-none"
                aria-label="Describe your situation"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="lg" aria-label="Send message">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>

          {/* Info Box */}
          <Card className="mt-6 p-6 bg-primary/5 border-primary/20">
            <h3 className="font-semibold mb-2">💬 Tips for Better Conversations</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Share specific details about your situation for more tailored advice</li>
              <li>Mention the relationship context (manager, colleague, client, etc.)</li>
              <li>Describe what you've already tried, if anything</li>
              <li>Ask follow-up questions to dive deeper into strategies</li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  )
}
