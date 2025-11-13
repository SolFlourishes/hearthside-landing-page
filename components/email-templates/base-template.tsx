import type React from "react"
interface BaseEmailTemplateProps {
  children: React.ReactNode
  preheader?: string
}

export function BaseEmailTemplate({ children, preheader }: BaseEmailTemplateProps) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hearthside Works</title>
  ${preheader ? `<meta name="description" content="${preheader}">` : ""}
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f9fafb;
      color: #374151;
      line-height: 1.6;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .logo {
      width: 60px;
      height: 60px;
      margin: 0 auto 16px;
    }
    .header-title {
      color: #ffffff;
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }
    .content {
      padding: 40px 32px;
    }
    .greeting {
      font-size: 18px;
      color: #111827;
      margin-bottom: 24px;
    }
    .body-text {
      font-size: 16px;
      color: #4b5563;
      margin-bottom: 20px;
    }
    .cta-button {
      display: inline-block;
      padding: 14px 32px;
      background-color: #f97316;
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 24px 0;
      transition: background-color 0.2s;
    }
    .cta-button:hover {
      background-color: #ea580c;
    }
    .footer {
      background-color: #f9fafb;
      padding: 32px 20px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer-text {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 12px;
    }
    .footer-links {
      margin: 16px 0;
    }
    .footer-link {
      color: #f97316;
      text-decoration: none;
      margin: 0 12px;
      font-size: 14px;
    }
    .unsubscribe {
      font-size: 12px;
      color: #9ca3af;
      margin-top: 20px;
    }
    .divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 32px 0;
    }
  </style>
</head>
<body>
  ${preheader ? `<div style="display: none; max-height: 0; overflow: hidden;">${preheader}</div>` : ""}
  <div class="email-container">
    <div class="header">
      <img src="/images/design-mode/hearthside-arch-logo.png" alt="Hearthside Works" class="logo" />
      <h1 class="header-title">Hearthside Works</h1>
    </div>
    <div class="content">
      ${children}
    </div>
    <div class="footer">
      <p class="footer-text">Building bridges through understanding</p>
      <div class="footer-links">
        <a href="https://hearthsideworks.com" class="footer-link">Visit Website</a>
        <a href="https://hearthsideworks.com/apps/clarity" class="footer-link">Clarity Coach</a>
        <a href="https://hearthsideworks.com/contact" class="footer-link">Contact Us</a>
      </div>
      <p class="unsubscribe">
        You're receiving this because you have an account with Hearthside Works.<br>
        <a href="{{unsubscribe_url}}" style="color: #9ca3af;">Update preferences</a> or 
        <a href="{{unsubscribe_url}}" style="color: #9ca3af;">unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>`
}
