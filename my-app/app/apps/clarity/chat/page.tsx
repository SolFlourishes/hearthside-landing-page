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
            <p className="text-muted-foreground">Get real-time advice on navigating a tricky conversation.</p>
          </div>

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
            <h3 className="font-semibold mb-2">💬 How to Use Chat Mode</h3>
            <p className="text-sm text-muted-foreground">
              Share details about a conversation you're navigating, and the Coach will provide guidance on tone,
              phrasing, and approach. The more context you provide, the better the advice!
            </p>
          </Card>
        </div>
      </div>
    </main>
  )
}
