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

            <h3 className="font-semibold text-foreground mb-3 mt-6">Key Theoretical Influences</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm leading-relaxed">
              <li>
                <strong>The Double Empathy Problem:</strong> The foundational theory that communication difficulties
                between autistic and non-autistic people are a bi-directional, mutual misunderstanding, not a deficit in
                the autistic person.
              </li>
              <li>
                <strong>Client-Centered Therapy:</strong> The core empathetic framework holding that constructive change
                requires three conditions: Congruence (genuineness), Unconditional Positive Regard, and Empathic
                Understanding.
              </li>
              <li>
                <strong>Nonviolent Communication (NVC):</strong> The practical 4-step method for practicing empathy by
                identifying and expressing Observations, Feelings, Needs, and Requests, which separates one's
                observations from evaluations.
              </li>
              <li>
                <strong>Autistic-Led Metacognition:</strong> The strengths-based finding that autistic individuals
                possess existing, useful knowledge about communication, such as using physical sensations as
                self-prompts and "trait knowledge" of partners to reduce uncertainty.
              </li>
              <li>
                <strong>The Cost of Masking:</strong> The concept that "masking" (hiding autistic traits) is an
                exhausting, high-cost strategy, and that unmasking is central to authentic autistic identity.
              </li>
              <li>
                <strong>The Dialogue & Safety Framework:</strong> The principle that successful high-stakes
                conversations depend on creating and maintaining psychological safety (through Mutual Purpose and Mutual
                Respect) to build a "Pool of Shared Meaning".
              </li>
              <li>
                <strong>The Neurobiological Model of ADHD:</strong> The reframing of ADHD not as a "deficit" but as a
                neurological condition of "attention inconsistency," often managed best with external structure.
              </li>
            </ul>

            <h3 className="font-semibold text-foreground mb-3 mt-6">Journal Articles</h3>
            <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <li className="pl-6 -indent-6">
                Crompton, C. J., Sharp, M., Axbey, H., Fletcher-Watson, S., Flynn, E. G., & Ropar, D. (2020).
                Neurotype-matching, but not being autistic, influences self and observer ratings of interpersonal
                rapport. <em>Frontiers in Psychology</em>, <em>11</em>, 586171.
                https://doi.org/10.3389/fpsyg.2020.586171
              </li>
              <li className="pl-6 -indent-6">
                Milton, D. (2012). On the ontological status of autism: The 'double empathy problem'.{" "}
                <em>Disability & Society</em>, <em>27</em>(6), 883-887. https://doi.org/10.1080/09687599.2012.710008
              </li>
              <li className="pl-6 -indent-6">
                Norris, J. E., Lei, J., & Maras, K. (2024). Adapting communication with autistic service users:
                Co-produced adaptations for medical services, employers, and the third sector. <em>Neurodiversity</em>,{" "}
                <em>2</em>. https://doi.org/10.1177/27546330241266723
              </li>
              <li className="pl-6 -indent-6">
                Silver, K., & Parsons, S. (2022). Perspectives of autistic adults on the strategies that help or hinder
                successful conversations. <em>Autism & Developmental Language Impairments</em>, <em>7</em>.
                https://doi.org/10.1177/23969415221101113
              </li>
            </ul>

            <h3 className="font-semibold text-foreground mb-3 mt-6">Books</h3>
            <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <li className="pl-6 -indent-6">
                Hallowell, E. M., & Ratey, J. J. (1994).{" "}
                <em>Driven to distraction: Recognizing and coping with Attention Deficit Disorder</em>. Pantheon Books.
              </li>
              <li className="pl-6 -indent-6">
                Patterson, K., Grenny, J., McMillan, R., & Switzler, A. (2002).{" "}
                <em>Crucial conversations: Tools for talking when stakes are high</em>. McGraw-Hill.
              </li>
              <li className="pl-6 -indent-6">
                Price, D. (2022). <em>Unmasking autism: Discovering the new faces of neurodiversity</em>. Harmony Books.
              </li>
              <li className="pl-6 -indent-6">
                Rogers, C. R. (1961). <em>On becoming a person: A therapist's view of psychotherapy</em>. Houghton
                Mifflin.
              </li>
              <li className="pl-6 -indent-6">
                Rosenberg, M. B. (1999). <em>Nonviolent communication: A language of life</em>. PuddleDancer Press.
              </li>
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
