import { Card } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6">About Clarity Coach</h1>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Clarity Coach is a human development tool designed to bridge communication gaps and foster genuine
              understanding. We believe that miscommunication is not a personal failing—it's a natural result of
              different communication styles, neurotypes, and cultural backgrounds.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to help everyone be heard, seen, and known by providing AI-powered tools that translate
              intent into clarity.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">The Three Phases</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Phase 1: Hear Me (The Clarity)</h3>
                <p className="text-muted-foreground">
                  Achieve clarity by ensuring your literal intent is accurately received. Our Draft and Analyze modes
                  help eliminate misunderstanding and ambiguity.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Phase 2: See Me (The Recognition)</h3>
                <p className="text-muted-foreground">
                  Achieve recognition by validating your unique communication style and strengths. Our advanced features
                  help you understand and adapt to different communication preferences.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Phase 3: Know Me (The Belonging)</h3>
                <p className="text-muted-foreground">
                  Foster authentic connection and trust through our Chat mode, which provides real-time coaching for
                  navigating complex conversations and building psychological safety.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Built on Research</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Clarity Coach is grounded in communication theory, neurodiversity research, and the Double Empathy
              Problem—the understanding that communication difficulties arise from differences between people, not
              deficits within individuals. Our AI is trained to recognize and bridge these differences with empathy and
              precision.
            </p>
          </Card>
        </div>
      </div>
    </main>
  )
}
