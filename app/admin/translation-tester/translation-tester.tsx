"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const neurotypes = [
  { value: "neurotypical", label: "Neurotypical" },
  { value: "adhd", label: "ADHD" },
  { value: "autism", label: "Autism" },
  { value: "dyslexia", label: "Dyslexia" },
]

const generations = [
  { value: "baby_boomer", label: "Baby Boomer (1946-1964)" },
  { value: "gen_x", label: "Gen X (1965-1980)" },
  { value: "xennial", label: "Xennial (1977-1983)" },
  { value: "millennial", label: "Millennial (1981-1996)" },
  { value: "gen_z", label: "Gen Z (1997-2012)" },
]

export function TranslationTester() {
  const [originalMessage, setOriginalMessage] = useState("")
  const [senderNeurotype, setSenderNeurotype] = useState("neurotypical")
  const [senderGeneration, setSenderGeneration] = useState("millennial")
  const [receiverNeurotype, setReceiverNeurotype] = useState("adhd")
  const [receiverGeneration, setReceiverGeneration] = useState("gen_z")

  const [firstTranslation, setFirstTranslation] = useState("")
  const [reverseTranslation, setReverseTranslation] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"setup" | "forward" | "reverse">("setup")

  const runTest = async () => {
    setLoading(true)
    setStep("forward")

    try {
      // Step 1: Translate from sender to receiver
      const forwardResponse = await fetch("/api/clarity/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          text: originalMessage,
          senderNeurotype,
          senderGeneration,
          receiverNeurotype,
          receiverGeneration,
          mode: "draft",
        }),
      })

      if (!forwardResponse.ok) {
        throw new Error("Forward translation failed")
      }

      const forwardData = await forwardResponse.json()
      setFirstTranslation(forwardData.translation)
      setStep("reverse")

      // Step 2: Translate back (swap sender and receiver)
      const reverseResponse = await fetch("/api/clarity/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          text: forwardData.translation,
          senderNeurotype: receiverNeurotype,
          senderGeneration: receiverGeneration,
          receiverNeurotype: senderNeurotype,
          receiverGeneration: senderGeneration,
          mode: "analyze",
        }),
      })

      if (!reverseResponse.ok) {
        throw new Error("Reverse translation failed")
      }

      const reverseData = await reverseResponse.json()
      setReverseTranslation(reverseData.translation)
    } catch (error) {
      console.error("Translation test error:", error)
      alert("Translation test failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setFirstTranslation("")
    setReverseTranslation("")
    setStep("setup")
  }

  const calculateSimilarity = () => {
    if (!originalMessage || !reverseTranslation) return 0

    const original = originalMessage.toLowerCase().trim()
    const reverse = reverseTranslation.toLowerCase().trim()

    // Simple word-based similarity
    const originalWords = original.split(/\s+/)
    const reverseWords = reverse.split(/\s+/)

    const commonWords = originalWords.filter((word) => reverseWords.includes(word))
    const similarity = (commonWords.length / Math.max(originalWords.length, reverseWords.length)) * 100

    return Math.round(similarity)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Translation Consistency Tester</h1>
        <p className="text-muted-foreground">
          Test bidirectional translation to validate semantic consistency and communication style adaptation
        </p>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This tool tests whether messages maintain their core meaning when translated between different communication
          styles. Perfect reversibility is not expected - we&apos;re testing for semantic consistency and appropriate
          style adaptation.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Test Configuration</CardTitle>
            <CardDescription>Set up the sender and receiver communication profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sender Profile */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  Sender Profile
                  {step !== "setup" && <Badge variant="secondary">Original Author</Badge>}
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label>Neurotype</Label>
                    <Select value={senderNeurotype} onValueChange={setSenderNeurotype} disabled={step !== "setup"}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {neurotypes.map((nt) => (
                          <SelectItem key={nt.value} value={nt.value}>
                            {nt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Generation</Label>
                    <Select value={senderGeneration} onValueChange={setSenderGeneration} disabled={step !== "setup"}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generations.map((gen) => (
                          <SelectItem key={gen.value} value={gen.value}>
                            {gen.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Receiver Profile */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  Receiver Profile
                  {step !== "setup" && <Badge variant="secondary">Translation Target</Badge>}
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label>Neurotype</Label>
                    <Select value={receiverNeurotype} onValueChange={setReceiverNeurotype} disabled={step !== "setup"}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {neurotypes.map((nt) => (
                          <SelectItem key={nt.value} value={nt.value}>
                            {nt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Generation</Label>
                    <Select
                      value={receiverGeneration}
                      onValueChange={setReceiverGeneration}
                      disabled={step !== "setup"}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generations.map((gen) => (
                          <SelectItem key={gen.value} value={gen.value}>
                            {gen.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Original Message</Label>
              <Textarea
                placeholder="Enter the message you want to test..."
                value={originalMessage}
                onChange={(e) => setOriginalMessage(e.target.value)}
                disabled={step !== "setup"}
                rows={4}
                className="mt-1.5"
              />
            </div>

            <div className="flex gap-3">
              {step === "setup" ? (
                <Button onClick={runTest} disabled={!originalMessage.trim() || loading} className="w-full">
                  {loading ? "Running Test..." : "Run Bidirectional Translation Test"}
                </Button>
              ) : (
                <Button onClick={reset} variant="outline" className="w-full bg-transparent">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset and Test Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Translation Flow */}
        {step !== "setup" && (
          <div className="space-y-6">
            {/* Forward Translation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-primary" />
                  Step 1: Forward Translation
                </CardTitle>
                <CardDescription>
                  Translating from {senderNeurotype} ({senderGeneration}) to {receiverNeurotype} ({receiverGeneration})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Original Message</Label>
                    <div className="mt-1.5 p-4 bg-muted rounded-md">
                      <p className="text-sm">{originalMessage}</p>
                    </div>
                  </div>
                  {firstTranslation && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Translated for Receiver</Label>
                      <div className="mt-1.5 p-4 bg-primary/5 border border-primary/20 rounded-md">
                        <p className="text-sm">{firstTranslation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Reverse Translation */}
            {reverseTranslation && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowLeft className="h-5 w-5 text-primary" />
                    Step 2: Reverse Translation
                  </CardTitle>
                  <CardDescription>
                    Translating back from {receiverNeurotype} ({receiverGeneration}) to {senderNeurotype} (
                    {senderGeneration})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Taking the Forward Translation</Label>
                      <div className="mt-1.5 p-4 bg-muted rounded-md">
                        <p className="text-sm">{firstTranslation}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Reverse Translation Result</Label>
                      <div className="mt-1.5 p-4 bg-primary/5 border border-primary/20 rounded-md">
                        <p className="text-sm">{reverseTranslation}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analysis */}
            {reverseTranslation && (
              <Card>
                <CardHeader>
                  <CardTitle>Consistency Analysis</CardTitle>
                  <CardDescription>Comparing original message with reverse translation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-semibold">Original Message</Label>
                      <div className="mt-1.5 p-4 bg-muted rounded-md border-2 border-primary">
                        <p className="text-sm">{originalMessage}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">After Round-Trip Translation</Label>
                      <div className="mt-1.5 p-4 bg-muted rounded-md border-2 border-primary">
                        <p className="text-sm">{reverseTranslation}</p>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p className="font-semibold">Word Overlap: {calculateSimilarity()}%</p>
                        <p className="text-sm">
                          {calculateSimilarity() > 70
                            ? "High consistency - Core message well preserved through translation cycles"
                            : calculateSimilarity() > 50
                              ? "Moderate consistency - Message adapted but key concepts maintained"
                              : "Low word overlap - This is expected as communication style adaptation changes phrasing while preserving intent"}
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-sm mb-2">Manual Review Checklist:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>✓ Does the reverse translation preserve the core intent?</li>
                      <li>✓ Are key action items or requests maintained?</li>
                      <li>✓ Is the emotional tone appropriately adapted in both directions?</li>
                      <li>✓ Would both versions be understood by their intended audiences?</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
