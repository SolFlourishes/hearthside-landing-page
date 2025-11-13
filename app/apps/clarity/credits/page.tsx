import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function CreditsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-6">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Product & Technical Information</h1>
          <p className="text-muted-foreground text-lg">
            Technical architecture, research foundation, and infrastructure details for Clarity Coach
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Product Status</h2>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="default" className="text-base">
                Beta 4.5
              </Badge>
              <Badge variant="outline">Fully Functional</Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Clarity Coach is a fully functional SaaS application currently in active beta testing with real users. The
              platform processes live translations, stores user preferences, and continuously improves based on user
              feedback.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Current Capabilities:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Draft Mode translation</li>
                  <li>Analyze Mode feedback</li>
                  <li>Interactive Chat coaching</li>
                  <li>PoliTalk Explorer for political understanding</li>
                  <li>User accounts with saved preferences</li>
                  <li>Communication style profiles</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Business Model:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Freemium SaaS platform</li>
                  <li>Three-tier pricing (Free, Premium, Elder)</li>
                  <li>Elder tier sponsors access for those in need</li>
                  <li>Subscription-based revenue</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Technology Stack</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Frontend & Infrastructure</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>
                    <strong>Framework:</strong> Next.js 16 (App Router)
                  </li>
                  <li>
                    <strong>UI Library:</strong> React 19
                  </li>
                  <li>
                    <strong>Styling:</strong> Tailwind CSS v4
                  </li>
                  <li>
                    <strong>Components:</strong> shadcn/ui
                  </li>
                  <li>
                    <strong>Hosting:</strong> Vercel
                  </li>
                  <li>
                    <strong>Language:</strong> TypeScript
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Backend & Data</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>
                    <strong>Database:</strong> Supabase (PostgreSQL)
                  </li>
                  <li>
                    <strong>Authentication:</strong> Supabase Auth
                  </li>
                  <li>
                    <strong>AI Models:</strong> OpenAI GPT-4/GPT-5, Anthropic Claude
                  </li>
                  <li>
                    <strong>AI SDK:</strong> Vercel AI SDK v5
                  </li>
                  <li>
                    <strong>Storage:</strong> Vercel Blob, Supabase Storage
                  </li>
                  <li>
                    <strong>Email:</strong> Resend
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">AI Architecture</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Clarity Coach uses advanced AI language models enhanced with a curated knowledge base through
              Retrieval-Augmented Generation (RAG). The system processes communication through multiple specialized
              modes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Draft Mode:</strong> Translates messages using profile-based context and communication
                preferences
              </li>
              <li>
                <strong>Analyze Mode:</strong> Provides feedback on existing messages with improvement suggestions
              </li>
              <li>
                <strong>Chat Mode:</strong> Interactive coaching for real-time communication challenges
              </li>
              <li>
                <strong>PoliTalk Explorer:</strong> Explains political positions across different moral frameworks
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Research Foundation</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Clarity Coach is built on decades of peer-reviewed research in communication theory, neurodiversity,
              political psychology, and cross-cultural understanding. Our AI is enhanced with a curated knowledge base
              of expert research.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="theoretical-influences">
                <AccordionTrigger className="text-lg font-semibold">Key Theoretical Influences</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm leading-relaxed">
                    <li>
                      <strong>The Double Empathy Problem:</strong> The foundational theory that communication
                      difficulties between autistic and non-autistic people are a bi-directional, mutual
                      misunderstanding, not a deficit in the autistic person.
                    </li>
                    <li>
                      <strong>Client-Centered Therapy:</strong> The core empathetic framework holding that constructive
                      change requires three conditions: Congruence (genuineness), Unconditional Positive Regard, and
                      Empathic Understanding.
                    </li>
                    <li>
                      <strong>Nonviolent Communication (NVC):</strong> The practical 4-step method for practicing
                      empathy by identifying and expressing Observations, Feelings, Needs, and Requests, which separates
                      one's observations from evaluations.
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
                      conversations depend on creating and maintaining psychological safety (through Mutual Purpose and
                      Mutual Respect) to build a "Pool of Shared Meaning".
                    </li>
                    <li>
                      <strong>The Neurobiological Model of ADHD:</strong> The reframing of ADHD not as a "deficit" but
                      as a neurological condition of "attention inconsistency," often managed best with external
                      structure.
                    </li>
                    <li>
                      <strong>Growth Mindset Theory:</strong> The framework that qualities can be cultivated through
                      effort and practice (growth mindset) versus being fixed traits (fixed mindset), fundamentally
                      affecting how people approach challenges and communication.
                    </li>
                    <li>
                      <strong>Psychological Safety:</strong> The organizational climate where people feel comfortable
                      expressing themselves, speaking up, and taking interpersonal risks without fear of humiliation or
                      retribution.
                    </li>
                    <li>
                      <strong>High-Context vs. Low-Context Communication:</strong> The cultural framework distinguishing
                      communication styles where meaning is either embedded in context (high-context) or explicitly
                      stated (low-context).
                    </li>
                    <li>
                      <strong>Rapport-Talk vs. Report-Talk:</strong> The gender communication framework identifying
                      women's tendency toward connection-building (rapport-talk) versus men's focus on status and
                      information exchange (report-talk).
                    </li>
                    <li>
                      <strong>Dramaturgical Framework:</strong> The sociological perspective viewing social interaction
                      as theatrical performance, where individuals manage impressions through front-stage and back-stage
                      behaviors.
                    </li>
                    <li>
                      <strong>Generational Communication Patterns:</strong> The recognition that different generations
                      (Baby Boomers, Gen X, Millennials, Gen Z) have distinct communication preferences, work values,
                      and expectations shaped by their socio-historical contexts.
                    </li>
                    <li>
                      <strong>Whole-Brain Integration:</strong> The developmental framework that mental health and
                      resilience depend on integrating distinct parts of the brain (left/right, upstairs/downstairs,
                      implicit/explicit memories) to work together as a cohesive whole.
                    </li>
                    <li>
                      <strong>Parent-Mediated Early Intervention:</strong> The evidence-based approach where parents are
                      trained as therapists to enhance parent-child interaction, communication skills, and synchronous
                      engagement in young children with autism.
                    </li>
                    <li>
                      <strong>Social Stories Framework:</strong> The structured intervention using perspective sentences
                      and directive guidance to help individuals with autism understand social situations and
                      appropriate responses.
                    </li>
                    <li>
                      <strong>Emotion Regulation in Neurodevelopmental Conditions:</strong> The understanding that
                      emotional dysregulation in autism and ADHD involves physiological hyperarousal, cognitive
                      rigidity, and sensory processing differences requiring targeted support strategies.
                    </li>
                    <li>
                      <strong>Relevance Theory & Mutual Manifestness:</strong> The cognitive framework explaining how
                      people derive meaning through assumptions of relevance, and how communication succeeds when shared
                      contextual assumptions are mutually manifest to both parties.
                    </li>
                    <li>
                      <strong>Foucault's Discipline and Power:</strong> The critical examination of how power operates
                      through subtle mechanisms of discipline, normalization, and surveillance in social institutions,
                      creating hierarchies of "normal" versus "abnormal."
                    </li>
                    <li>
                      <strong>Cognitive Biases & Heuristics:</strong> The systematic patterns of deviation from
                      rationality in judgment (System 1 thinking), including confirmation bias, availability heuristic,
                      anchoring effect, and the framing effect that influence communication and decision-making.
                    </li>
                    <li>
                      <strong>Nonverbal Communication Channels:</strong> The multi-channel system of meaning-making
                      through facial expressions, gestures, posture, eye contact, touch, and paralanguage, which varies
                      significantly across cultures and neurotypes.
                    </li>
                    <li>
                      <strong>Hofstede's Cultural Dimensions:</strong> The framework identifying five key dimensions of
                      cultural variation: Power Distance, Individualism vs. Collectivism, Masculinity vs. Femininity,
                      Uncertainty Avoidance, and Long-Term vs. Short-Term Orientation.
                    </li>
                    <li>
                      <strong>Barrier-Free Communication:</strong> The framework emphasizing reciprocity, flexible
                      turn-taking, and acceptance of boundaries rather than strict adherence to neurotypical norms,
                      creating space for authentic cross-neurotype dialogue.
                    </li>
                    <li>
                      <strong>Neurodiverse Relationship Dynamics:</strong> Research-based understanding of facilitators
                      (shared interests, acceptance) and barriers (sensory overload, social expectations) in
                      cross-neurotype relationships, particularly autistic-allistic partnerships.
                    </li>
                    <li>
                      <strong>Moral Foundations Theory:</strong> The psychological framework identifying five universal
                      moral foundations (Care/Harm, Fairness/Cheating, Loyalty/Betrayal, Authority/Subversion,
                      Sanctity/Degradation) that are differentially weighted across the political spectrum, with
                      progressives prioritizing care and fairness while conservatives value all five foundations more
                      equally.
                    </li>
                    <li>
                      <strong>Political Identity & Motivated Reasoning:</strong> The understanding that political
                      identity functions as a powerful social identity triggering in-group favoritism, out-group
                      hostility, and identity-protective cognition that motivates reasoning toward identity-congruent
                      conclusions rather than truth-seeking.
                    </li>
                    <li>
                      <strong>Political Discourse Analysis:</strong> The systematic examination of language in political
                      contexts, including framing devices (metaphors, pronouns, agency), presuppositions, ideographs,
                      and rhetorical strategies that shape political meaning and reproduce ideologies.
                    </li>
                    <li>
                      <strong>Epistemic Differences Across Political Spectrum:</strong> The recognition that
                      conservatives and progressives prioritize different sources of knowledge—conservatives valuing
                      tradition, authority, and personal experience while progressives emphasizing empirical research,
                      expert consensus, and systemic analysis.
                    </li>
                    <li>
                      <strong>Depolarization Strategies:</strong> Evidence-based interventions including shared values
                      discovery, affective empathy development, perspective-taking exercises, and collaborative
                      problem-solving that reduce political hostility and facilitate cross-partisan understanding.
                    </li>
                    <li>
                      <strong>Hidden Rules of Economic Class:</strong> Ruby Payne's framework identifying unspoken
                      cultural cues and communication patterns that differ across poverty, middle class, and wealth -
                      including language registers (casual vs. formal), narrative structures (circular vs. linear), time
                      orientation (present vs. future), and multi-dimensional resources beyond just financial capital.
                    </li>
                    <li>
                      <strong>Critical Class Analysis:</strong> Paul Gorski's critique exposing how deficit perspectives
                      blame individuals for poverty while ignoring systemic classism, educational disparities (resource
                      inequality, curricular tracking, teacher quality gaps), and structural barriers that perpetuate
                      class hierarchy rather than addressing root causes like scarcity of living-wage jobs.
                    </li>
                    <li>
                      <strong>Trauma and the Body:</strong> Bessel van der Kolk's neuroscientific framework showing how
                      trauma is stored in the viscera and nervous system, fragmenting memory and breaking mind-body
                      connections - including polyvagal theory (social engagement, fight/flight, freeze), traumatic
                      memory fragmentation (Broca's area shutdown, thalamus dysfunction), ACE study correlations, and
                      integrated recovery pathways (EMDR, yoga, IFS, neurofeedback).
                    </li>
                    <li>
                      <strong>Indigenous Research as Ceremony:</strong> Shawn Wilson's paradigm grounding research in
                      relationality where reality itself is relationships, knowledge is relational and shared with all
                      creation, methodology is building more relations, and validity is replaced by authenticity through
                      relational accountability - emphasizing intuitive logic, synthesis over deconstruction, and the
                      inseparability of spiritual, emotional, and intellectual dimensions.
                    </li>
                    <li>
                      <strong>Ubuntu Philosophy:</strong> African communal ethics based on "A person is a person through
                      other persons" (*Umuntu ngumuntu ngabantu*), defining moral personhood through communal
                      relationships that combine identity (sharing a coordinated way of life) with solidarity (caring
                      for others' well-being through mutual aid) - emphasizing relationship preservation, collective
                      responsibility, and honoring friendships over maximizing outcomes.
                    </li>
                    <li>
                      <strong>Historical Trauma & Unresolved Grief:</strong> Maria Yellow Horse Brave Heart's framework
                      identifying cumulative emotional and psychological wounding across generations from massive group
                      trauma (genocide, slavery, forced relocation), including loyalty to ancestral suffering, impaired
                      mourning from prohibited ceremonies, and intergenerational transmission through biological
                      (epigenetics), psychological (parenting), and social/cultural (language loss) pathways - requiring
                      trauma-informed communication that honors collective identity and community healing.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="journal-articles">
                <AccordionTrigger className="text-lg font-semibold">
                  Journal Articles & Research Papers
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                    <li className="pl-6 -indent-6">
                      Graham, J., Haidt, J., & Nosek, B. A. (2009). Liberals and conservatives rely on different sets of
                      moral foundations. <em>Journal of Personality and Social Psychology</em>, <em>96</em>(5),
                      1029-1046. https://doi.org/10.1037/a0015141
                    </li>
                    <li className="pl-6 -indent-6">
                      Kahan, D. M. (2013). Ideology, motivated reasoning, and cognitive reflection.{" "}
                      <em>Judgment and Decision Making</em>, <em>8</em>(4), 407-424.
                    </li>
                    <li className="pl-6 -indent-6">
                      Mason, L. (2018). Ideologues without issues: The polarizing consequences of ideological
                      identities.
                      <em>Public Opinion Quarterly</em>, <em>82</em>(S1), 866-887. https://doi.org/10.1093/poq/nfy005
                    </li>
                    <li className="pl-6 -indent-6">
                      Wojcieszak, M., & Warner, B. R. (2020). Can interparty contact reduce affective polarization? A
                      systematic test of different forms of intergroup contact. <em>Political Communication</em>,{" "}
                      <em>37</em>(6), 789-811. https://doi.org/10.1080/10584609.2020.1760406
                    </li>
                    <li className="pl-6 -indent-6">
                      Crompton, C. J., Sharp, M., Axbey, H., Fletcher-Watson, S., Flynn, E. G., & Ropar, D. (2020).
                      Neurotype-matching, but not being autistic, influences self and observer ratings of interpersonal
                      rapport. <em>Frontiers in Psychology</em>, <em>11</em>, 586171.
                      https://doi.org/10.3389/fpsyg.2020.586171
                    </li>
                    <li className="pl-6 -indent-6">
                      Dougherty, J. D., Loth, E., Aziz, N. A., Bullen, J., Crawley, J. N., Dallman, J., Ding, Q., Estes,
                      A., Gupta, A. R., Hanson, E., Horder, J., Howe, Y. J., Jeste, S., Jia, M., Krishnan, A., Murtagh,
                      L., Parr, J., Piven, J., Pramparo, T., ... Spooren, W. (2024). A comprehensive overview of
                      Generation Z in the workplace: A scoping review. <em>Journal of Workplace Behavioral Health</em>.
                    </li>
                    <li className="pl-6 -indent-6">
                      Doherty, M., McIntyre, S., Bould, E., Heasman, B., Beresford, B., Melville, C., & Boilson, M.
                      (2022). Developing an inclusive communication model for employment of autistic people: A
                      qualitative study. <em>Journal of Autism and Developmental Disorders</em>, <em>52</em>(11),
                      4724-4738. https://doi.org/10.1007/s10803-021-05352-0
                    </li>
                    <li className="pl-6 -indent-6">
                      Heasman, B., & Gillespie, A. (2019). Neurodivergent interactional strategies in response to
                      non-acceptance: Developing interactional expertise. <em>Autism</em>, <em>23</em>(2), 408-421.
                      https://doi.org/10.1177/1362361317729526
                    </li>
                    <li className="pl-6 -indent-6">
                      Lau, B. Y., Leong, R., Uljarevic, M., Lerh, J. W., Rodgers, J., Hollocks, M. J., South, M.,
                      McConachie, H., Ozsivadjian, A., Van Hecke, A., Libove, R., Hardan, A., Leekam, S., Simonoff, E.,
                      & Magiati, I. (2020). Expository discourse in autistic adults: The role of verbal working memory
                      and inhibitory control. <em>Journal of Autism and Developmental Disorders</em>, <em>50</em>(5),
                      1470-1485. https://doi.org/10.1007/s10803-019-03902-3
                    </li>
                    <li className="pl-6 -indent-6">
                      Milton, D. (2012). On the ontological status of autism: The 'double empathy problem'.{" "}
                      <em>Disability & Society</em>, <em>27</em>(6), 883-887.
                      https://doi.org/10.1080/09687599.2012.710008
                    </li>
                    <li className="pl-6 -indent-6">
                      Norris, J. E., Lei, J., & Maras, K. (2024). Adapting communication with autistic service users:
                      Co-produced adaptations for medical services, employers, and the third sector.{" "}
                      <em>Neurodiversity</em>, <em>2</em>. https://doi.org/10.1177/27546330241266723
                    </li>
                    <li className="pl-6 -indent-6">
                      Silver, K., & Parsons, S. (2022). Perspectives of autistic adults on the strategies that help or
                      hinder successful conversations. <em>Autism & Developmental Language Impairments</em>, <em>7</em>.
                      https://doi.org/10.1177/23969415221101113
                    </li>
                    <li className="pl-6 -indent-6">
                      Oono, I. P., Honey, E. J., & McConachie, H. (2013). Parent-mediated early intervention for young
                      children with autism spectrum disorders (ASD). <em>Cochrane Database of Systematic Reviews</em>,{" "}
                      <em>2013</em>(4), CD009774. https://doi.org/10.1002/14651858.CD009774.pub2
                    </li>
                    <li className="pl-6 -indent-6">
                      Mazefsky, C. A., & White, S. W. (2014). Emotion regulation: Concepts & practice in autism spectrum
                      disorder. <em>Child and Adolescent Psychiatric Clinics of North America</em>, <em>23</em>(1),
                      15-24. https://doi.org/10.1016/j.chc.2013.07.002
                    </li>
                    <li className="pl-6 -indent-6">
                      Kokina, A., & Kern, L. (2010). Social Story interventions for students with autism spectrum
                      disorders: A meta-analysis. <em>Journal of Autism and Developmental Disorders</em>, <em>40</em>
                      (7), 812-826. https://doi.org/10.1007/s10803-009-0931-0
                    </li>
                    <li className="pl-6 -indent-6">
                      Brave Heart, M. Y. H. (2003). The historical trauma response among natives and its relationship
                      with substance abuse: A Lakota illustration. <em>Journal of Psychoactive Drugs</em>, <em>35</em>
                      (1), 7-13. https://doi.org/10.1080/02791072.2003.10399988
                    </li>
                    <li className="pl-6 -indent-6">
                      Metz, T. (2007). Toward an African moral theory. <em>The Journal of Political Philosophy</em>,{" "}
                      <em>15</em>(3), 321-341. https://doi.org/10.1111/j.1467-9760.2007.00280.x
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="books">
                <AccordionTrigger className="text-lg font-semibold">Books & Monographs</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                    <li className="pl-6 -indent-6">
                      Dweck, C. S. (2006). <em>Mindset: The new psychology of success</em>. Random House.
                    </li>
                    <li className="pl-6 -indent-6">
                      Edmondson, A. C. (2018).{" "}
                      <em>
                        The fearless organization: Creating psychological safety in the workplace for learning,
                        innovation, and growth
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
                      <em>Driven to distraction: Recognizing and coping with Attention Deficit Disorder</em>. Pantheon
                      Books.
                    </li>
                    <li className="pl-6 -indent-6">
                      Patterson, K., Grenny, J., McMillan, R., & Switzler, A. (2002).{" "}
                      <em>Crucial conversations: Tools for talking when stakes are high</em>. McGraw-Hill.
                    </li>
                    <li className="pl-6 -indent-6">
                      Price, D. (2022). <em>Unmasking autism: Discovering the new faces of neurodiversity</em>. Harmony
                      Books.
                    </li>
                    <li className="pl-6 -indent-6">
                      Rogers, C. R. (1961). <em>On becoming a person: A therapist's view of psychotherapy</em>. Houghton
                      Mifflin.
                    </li>
                    <li className="pl-6 -indent-6">
                      Rosenberg, M. B. (1999). <em>Nonviolent communication: A language of life</em>. PuddleDancer
                      Press.
                    </li>
                    <li className="pl-6 -indent-6">
                      Tannen, D. (1990). <em>You just don't understand: Women and men in conversation</em>. William
                      Morrow.
                    </li>
                    <li className="pl-6 -indent-6">
                      Faber, A., & Mazlish, E. (2012).{" "}
                      <em>How to talk so kids will listen & listen so kids will talk</em>. Scribner.
                    </li>
                    <li className="pl-6 -indent-6">
                      Gray, C. (2010). <em>The new social story book</em> (10th anniversary ed.). Future Horizons.
                    </li>
                    <li className="pl-6 -indent-6">
                      Siegel, D. J., & Bryson, T. P. (2011).{" "}
                      <em>
                        The whole-brain child: 12 revolutionary strategies to nurture your child's developing mind
                      </em>
                      . Delacorte Press.
                    </li>
                    <li className="pl-6 -indent-6">
                      Kahneman, D. (2011). <em>Thinking, fast and slow</em>. Farrar, Straus and Giroux.
                    </li>
                    <li className="pl-6 -indent-6">
                      Foucault, M. (1977). <em>Discipline and punish: The birth of the prison</em> (A. Sheridan,
                      Trans.). Pantheon Books. (Original work published 1975)
                    </li>
                    <li className="pl-6 -indent-6">
                      Hofstede, G. (1980).{" "}
                      <em>Culture's consequences: International differences in work-related values</em>. SAGE
                      Publications.
                    </li>
                    <li className="pl-6 -indent-6">
                      Knapp, M. L., Hall, J. A., & Horgan, T. G. (2013).{" "}
                      <em>Nonverbal communication in human interaction</em> (8th ed.). Wadsworth/Cengage Learning.
                    </li>
                    <li className="pl-6 -indent-6">
                      Payne, R. K. (2005). <em>A framework for understanding poverty</em> (4th ed.). aha! Process, Inc.
                    </li>
                    <li className="pl-6 -indent-6">
                      Gorski, P. C. (2008). The classist underpinnings of Ruby Payne's framework. In{" "}
                      <em>Teachers College Record</em>, <em>110</em>(6), 1422-1438.
                    </li>
                    <li className="pl-6 -indent-6">
                      van der Kolk, B. A. (2014).{" "}
                      <em>The body keeps the score: Brain, mind, and body in the healing of trauma</em>. Viking.
                    </li>
                    <li className="pl-6 -indent-6">
                      Wilson, S. (2008). <em>Research is ceremony: Indigenous research methods</em>. Fernwood
                      Publishing.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Security & Privacy</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Row Level Security (RLS) on all database tables</li>
              <li>Encrypted data storage and transmission</li>
              <li>User data isolation and privacy controls</li>
              <li>Secure authentication with Supabase Auth</li>
              <li>No third-party data sharing without explicit consent</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Community Acknowledgments</h2>
            <p className="text-muted-foreground leading-relaxed">
              Special thanks to our beta testers, feedback contributors, and the neurodivergent community for their
              invaluable insights and support in shaping this tool. Your voices have been essential in creating
              something that truly serves the goal of mutual understanding.
            </p>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Development Philosophy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe in transparency, research-backed design, and community-driven development. All features are
              grounded in peer-reviewed research and tested with real users. We are committed to sharing our findings
              and contributing to open conversations about communication accessibility and human connection.
            </p>
          </Card>
        </div>
      </div>
    </main>
  )
}
