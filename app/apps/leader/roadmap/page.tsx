import { Card } from "@/components/ui/card"
import { Circle, Clock } from "lucide-react"

export default function LeaderRoadmapPage() {
  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Leadership Leader Roadmap</h1>
        <p className="text-muted-foreground mb-8">
          Building a leadership development platform with transparency. This roadmap shows our progress from Alpha
          (Foundational Features) to Beta (Enhanced Features) to Gamma (Premium Features).
        </p>

        <div className="space-y-6">
          {/* Alpha 0.1 - In Progress */}
          <Card className="p-6 border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3 mb-4">
              <Clock className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Alpha 0.1</h2>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs rounded-full font-medium">
                    In Development
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Foundation: Core Structure & Alpha Banner</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    Created Leadership Leader brand identity with green color palette representing growth and
                    development
                  </li>
                  <li>
                    Built prominent Alpha Warning Banner across all pages to clearly communicate early-stage status and
                    potential instability
                  </li>
                  <li>
                    Implemented dismissible banner with session persistence so users can hide after acknowledgment
                  </li>
                  <li>Designed navigation structure matching Clarity Coach patterns for brand consistency</li>
                  <li>
                    Created LeaderLogo component with mountain/growth metaphor matching HearthArch and ClarityLogo
                    design language
                  </li>
                  <li>Established design tokens in globals.css for consistent emerald green theming throughout app</li>
                  <li>
                    Built dashboard with product status cards showing "Working", "In Progress", and "Planned" features
                    with clear progress indicators
                  </li>
                  <li>Placeholder pages for Scenarios, Growth Tracking, and Settings with development status badges</li>
                  <li>Integrated into Hearthside Works main site with Services section showcase</li>
                  <li>Created dedicated roadmap and changelog pages for transparency</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Alpha 0.2 - Planned */}
          <Card className="p-6 border-border">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Alpha 0.2</h2>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    Planned
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">RAG System: Leadership Knowledge Base</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Build comprehensive RAG system focused on leadership theories, practices, and applications</li>
                  <li>
                    Curate and upload expert documents covering transformational leadership, servant leadership,
                    situational leadership
                  </li>
                  <li>
                    Add research on difficult conversations, feedback delivery, conflict resolution, and psychological
                    safety
                  </li>
                  <li>Include leadership models: adaptive leadership, authentic leadership, ethical leadership</li>
                  <li>Integrate emotional intelligence frameworks and self-awareness practices</li>
                  <li>Add team dynamics research: Tuckman stages, high-performing teams, trust-building</li>
                  <li>
                    Cover power dynamics, organizational culture, change management, and strategic thinking frameworks
                  </li>
                  <li>Include diversity, equity, and inclusion in leadership contexts</li>
                  <li>Add coaching and mentorship best practices</li>
                  <li>Create upload scripts and database schema for leadership_documents collection with embeddings</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Alpha 0.3 - Planned */}
          <Card className="p-6 border-border">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Alpha 0.3</h2>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    Planned
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Scenario Simulator: AI-Powered Practice Conversations
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    Build scenario library with 10+ common difficult leadership conversations (performance feedback,
                    team conflict, etc.)
                  </li>
                  <li>Create AI conversation simulator with realistic employee personas and response patterns</li>
                  <li>Implement branching conversation paths based on leader's choices</li>
                  <li>Add real-time coaching suggestions during practice conversations</li>
                  <li>Build scenario completion tracking and progress metrics</li>
                  <li>Create post-conversation analysis showing strengths and improvement areas</li>
                  <li>Add difficulty levels: beginner, intermediate, advanced scenarios</li>
                  <li>Implement custom scenario creation for organization-specific situations</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 1.0 - Planned */}
          <Card className="p-6 border-border">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 1.0</h2>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    Planned
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Growth Tracking: Progress & Development Metrics
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Build comprehensive dashboard showing leadership competency progress over time</li>
                  <li>
                    Track practice frequency, scenario completion rates, and skill improvement across different
                    competencies
                  </li>
                  <li>
                    Create visual progress charts for key areas: feedback delivery, conflict resolution, team building,
                    etc.
                  </li>
                  <li>Implement goal-setting system for targeted skill development</li>
                  <li>Add reflection journal for capturing insights and learnings from practice sessions</li>
                  <li>Create milestone celebrations and achievement badges</li>
                  <li>Build export functionality for sharing progress with coaches or mentors</li>
                  <li>Add peer comparison (anonymized) to show growth relative to other leaders</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Beta 2.0 - Planned */}
          <Card className="p-6 border-border">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Beta 2.0</h2>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    Planned
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">360 Feedback: Multi-Rater Assessment</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Build 360-degree feedback collection system for gathering input from team, peers, managers</li>
                  <li>Create anonymous feedback surveys with standardized leadership competency questions</li>
                  <li>Implement feedback aggregation and visualization with strengths/gaps analysis</li>
                  <li>Add comparison between self-assessment and others' perceptions</li>
                  <li>Create action planning tools based on feedback insights</li>
                  <li>Build progress tracking over multiple 360 cycles to show development over time</li>
                  <li>Add integration with scenario simulator to target specific feedback areas</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Gamma 1.0 - Planned */}
          <Card className="p-6 border-border">
            <div className="flex items-start gap-3 mb-4">
              <Circle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Gamma 1.0</h2>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-400 text-xs rounded-full font-medium">
                    Premium
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Team Features: Organizational Leadership Development
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Multi-user accounts for entire leadership teams</li>
                  <li>Organization-wide scenario libraries customized to company culture</li>
                  <li>Manager dashboards for tracking team leadership development</li>
                  <li>Cohort-based learning programs with scheduled scenarios and group reflection</li>
                  <li>Integration with Learning Management Systems (LMS)</li>
                  <li>Custom reporting for HR and L&D teams</li>
                  <li>White-label options for enterprise clients</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
