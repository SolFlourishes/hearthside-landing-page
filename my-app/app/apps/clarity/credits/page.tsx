import { Card } from "@/components/ui/card"

export default function CreditsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6">Credits</h1>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Founder & Lead Architect</h2>
            <p className="text-muted-foreground mb-2">
              <strong>Sol Roberts-Lieb, Ed.D.</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Dr. Roberts-Lieb is an educator, researcher, and advocate for neurodivergent communication. Their work
              focuses on bridging the Double Empathy Problem and creating tools that foster genuine understanding across
              communication differences.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Research Foundation</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Clarity Coach is built on decades of research in communication theory, neurodiversity, and pragmatic
              language. Our AI is enhanced with a curated knowledge base of expert research through Retrieval-Augmented
              Generation (RAG).
            </p>

            <h3 className="font-semibold text-foreground mb-3 mt-6">
              RAG Knowledge Base - Phase 1: Neurodiversity and Empathy
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Our AI draws from the following expert sources to provide evidence-based guidance:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
              <li>The Double Empathy Problem and autistic communication patterns</li>
              <li>ADHD communication characteristics and challenges</li>
              <li>Neurodiversity frameworks and inclusive communication practices</li>
              <li>Pragmatic language differences across neurotypes</li>
              <li>Evidence-based strategies for bridging communication gaps</li>
              <li>Research on direct vs. indirect communication styles</li>
              <li>Sensory processing and communication preferences</li>
              <li>Executive function impacts on communication</li>
              <li>Masking, camouflaging, and authentic communication</li>
              <li>Mutual understanding and reciprocal accommodation</li>
            </ul>

            <h3 className="font-semibold text-foreground mb-3 mt-6">Key Theoretical Influences</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
              <li>The Double Empathy Problem (Milton, 2012)</li>
              <li>Grice's Cooperative Principle and Conversational Maxims</li>
              <li>High-Context vs. Low-Context Communication (Hall, 1976)</li>
              <li>Neurodiversity paradigm and social model of disability</li>
              <li>Generational communication differences and workplace dynamics</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Technology</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Clarity Coach is powered by advanced AI language models and built with modern web technologies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Next.js and React for the user interface</li>
              <li>OpenAI GPT models for natural language processing</li>
              <li>Firebase for data storage and feedback collection</li>
              <li>Vercel for hosting and deployment</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Community</h2>
            <p className="text-muted-foreground leading-relaxed">
              Special thanks to our beta testers, feedback contributors, and the neurodivergent community for their
              invaluable insights and support in shaping this tool. Your voices have been essential in creating
              something that truly serves the goal of mutual understanding.
            </p>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Open Source</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe in transparency and community-driven development. While the core AI models are proprietary, we
              are committed to sharing our research findings and contributing to open conversations about communication
              accessibility.
            </p>
          </Card>
        </div>
      </div>
    </main>
  )
}
