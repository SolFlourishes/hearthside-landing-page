import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HowToUsePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6">How to Use Clarity Coach</h1>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Draft Mode</h2>
            <p className="text-muted-foreground mb-4">
              Use Draft Mode when you need to compose a clear, effective message.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Enter your intent (what you want to achieve with your message)</li>
              <li>Write your draft (your raw thoughts or key points)</li>
              <li>Select your communication style and your audience's style</li>
              <li>Optionally, use Advanced Options to specify neurotypes and generations</li>
              <li>Click "Translate" to receive a polished draft and explanation</li>
              <li>Edit the AI's suggestion if needed and re-analyze for feedback</li>
            </ol>
            <Link href="/apps/clarity/draft">
              <Button className="mt-4">Try Draft Mode</Button>
            </Link>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Analyze Mode</h2>
            <p className="text-muted-foreground mb-4">
              Use Analyze Mode when you've received a message and want to understand its intent.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Paste the message you received</li>
              <li>Provide context about the situation (optional but helpful)</li>
              <li>Select communication styles for both sender and receiver</li>
              <li>Click "Analyze" to decode the likely intent and subtext</li>
              <li>Review the explanation to understand potential interpretations</li>
            </ol>
            <Link href="/apps/clarity/analyze">
              <Button className="mt-4">Try Analyze Mode</Button>
            </Link>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Chat Mode</h2>
            <p className="text-muted-foreground mb-4">
              Use Chat Mode for real-time coaching on navigating tricky conversations.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Describe your communication challenge or question</li>
              <li>Have a back-and-forth conversation with the AI coach</li>
              <li>Get personalized advice, strategies, and examples</li>
              <li>Ask follow-up questions to dive deeper</li>
            </ol>
            <Link href="/apps/clarity/chat">
              <Button className="mt-4">Try Chat Mode</Button>
            </Link>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Tips for Best Results</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Be specific about your intent and context—the more detail, the better the translation</li>
              <li>Use Advanced Options when you know specific details about neurotypes or generations</li>
              <li>Provide feedback on translations to help improve the AI</li>
              <li>Edit and re-analyze AI suggestions to create your perfect message</li>
              <li>Remember: The AI is a coach, not a crutch—use it to build your own skills over time</li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  )
}
