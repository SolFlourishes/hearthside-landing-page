import { Card } from "@/components/ui/card"
import { Check, Circle } from "lucide-react"

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6">Product Roadmap</h1>
        <p className="text-muted-foreground mb-8">
          Our vision for the future of Clarity Coach and how we're building toward it.
        </p>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-primary mb-2">Alpha v1.0 (Completed)</h2>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Intent-first design for accurate analysis</li>
                  <li>Draft and Analyze modes</li>
                  <li>Communication style selectors</li>
                  <li>Basic neurotype and generation support</li>
                  <li>Feedback system with star ratings</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-primary">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-primary mt-1 flex-shrink-0 fill-primary" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-primary mb-2">Beta Phase (Current)</h2>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Golden Feedback Loop: User-edited translations as training data</li>
                  <li>Smarter Brain: RAG system with scholarly articles from Zotero</li>
                  <li>Advanced Modes: Enhanced generational and DISC profile selectors</li>
                  <li>Behavioral Translator: Decode non-verbal actions and situational subtext</li>
                  <li>Chat Mode improvements with conversation history</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-primary mb-2">v1.0 Launch (Planned)</h2>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>User accounts and authentication</li>
                  <li>Dynamic Contact Profiles: Save communication preferences for frequent contacts</li>
                  <li>Premium tier with advanced features</li>
                  <li>Elder Program: Community-supported subscriptions</li>
                  <li>Mobile app (iOS and Android)</li>
                  <li>Browser extension for real-time email/message assistance</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-primary mb-2">Future Vision</h2>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Team collaboration features for workplace communication</li>
                  <li>Integration with email clients and messaging platforms</li>
                  <li>Voice-to-text analysis for verbal communication</li>
                  <li>Multilingual support</li>
                  <li>API for third-party integrations</li>
                  <li>Community-contributed communication patterns and templates</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
