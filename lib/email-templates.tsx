import { BaseEmailTemplate } from "@/components/email-templates/base-template"

export function welcomeEmail(userName: string): string {
  const content = `
    <p class="greeting">Welcome to Hearthside Works, ${userName}!</p>
    <p class="body-text">
      We're honored to have you join our community of bridge-builders. At Hearthside Works, 
      we believe that genuine human connection begins with understanding—and understanding 
      begins with the courage to truly listen.
    </p>
    <p class="body-text">
      Your journey starts with Clarity Coach, a tool designed not to perfect your words, 
      but to deepen your connections. It's here to help you:
    </p>
    <ul style="color: #4b5563; margin: 20px 0;">
      <li style="margin-bottom: 12px;">Understand your own communication style</li>
      <li style="margin-bottom: 12px;">Bridge generational and neurological differences</li>
      <li style="margin-bottom: 12px;">Explore different political worldviews with empathy</li>
      <li style="margin-bottom: 12px;">Say what you truly mean in ways others can hear</li>
    </ul>
    <p class="body-text">
      Ready to begin? Take the Communication Style Quiz to discover your unique voice.
    </p>
    <a href="https://hearthsideworks.com/account/communication-quiz" class="cta-button">
      Take the Quiz
    </a>
    <div class="divider"></div>
    <p class="body-text" style="font-style: italic; color: #6b7280;">
      "The most important thing in communication is hearing what isn't said." — Peter Drucker
    </p>
  `
  return BaseEmailTemplate({ children: content, preheader: "Welcome to a community of bridge-builders" })
}

export function quizReminderEmail(userName: string, lastQuizDate: string): string {
  const content = `
    <p class="greeting">Hello ${userName},</p>
    <p class="body-text">
      Communication evolves as we grow. You last took the Communication Style Quiz on 
      ${new Date(lastQuizDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.
    </p>
    <p class="body-text">
      As you've experienced new conversations, relationships, and perspectives, your communication 
      style may have shifted. Taking the quiz again helps ensure Clarity Coach continues to support 
      your authentic voice and deepen your connections.
    </p>
    <a href="https://hearthsideworks.com/account/communication-quiz" class="cta-button">
      Retake the Quiz
    </a>
    <p class="body-text" style="color: #6b7280; font-size: 14px;">
      This is just a gentle reminder—there's no pressure. Whenever you're ready.
    </p>
  `
  return BaseEmailTemplate({ children: content, preheader: "Time to refresh your communication profile" })
}

export function communicationTipEmail(userName: string, archetype: string, tip: string): string {
  const content = `
    <p class="greeting">Hello ${userName},</p>
    <p class="body-text">
      As a <strong>${archetype}</strong>, your natural communication strengths help you build 
      meaningful connections. Here's a reflection for your journey:
    </p>
    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 24px 0; border-radius: 8px;">
      <p style="color: #92400e; margin: 0; font-size: 16px;">${tip}</p>
    </div>
    <p class="body-text">
      Every conversation is an opportunity to strengthen your presence with others. Whether you're 
      drafting a message, analyzing incoming communication, or exploring different worldviews, 
      Clarity Coach is here to help you connect more deeply.
    </p>
    <a href="https://hearthsideworks.com/apps/clarity" class="cta-button">
      Open Clarity Coach
    </a>
  `
  return BaseEmailTemplate({ children: content, preheader: `Communication insight for ${archetype}s` })
}

export function featureUpdateEmail(featureName: string, description: string, linkUrl: string): string {
  const content = `
    <p class="greeting">Something new to help you connect</p>
    <p class="body-text">
      We've added a new capability to Clarity Coach: <strong>${featureName}</strong>
    </p>
    <p class="body-text">${description}</p>
    <p class="body-text">
      This new feature is designed with the same principle that guides everything we build: 
      deepening human connection through understanding.
    </p>
    <a href="${linkUrl}" class="cta-button">
      Explore ${featureName}
    </a>
    <p class="body-text" style="color: #6b7280; font-size: 14px;">
      As always, we'd love to hear how this helps (or doesn't help) you connect more meaningfully. 
      Your feedback shapes what we build.
    </p>
  `
  return BaseEmailTemplate({ children: content, preheader: `New: ${featureName}` })
}

export function savedItemConfirmationEmail(
  userName: string,
  itemType: string,
  itemTitle: string,
  itemUrl: string,
): string {
  const content = `
    <p class="greeting">Hello ${userName},</p>
    <p class="body-text">
      Your ${itemType} "${itemTitle}" has been saved and is ready whenever you need it.
    </p>
    <p class="body-text">
      We know that meaningful conversations and thoughtful communication take time and intention. 
      Having your work saved means you can return to it, share it, or reflect on your growth.
    </p>
    <a href="${itemUrl}" class="cta-button">
      View Saved ${itemType}
    </a>
    <p class="body-text" style="color: #6b7280; font-size: 14px;">
      All your saved items are in your <a href="https://hearthsideworks.com/account/conversations" style="color: #f97316;">Conversations dashboard</a>.
    </p>
  `
  return BaseEmailTemplate({ children: content, preheader: `Your ${itemType} is saved` })
}
