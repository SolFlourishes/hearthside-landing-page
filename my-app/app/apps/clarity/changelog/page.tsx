import { Card } from "@/components/ui/card"

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6">Changelog</h1>
        <p className="text-muted-foreground mb-8">Track updates, improvements, and new features.</p>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.0.2</h2>
              <span className="text-sm text-muted-foreground">Current Version</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Integrated Clarity Coach into main Hearthside Works website</li>
              <li>Added dedicated Clarity Coach navigation header</li>
              <li>Improved mobile responsiveness across all modes</li>
              <li>Enhanced feedback system with separate ratings for explanation and response</li>
              <li>Added edit and re-analyze functionality for AI suggestions</li>
              <li>Fixed API endpoint configuration for better reliability</li>
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Beta v3.0.0</h2>
              <span className="text-sm text-muted-foreground">December 2024</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Launched Beta phase with improved AI model</li>
              <li>Added Advanced Options with neurotype and generation selectors</li>
              <li>Implemented Golden Feedback Loop for user-edited translations</li>
              <li>Enhanced explanation quality with more detailed analysis</li>
              <li>Added loading tips to educate users during translation</li>
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Alpha v1.0</h2>
              <span className="text-sm text-muted-foreground">October 2024</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Initial release with Draft and Analyze modes</li>
              <li>Intent-first design for accurate message translation</li>
              <li>Communication style selectors (direct/indirect)</li>
              <li>Basic feedback system with star ratings</li>
              <li>Copy-to-clipboard functionality</li>
              <li>Dark mode support</li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  )
}
