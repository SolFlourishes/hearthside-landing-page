"use client"

export interface ConsentPreferences {
  analytics: boolean
  functional: boolean
  timestamp: string
}

export interface AgeGroup {
  type: "child" | "teen" | "adult"
  verified: boolean
  timestamp: string
}

export class ConsentManager {
  private static CONSENT_KEY = "clarity-consent"
  private static AGE_KEY = "clarity-age-group"

  static getConsent(): ConsentPreferences | null {
    if (typeof window === "undefined") return null

    const stored = localStorage.getItem(this.CONSENT_KEY)
    if (!stored) return null

    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }

  static setConsent(preferences: Omit<ConsentPreferences, "timestamp">): void {
    if (typeof window === "undefined") return

    const consent: ConsentPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem(this.CONSENT_KEY, JSON.stringify(consent))
  }

  static hasConsent(): boolean {
    return this.getConsent() !== null
  }

  static clearConsent(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.CONSENT_KEY)
  }

  static getAgeGroup(): AgeGroup | null {
    if (typeof window === "undefined") return null

    const stored = localStorage.getItem(this.AGE_KEY)
    if (!stored) return null

    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }

  static setAgeGroup(type: "child" | "teen" | "adult"): void {
    if (typeof window === "undefined") return

    const ageGroup: AgeGroup = {
      type,
      verified: true,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem(this.AGE_KEY, JSON.stringify(ageGroup))
  }

  static hasAgeVerification(): boolean {
    return this.getAgeGroup() !== null
  }

  static clearAgeVerification(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.AGE_KEY)
  }

  static getAudienceType(): "child" | "teen" | "adult-to-adult" {
    const ageGroup = this.getAgeGroup()

    if (!ageGroup) return "adult-to-adult"

    switch (ageGroup.type) {
      case "child":
        return "child"
      case "teen":
        return "teen"
      default:
        return "adult-to-adult"
    }
  }
}
