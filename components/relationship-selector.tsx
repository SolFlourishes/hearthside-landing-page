"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, UserCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import type { RelationshipContext } from "@/lib/communication-profiles"
import Link from "next/link"

interface Contact {
  id: string
  name: string
  relationship_type: RelationshipContext
  neurotype?: string
  generation?: string
  communication_style?: string
  political_identity?: string
  notes?: string
}

interface RelationshipSelectorProps {
  value: RelationshipContext
  onChange: (value: RelationshipContext) => void
  label: string
  disabled?: boolean
  onContactSelect?: (contact: Contact) => void
  selectedContactId?: string | null
}

export function RelationshipSelector({
  value,
  onChange,
  label,
  disabled,
  onContactSelect,
  selectedContactId,
}: RelationshipSelectorProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showContacts, setShowContacts] = useState(false)

  const relationships: { value: RelationshipContext; label: string }[] = [
    { value: "boss", label: "Boss/Manager" },
    { value: "colleague", label: "Colleague/Peer" },
    { value: "direct-report", label: "Direct Report" },
    { value: "client", label: "Client/Customer" },
    { value: "friend", label: "Friend" },
    { value: "family", label: "Family Member" },
    { value: "romantic-partner", label: "Romantic Partner" },
    { value: "teacher", label: "Teacher/Professor" },
    { value: "student", label: "Student" },
    { value: "stranger", label: "Stranger/New Contact" },
    { value: "other", label: "Other" },
  ]

  useEffect(() => {
    async function loadContacts() {
      const supabase = createBrowserClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setIsLoggedIn(true)
        const { data } = await supabase.from("user_contacts").select("*").eq("user_id", user.id).order("name")

        if (data) {
          setContacts(data)
        }
      }
    }

    loadContacts()
  }, [])

  const handleContactSelect = (contact: Contact) => {
    onChange(contact.relationship_type)
    if (onContactSelect) {
      onContactSelect(contact)
    }
    setShowContacts(false)
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium mb-2 block">{label}</Label>

      {isLoggedIn && contacts.length > 0 && (
        <div className="mb-3 p-3 bg-muted/50 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center gap-2">
              <UserCircle className="w-4 h-4" />
              Your Contacts
            </span>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowContacts(!showContacts)}>
              {showContacts ? "Hide" : "Show"}
            </Button>
          </div>

          {showContacts && (
            <div className="space-y-2 mt-2">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => handleContactSelect(contact)}
                  disabled={disabled}
                  className={`w-full text-left p-2 rounded border text-sm transition-colors ${
                    selectedContactId === contact.id
                      ? "bg-primary/10 border-primary"
                      : "bg-background hover:bg-muted/50"
                  }`}
                >
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {relationships.find((r) => r.value === contact.relationship_type)?.label}
                    {contact.neurotype && ` • ${contact.neurotype}`}
                    {contact.generation && ` • ${contact.generation}`}
                  </div>
                </button>
              ))}
              <Link href="/account/contacts">
                <Button type="button" variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                  <Plus className="w-3 h-3 mr-1" />
                  Manage Contacts
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as RelationshipContext)}
        disabled={disabled}
        className="w-full p-2 border rounded-md bg-background text-sm"
      >
        {relationships.map((rel) => (
          <option key={rel.value} value={rel.value}>
            {rel.label}
          </option>
        ))}
      </select>

      {isLoggedIn && contacts.length === 0 && (
        <p className="text-xs text-muted-foreground mt-1">
          <Link href="/account/contacts" className="text-primary hover:underline">
            Save contacts
          </Link>{" "}
          to quickly reuse their communication preferences
        </p>
      )}
    </div>
  )
}
