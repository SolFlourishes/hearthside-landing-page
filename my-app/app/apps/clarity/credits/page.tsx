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
              <li>
                <strong>Growth Mindset Theory:</strong> The framework that qualities can be cultivated through effort
                and practice (growth mindset) versus being fixed traits (fixed mindset), fundamentally affecting how
                people approach challenges and communication.
              </li>
              <li>
                <strong>Psychological Safety:</strong> The organizational climate where people feel comfortable
                expressing themselves, speaking up, and taking interpersonal risks without fear of humiliation or
                retribution.
              </li>
              <li>
                <strong>High-Context vs. Low-Context Communication:</strong> The cultural framework distinguishing
                communication styles where meaning is either embedded in context (high-context) or explicitly stated
                (low-context).
              </li>
              <li>
                <strong>Rapport-Talk vs. Report-Talk:</strong> The gender communication framework identifying women's
                tendency toward connection-building (rapport-talk) versus men's focus on status and information exchange
                (report-talk).
              </li>
              <li>
                <strong>Dramaturgical Framework:</strong> The sociological perspective viewing social interaction as
                theatrical performance, where individuals manage impressions through front-stage and back-stage
                behaviors.
              </li>
              <li>
                <strong>Generational Communication Patterns:</strong> The recognition that different generations (Baby
                Boomers, Gen X, Millennials, Gen Z) have distinct communication preferences, work values, and
                expectations shaped by their socio-historical contexts.
              </li>
              <li>
                <strong>Whole-Brain Integration:</strong> The developmental framework that mental health and resilience
                depend on integrating distinct parts of the brain (left/right, upstairs/downstairs, implicit/explicit
                memories) to work together as a cohesive whole.
              </li>
              <li>
                <strong>Parent-Mediated Early Intervention:</strong> The evidence-based approach where parents are
                trained as therapists to enhance parent-child interaction, communication skills, and synchronous
                engagement in young children with autism.
              </li>
              <li>
                <strong>Social Stories Framework:</strong> The structured intervention using perspective sentences and
                directive guidance to help individuals with autism understand social situations and appropriate
                responses.
              </li>
              <li>
                <strong>Emotion Regulation in Neurodevelopmental Conditions:</strong> The understanding that emotional
                dysregulation in autism and ADHD involves physiological hyperarousal, cognitive rigidity, and sensory
                processing differences requiring targeted support strategies.
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
                Dougherty, J. D., Loth, E., Aziz, N. A., Bullen, J., Crawley, J. N., Dallman, J., Ding, Q., Estes, A.,
                Gupta, A. R., Hanson, E., Horder, J., Howe, Y. J., Jeste, S., Jia, M., Krishnan, A., Murtagh, L., Parr,
                J., Piven, J., Pramparo, T., ... Spooren, W. (2024). A comprehensive overview of Generation Z in the
                workplace: A scoping review. <em>Journal of Workplace Behavioral Health</em>.
              </li>
              <li className="pl-6 -indent-6">
                Doherty, M., McIntyre, S., Bould, E., Heasman, B., Beresford, B., Melville, C., & Boilson, M. (2022).
                Developing an inclusive communication model for employment of autistic people: A qualitative study.{" "}
                <em>Journal of Autism and Developmental Disorders</em>, <em>52</em>(11), 4724-4738.
                https://doi.org/10.1007/s10803-021-05352-0
              </li>
              <li className="pl-6 -indent-6">
                Heasman, B., & Gillespie, A. (2019). Neurodivergent interactional strategies in response to
                non-acceptance: Developing interactional expertise. <em>Autism</em>, <em>23</em>(2), 408-421.
                https://doi.org/10.1177/1362361317729526
              </li>
              <li className="pl-6 -indent-6">
                Lau, B. Y., Leong, R., Uljarevic, M., Lerh, J. W., Rodgers, J., Hollocks, M. J., South, M., McConachie,
                H., Ozsivadjian, A., Van Hecke, A., Libove, R., Hardan, A., Leekam, S., Simonoff, E., & Magiati, I.
                (2020). Expository discourse in autistic adults: The role of verbal working memory and inhibitory
                control. <em>Journal of Autism and Developmental Disorders</em>, <em>50</em>(5), 1470-1485.
                https://doi.org/10.1007/s10803-019-03902-3
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
              <li className="pl-6 -indent-6">
                Oono, I. P., Honey, E. J., & McConachie, H. (2013). Parent-mediated early intervention for young
                children with autism spectrum disorders (ASD). <em>Cochrane Database of Systematic Reviews</em>,{" "}
                <em>2013</em>(4), CD009774. https://doi.org/10.1002/14651858.CD009774.pub2
              </li>
              <li className="pl-6 -indent-6">
                Mazefsky, C. A., & White, S. W. (2014). Emotion regulation: Concepts & practice in autism spectrum
                disorder. <em>Child and Adolescent Psychiatric Clinics of North America</em>, <em>23</em>(1), 15-24.
                https://doi.org/10.1016/j.chc.2013.07.002
              </li>
              <li className="pl-6 -indent-6">
                Kokina, A., & Kern, L. (2010). Social Story interventions for students with autism spectrum disorders: A
                meta-analysis. <em>Journal of Autism and Developmental Disorders</em>, <em>40</em>(7), 812-826.
                https://doi.org/10.1007/s10803-009-0931-0
              </li>
            </ul>

            <h3 className="font-semibold text-foreground mb-3 mt-6">Books</h3>
            <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <li className="pl-6 -indent-6">
                Dweck, C. S. (2006). <em>Mindset: The new psychology of success</em>. Random House.
              </li>
              <li className="pl-6 -indent-6">
                Edmondson, A. C. (2018).{" "}
                <em>
                  The fearless organization: Creating psychological safety in the workplace for learning, innovation,
                  and growth
                </em>
                . Wiley.
              </li>
              <li className="pl-6 -indent-6">
                Goffman, E. (1959). <em>The presentation of self in everyday life</em>. Anchor Books.
              </li>
              <li className="pl-6 -indent-6">
                Hall, E. T. (1976). <em>Beyond culture</em>. Anchor Books.
              </li>
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
              <li className="pl-6 -indent-6">
                Tannen, D. (1990). <em>You just don't understand: Women and men in conversation</em>. William Morrow.
              </li>
              <li className="pl-6 -indent-6">
                Faber, A., & Mazlish, E. (2012). <em>How to talk so kids will listen & listen so kids will talk</em>.
                Scribner.
              </li>
              <li className="pl-6 -indent-6">
                Gray, C. (2010). <em>The new social story book</em> (10th anniversary ed.). Future Horizons.
              </li>
              <li className="pl-6 -indent-6">
                Siegel, D. J., & Bryson, T. P. (2011).{" "}
                <em>The whole-brain child: 12 revolutionary strategies to nurture your child's developing mind</em>.
                Delacorte Press.
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
