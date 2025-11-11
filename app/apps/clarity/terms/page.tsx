import { Card } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="font-serif text-4xl font-bold mb-2">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last Updated: January 2025</p>

      <Card className="p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing and using Clarity Coach ("the Service"), you accept and agree to be bound by these Terms of
            Service. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Clarity Coach is a communication coaching tool that helps users improve their written communication by:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Translating messages between different communication styles</li>
            <li>Analyzing received messages for tone and intent</li>
            <li>Providing research-backed communication guidance</li>
            <li>Offering age-appropriate communication support (Clarity Coach Junior)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Important Limitations</h2>
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-3">
            <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
              Clarity Coach is NOT a substitute for professional services:
            </p>
            <ul className="list-disc list-inside text-amber-800 dark:text-amber-200 space-y-1 ml-4">
              <li>Not a licensed therapist or mental health professional</li>
              <li>Not a medical doctor or healthcare provider</li>
              <li>Not a crisis counselor or emergency service</li>
              <li>Not a legal advisor or attorney</li>
            </ul>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            For mental health crises, please contact 988 Suicide & Crisis Lifeline or your local emergency services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Acceptable Use Policy</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">You agree NOT to use the Service to:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Plan or promote illegal activities</li>
            <li>Create explicit sexual content or harassment</li>
            <li>Generate hate speech or discriminatory content</li>
            <li>Violate the rights of others</li>
            <li>Attempt to bypass safety systems or rate limits</li>
            <li>Use automated systems to abuse the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Age Requirements & Parental Consent</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold mb-2">Anonymous Access (All Ages)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Users of any age may use Clarity Coach in anonymous mode without creating an account. No personal data
                is collected in this mode.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Full Access (Ages 13+)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Users aged 13 and older may create accounts and access all features including conversation history.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Supervised Access (Under 13)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Children under 13 may use the Service with verifiable parental consent in compliance with COPPA
                (Children's Online Privacy Protection Act).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Safety & Content Moderation</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We employ automated safety systems to detect and respond to concerning content including:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Crisis situations (self-harm, suicide, violence)</li>
            <li>Illegal activities</li>
            <li>Inappropriate sexual content</li>
            <li>Age-inappropriate content for Clarity Coach Junior</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Concerning interactions may be logged for safety review. We may contact emergency services if we believe
            someone is in immediate danger.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Rate Limits</h2>
          <p className="text-muted-foreground leading-relaxed">
            To prevent abuse and ensure fair access, we implement rate limits on Service usage. Anonymous users have
            lower limits than authenticated users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            You retain ownership of content you input into the Service. By using the Service, you grant us permission to
            process your content to provide the Service. AI-generated suggestions are provided as-is and you are
            responsible for reviewing and editing them before use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Disclaimer of Warranties</h2>
          <p className="text-muted-foreground leading-relaxed">
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. We do not guarantee that AI-generated
            suggestions will be accurate, appropriate, or effective for your situation. You are solely responsible for
            how you use the Service and any communications you send.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            To the maximum extent permitted by law, Hearthside Works and Clarity Coach shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">11. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify these Terms at any time. Continued use of the Service after changes
            constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">12. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            For questions about these Terms, please contact us through our support channels at Hearthside Works.
          </p>
        </section>
      </Card>
    </main>
  )
}
