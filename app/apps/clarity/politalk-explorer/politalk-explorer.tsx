"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  MessageCircle,
  Lightbulb,
  GitCompare,
  ArrowLeft,
  User,
  Users,
  BookOpen,
  AlertTriangle,
} from "lucide-react"
import { PoliticalIdentitySelector } from "@/components/political-identity-selector"
import { PoliticalValuesSelector } from "@/components/political-values-selector"
import type { PoliticalIdentity, PoliticalValue } from "@/lib/political-profiles"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

const TOPIC_LIBRARY = [
  {
    category: "Life & Ethics",
    topics: [
      {
        title: "Pro-Life & Social Support",
        statement:
          "I'm pro-life and support the sanctity of life, but I don't think the government should provide welfare benefits or universal healthcare because people need to take personal responsibility.",
      },
      {
        title: "Religious Freedom vs. LGBTQ+ Rights",
        statement:
          "I believe in religious freedom and that businesses should be able to refuse service based on their religious beliefs, even if it affects LGBTQ+ individuals.",
      },
      {
        title: "Death Penalty & Pro-Life",
        statement:
          "I'm pro-life and believe every life is sacred, but I support the death penalty for heinous crimes because justice requires it.",
      },
    ],
  },
  {
    category: "Immigration & Security",
    topics: [
      {
        title: "Border Security & Compassion",
        statement:
          "I support strong border security and separating families at the border to deter illegal immigration, even though I believe in family values and keeping families together.",
      },
      {
        title: "Immigration & Jobs",
        statement:
          "I believe immigrants are taking American jobs and driving down wages, so we need to limit immigration to protect workers.",
      },
      {
        title: "Sanctuary Cities",
        statement:
          "I support sanctuary cities protecting undocumented immigrants from deportation because everyone deserves safety and dignity.",
      },
    ],
  },
  {
    category: "Economy & Welfare",
    topics: [
      {
        title: "Taxation & Fairness",
        statement:
          "I believe the wealthy should pay much higher taxes because they have more than they need and society has helped them succeed.",
      },
      {
        title: "Welfare & Personal Responsibility",
        statement:
          "I oppose expanding welfare programs like SNAP and housing assistance because people should work hard and take personal responsibility instead of relying on government handouts.",
      },
      {
        title: "Minimum Wage",
        statement:
          "I support a $15 minimum wage because everyone deserves a living wage, even if it means some small businesses might struggle or close.",
      },
    ],
  },
  {
    category: "Rights & Freedoms",
    topics: [
      {
        title: "Gun Rights & School Safety",
        statement:
          "I'm a strong Second Amendment supporter and oppose gun control measures, even though I'm deeply concerned about school shootings.",
      },
      {
        title: "Free Speech & Hate Speech",
        statement:
          "I support absolute free speech and oppose any content moderation or 'cancel culture' because all speech should be protected, even offensive speech.",
      },
      {
        title: "Voting Rights & Election Security",
        statement:
          "I support voter ID laws and limiting mail-in voting because election security is critical, even if it makes voting harder for some people.",
      },
    ],
  },
  {
    category: "Environment & Energy",
    topics: [
      {
        title: "Climate Change & Economy",
        statement:
          "I acknowledge climate change is real but oppose aggressive climate regulations because they'll hurt jobs and the economy.",
      },
      {
        title: "Fossil Fuels vs. Renewables",
        statement:
          "I believe we need to transition away from fossil fuels immediately to save the planet, even if it causes economic disruption and job losses in coal and oil industries.",
      },
    ],
  },
  {
    category: "Justice & Policing",
    topics: [
      {
        title: "Law & Order & Police Reform",
        statement:
          "I support law and order and back the blue, but I also think police officers who abuse their power should face consequences.",
      },
      {
        title: "Defund the Police",
        statement:
          "I support defunding the police and redirecting resources to community programs, mental health services, and social workers to address root causes of crime.",
      },
      {
        title: "Criminal Justice Reform",
        statement:
          "I believe we need to be tough on crime with longer sentences, but I also think our prison system is broken and we incarcerate too many people.",
      },
    ],
  },
]

