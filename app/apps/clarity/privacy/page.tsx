import { Card } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="font-serif text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last Updated: January 2025</p>

      <Card className="p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Hearthside Works ("we," "our," or "us") operates Clarity Coach. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Anonymous Mode (No Account)</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">When using Clarity Coach without an account:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>We do NOT collect personal information</li>
                <li>We do NOT store conversation history</li>
                <li>We collect only: IP address (for rate limiting), usage timestamps, and browser type</li>
                <li>This data is automatically deleted after 24 hours</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Authenticated Mode (With Account)</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">When you create an account:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Email address (for account management)</li>
                <li>Conversation history (to provide continuity)</li>
                <li>Communication preferences and settings</li>
                <li>Usage patterns and feature interactions</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Safety Logging</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                For safety purposes, we may log concerning interactions including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Crisis situations (self-harm, violence, abuse)</li>
                <li>Illegal activity attempts</li>
                <li>Inappropriate content violations</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Safety logs are anonymized, encrypted, and retained only as long as necessary for safety review.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>To provide and improve the Clarity Coach Service</li>
            <li>To maintain conversation history (authenticated users only)</li>
            <li>To enforce rate limits and prevent abuse</li>
            <li>To ensure user safety and respond to crisis situations</li>
            <li>To comply with legal obligations</li>
            <li>To analyze usage patterns and improve features (aggregated data only)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. COPPA Compliance (Children Under 13)</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-900 dark:text-blue-100 leading-relaxed mb-3">
              We are committed to protecting children's privacy in compliance with the Children's Online Privacy
              Protection Act (COPPA).
            </p>
            <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-2 ml-4">
              <li>
                <strong>Anonymous Mode:</strong> Children can use Clarity Coach without providing any personal
                information
              </li>
              <li>
                <strong>No Data Collection:</strong> We do not collect, store, or share personal information from
                children in anonymous mode
              </li>
              <li>
                <strong>Parental Consent:</strong> Account creation for children under 13 requires verifiable parental
                consent
              </li>
              <li>
                <strong>Parental Rights:</strong> Parents can review, delete, or refuse further collection of their
                child's information
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Data Sharing & Disclosure</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">We do NOT sell your personal information.</p>
          <p className="text-muted-foreground leading-relaxed mb-2">We may share information only in these cases:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>
              <strong>Emergency Services:</strong> If we believe someone is in immediate danger
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or legal process
            </li>
            <li>
              <strong>Service Providers:</strong> With trusted partners who help operate the Service (under strict
              confidentiality agreements)
            </li>
            <li>
              <strong>AI Processing:</strong> Your messages are processed by Google's Gemini AI to provide coaching
              suggestions
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">We implement security measures including:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Encryption of data in transit and at rest</li>
            <li>Secure authentication systems</li>
            <li>Regular security audits</li>
            <li>Access controls and monitoring</li>
            <li>Anonymization of safety logs</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            However, no system is 100% secure. Use Clarity Coach at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Your Rights & Choices</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">You have the right to:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>
              <strong>Access:</strong> Request a copy of your data
            </li>
            <li>
              <strong>Delete:</strong> Request deletion of your account and data
            </li>
            <li>
              <strong>Correct:</strong> Update inaccurate information
            </li>
            <li>
              <strong>Export:</strong> Download your conversation history
            </li>
            <li>
              <strong>Opt-Out:</strong> Use anonymous mode to avoid data collection
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Data Retention</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>
              <strong>Anonymous Mode:</strong> Data deleted after 24 hours
            </li>
            <li>
              <strong>Conversation History:</strong> Retained until you delete your account
            </li>
            <li>
              <strong>Safety Logs:</strong> Retained for 90 days or as required by law
            </li>
            <li>
              <strong>Account Data:</strong> Deleted within 30 days of account deletion request
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            Clarity Coach uses Google's Gemini AI for processing. Your messages are sent to Google's servers for AI
            processing. Please review Google's privacy policy for information about their data practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy periodically. We will notify users of significant changes via email (for
            authenticated users) or prominent notice on the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            For privacy questions, data requests, or parental inquiries:
          </p>
          <ul className="list-none text-muted-foreground space-y-1">
            <li>Email: privacy@hearthsideworks.com</li>
            <li>Website: hearthsideworks.com/contact</li>
          </ul>
        </section>

        <section className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>For Parents:</strong> If you have questions about your child's use of Clarity Coach or wish to
            exercise your parental rights under COPPA, please contact us using the information above. We take children's
            privacy seriously and will respond promptly to all parental inquiries.
          </p>
        </section>
      </Card>
    </main>
  )
}
