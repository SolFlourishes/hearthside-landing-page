import { Card } from "@/components/ui/card"

export default function LeaderChangelogPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6">Leadership Leader Changelog</h1>
        <p className="text-muted-foreground mb-8">
          Track updates, improvements, and new features as we build Leadership Leader.
        </p>

        <div className="space-y-6">
          {/* Alpha v0.1 */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Alpha v0.1</h2>
              <span className="text-sm text-muted-foreground">Current Version - November 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">Foundation: Core Structure & Alpha Banner</h3>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Brand Identity & Design System</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Created Leadership Leader brand identity with emerald green (--color-leader-primary: 16 185 129)
                representing growth and leadership development
              </li>
              <li>
                Designed LeaderLogo component featuring upward mountain/growth metaphor with three ascending peaks in
                emerald gradient
              </li>
              <li>
                Logo design matches Hearthside Works family aesthetic alongside HearthArch and ClarityLogo for cohesive
                product suite
              </li>
              <li>Added design tokens to globals.css for consistent emerald theming throughout Leadership Leader</li>
              <li>
                Implemented matching typography, spacing, and layout patterns with Clarity Coach for familiar user
                experience
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Alpha Warning System</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Built prominent AlphaBanner component displayed at top of every Leadership Leader page with clear
                warning message
              </li>
              <li>
                Banner communicates early-stage status, potential bugs, and incomplete features with amber color scheme
                for visibility
              </li>
              <li>Implemented dismissible functionality with session storage to persist user's "hide" preference</li>
              <li>
                Banner automatically reappears in new sessions to ensure users are consistently aware of alpha status
              </li>
              <li>Added alert triangle icon and "Alpha Version" label for immediate visual recognition</li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Navigation & Layout</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Created LeaderNav component matching Clarity Coach navigation patterns with mobile-responsive design
              </li>
              <li>Implemented navigation structure: Dashboard, Scenarios, Growth, Settings, Roadmap, Changelog</li>
              <li>Added LeaderLogo to navigation header with link to Leadership Leader homepage</li>
              <li>Created layout.tsx wrapper applying consistent header, navigation, and alpha banner to all pages</li>
              <li>Integrated Leadership Leader into main Hearthside Works navigation for cross-app discoverability</li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Dashboard & Product Status</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Built dashboard with hero section introducing Leadership Leader mission and AI-powered practice approach
              </li>
              <li>
                Created Product Status card with three categories: "Currently Working" (basic structure), "In Progress"
                (scenario simulator, growth tracking), "On the Roadmap" (360 feedback, team features)
              </li>
              <li>
                Added Feature Preview grid showcasing four core capabilities: AI Conversation Simulator, Growth
                Tracking, 360 Feedback, Leadership Library
              </li>
              <li>Each feature card displays clear "Coming Soon" badge and development progress bars</li>
              <li>
                Implemented Development Roadmap section on dashboard with visual timeline showing Alpha 0.1 through
                Gamma 1.0
              </li>
              <li>Added progress indicators and completion percentages for transparent development tracking</li>
              <li>
                Created "Expected Release" timeline cards estimating Alpha 0.2 (January 2026), Alpha 0.3 (March 2026),
                Beta 1.0 (June 2026)
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Placeholder Pages</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Created Scenarios page placeholder with "Coming in Alpha 0.3" banner and description of AI-powered
                practice conversations
              </li>
              <li>Built Growth page placeholder showing future competency tracking and progress visualization</li>
              <li>Added Settings page with basic profile preferences and notification settings structure</li>
              <li>All placeholder pages include clear development status badges and estimated release timelines</li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Documentation & Transparency</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Created comprehensive Roadmap page documenting development phases from Alpha 0.1 through Gamma 1.0
              </li>
              <li>
                Built Changelog page to track all updates, improvements, and new features as development progresses
              </li>
              <li>Added detailed feature descriptions and implementation plans for each development milestone</li>
              <li>
                Roadmap organized into clear phases: Foundation (Alpha 0.1), RAG System (Alpha 0.2), Scenario Simulator
                (Alpha 0.3), Growth Tracking (Beta 1.0), 360 Feedback (Beta 2.0), Team Features (Gamma 1.0)
              </li>
            </ul>

            <h4 className="text-base font-semibold text-foreground mb-2 mt-4">Main Site Integration</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Added Leadership Leader to Hearthside Works Services section with prominent showcase alongside Clarity
                Coach
              </li>
              <li>
                Created service card with Leadership Leader description, key features, Alpha 0.1 badge, and hero image
              </li>
              <li>
                Implemented consistent visual treatment matching Clarity Coach showcase for product family cohesion
              </li>
              <li>Added "Learn More" button linking directly to Leadership Leader landing page</li>
            </ul>

            <p className="mt-4 text-sm text-muted-foreground italic">
              Alpha 0.1 establishes Leadership Leader's foundation with clear alpha status communication, brand identity
              within the Hearthside Works family, and transparent development roadmap. The focus is on setting
              expectations and building core structure before adding functional features in Alpha 0.2+.
            </p>
          </Card>
        </div>
      </div>
    </main>
  )
}