export function PolitalkExplorer() {
  const [position, setPosition] = useState("")
  const [speakerIdentity, setSpeakerIdentity] = useState<PoliticalIdentity>("unsure")
  const [speakerValues, setSpeakerValues] = useState<PoliticalValue[]>([])
  const [listenerIdentity, setListenerIdentity] = useState<PoliticalIdentity>("unsure")
  const [listenerValues, setListenerValues] = useState<PoliticalValue[]>([])
  const [loading, setLoading] = useState(false)
  const [showTopicLibrary, setShowTopicLibrary] = useState(false)
  const [analysis, setAnalysis] = useState<{
    underlyingValues: string
    moralFramework: string
    whyTheyBelieve: string
    commonMisunderstandings: string
    bridgingQuestions: string[]
  } | null>(null)

  const detectMismatch = () => {
    if (!position.trim() || speakerIdentity === "unsure") return null

    const posLower = position.toLowerCase()

    // Conservative indicators (support these positions)
    const conservativeIndicators = [
      "pro-life",
      "border security",
      "second amendment",
      "personal responsibility",
      "religious freedom",
      "law and order",
      "traditional family",
    ]

    // Progressive indicators (support these positions)
    const progressiveIndicators = [
      "sanctuary cit",
      "defund",
      "climate action",
      "living wage",
      "taxing the rich",
      "wealth redistribution",
    ]

    // Check for negation words that flip the meaning
    const hasNegation = (text: string, keyword: string) => {
      const keywordIndex = text.indexOf(keyword)
      if (keywordIndex === -1) return false

      const beforeKeyword = text.substring(Math.max(0, keywordIndex - 50), keywordIndex)
      return (
        beforeKeyword.includes("don't support") ||
        beforeKeyword.includes("oppose") ||
        beforeKeyword.includes("against") ||
        beforeKeyword.includes("don't think") ||
        beforeKeyword.includes("shouldn't") ||
        beforeKeyword.includes("don't believe")
      )
    }

    // Count conservative vs progressive indicators (accounting for negations)
    let conservativeScore = 0
    let progressiveScore = 0

    conservativeIndicators.forEach((indicator) => {
      if (posLower.includes(indicator)) {
        conservativeScore++
      }
    })

    progressiveIndicators.forEach((indicator) => {
      if (posLower.includes(indicator) && !hasNegation(posLower, indicator)) {
        progressiveScore++
      }
    })

    // Also check for opposition to progressive policies (counts as conservative)
    if (
      posLower.includes("universal healthcare") &&
      (hasNegation(posLower, "universal healthcare") || posLower.includes("don't think") || posLower.includes("oppose"))
    ) {
      conservativeScore++
    }

    if (
      posLower.includes("welfare") &&
      (hasNegation(posLower, "welfare") || posLower.includes("handout") || posLower.includes("oppose"))
    ) {
      conservativeScore++
    }

    // Only show warning if there's a clear mismatch (score difference > 1)
    if (conservativeScore > progressiveScore + 1) {
      if (speakerIdentity === "progressive" || speakerIdentity === "liberal") {
        return "The position you entered seems conservative, but you selected a liberal/progressive identity for the speaker. Did you mean to swap the identities?"
      }
    }

    if (progressiveScore > conservativeScore + 1) {
      if (speakerIdentity === "conservative") {
        return "The position you entered seems progressive/liberal, but you selected a conservative identity for the speaker. Did you mean to swap the identities?"
      }
    }

    return null
  }

  const handleExplore = async () => {
    if (!position.trim() || speakerIdentity === "unsure") {
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/clarity/politalk-explore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position,
          politicalIdentity: speakerIdentity,
          politicalValues: speakerValues,
          yourIdentity: listenerIdentity,
          yourValues: listenerValues,
        }),
      })

      if (!response.ok) throw new Error("Failed to analyze position")

      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      console.error("Error exploring position:", error)
    } finally {
      setLoading(false)
    }
  }

  const selectTopic = (statement: string) => {
    setPosition(statement)
    setShowTopicLibrary(false)
    setAnalysis(null)
  }

  const mismatchWarning = detectMismatch()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Link
          href="/apps/clarity"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clarity Coach
        </Link>
        <h1 className="text-4xl font-bold text-foreground">PoliTalk Explorer</h1>
        <p className="text-lg text-muted-foreground">
          Understand the moral frameworks and worldviews behind political positions
        </p>
      </div>

      {/* Introduction */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex gap-4">
          <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Why PoliTalk Explorer?</h2>
            <p className="text-sm text-muted-foreground">
              Political positions often seem contradictory from the outside. A conservative might be "pro-life" while
              supporting policies that limit food assistance for children. A progressive might champion "free speech"
              while supporting content moderation.
            </p>
            <p className="text-sm text-muted-foreground">
              These aren't contradictions—they stem from different <strong>moral frameworks</strong> and{" "}
              <strong>value hierarchies</strong>. This tool helps you understand the underlying worldview that makes
              these positions internally consistent to the person holding them.
            </p>
          </div>
        </div>
      </Card>

      {/* Input Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="position" className="text-base font-semibold">
                Political Position or Statement
              </Label>
              <Button variant="outline" size="sm" onClick={() => setShowTopicLibrary(!showTopicLibrary)}>
                <BookOpen className="w-4 h-4 mr-2" />
                {showTopicLibrary ? "Hide" : "Browse"} Topic Library
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Enter a political position, statement, or set of beliefs you want to understand better
            </p>

            {showTopicLibrary && (
              <Card className="p-4 mb-4 bg-muted/50 max-h-[400px] overflow-y-auto">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Common Political Topics
                </h4>
                <div className="space-y-4">
                  {TOPIC_LIBRARY.map((category, catIdx) => (
                    <div key={catIdx}>
                      <h5 className="text-xs font-medium text-muted-foreground mb-2">{category.category}</h5>
                      <div className="space-y-2">
                        {category.topics.map((topic, topicIdx) => (
                          <button
                            key={topicIdx}
                            onClick={() => selectTopic(topic.statement)}
                            className="w-full text-left p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                          >
                            <p className="text-sm font-medium text-foreground mb-1">{topic.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{topic.statement}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Textarea
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Example: 'I'm pro-life and support the sanctity of life, but I don't think the government should provide welfare benefits or universal healthcare because people need to take personal responsibility.'"
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Step 1: About Them
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <Card className="p-5 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      The Person Holding This Belief
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Tell us about the person whose viewpoint you're trying to understand
                    </p>
                  </div>
                </div>

                <PoliticalIdentitySelector
                  label="Their Political Identity"
                  value={speakerIdentity}
                  onChange={setSpeakerIdentity}
                  tooltip="What is their general political orientation?"
                />

                {speakerIdentity !== "unsure" && (
                  <PoliticalValuesSelector
                    label="Their Key Values (if known)"
                    selectedValues={speakerValues}
                    onChange={setSpeakerValues}
                  />
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Step 2: About You
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <Card className="p-5 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
                    <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-emerald-900 dark:text-emerald-100 mb-1">
                      Your Perspective
                    </h4>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      Your political views help us explain their beliefs in ways that resonate with your values
                    </p>
                  </div>
                </div>

                <PoliticalIdentitySelector
                  label="Your Political Identity"
                  value={listenerIdentity}
                  onChange={setListenerIdentity}
                  tooltip="What is your general political orientation?"
                />

                {listenerIdentity !== "unsure" && (
                  <PoliticalValuesSelector
                    label="Your Key Values (optional)"
                    selectedValues={listenerValues}
                    onChange={setListenerValues}
                  />
                )}
              </div>
            </Card>
          </div>

          {mismatchWarning && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Possible Configuration Mismatch:</strong> {mismatchWarning}
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleExplore}
            disabled={loading || !position.trim() || speakerIdentity === "unsure"}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Worldview...
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4 mr-2" />
                Explore This Position
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <GitCompare className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Underlying Moral Framework</h3>
                <p className="text-sm text-muted-foreground">
                  The worldview and value system that makes this position internally consistent
                </p>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground whitespace-pre-wrap">{analysis.moralFramework}</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Lightbulb className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Core Values at Play</h3>
                <p className="text-sm text-muted-foreground">What they prioritize and why</p>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground whitespace-pre-wrap">{analysis.underlyingValues}</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <MessageCircle className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Why They Believe What They Believe</h3>
                <p className="text-sm text-muted-foreground">The thought process and reasoning behind their position</p>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground whitespace-pre-wrap">{analysis.whyTheyBelieve}</p>
            </div>
          </Card>

          <Card className="p-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
            <div className="flex items-start gap-3 mb-4">
              <GitCompare className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Common Misunderstandings</h3>
                <p className="text-sm text-muted-foreground">
                  Where people from other worldviews often misinterpret this position
                </p>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground whitespace-pre-wrap">{analysis.commonMisunderstandings}</p>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3 mb-4">
              <MessageCircle className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Questions for Deeper Understanding</h3>
                <p className="text-sm text-muted-foreground">
                  Ask these to explore their worldview with curiosity, not judgment
                </p>
              </div>
            </div>
            <ul className="space-y-2">
              {analysis.bridgingQuestions.map((question, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    {idx + 1}
                  </Badge>
                  <span className="text-sm text-foreground flex-1">{question}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  )
}
