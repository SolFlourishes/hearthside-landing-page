"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"
import { RelationshipSelector } from "@/components/relationship-selector"
import { RadioPillGroup } from "@/app/apps/clarity/draft/RadioPillGroup"
import { PoliticalIdentitySelector } from "@/components/political-identity-selector"
import type { RelationshipContext } from "@/lib/communication-profiles"
import type { PoliticalIdentity } from "@/lib/political-profiles"

interface ContactFormProps {
  contact?: any
  onSave: () => void
  onCancel: () => void
}

export function ContactForm({ contact, onSave, onCancel }: ContactFormProps) {
  const [name, setName] = useState(contact?.name || "")
  const [relationship, setRelationship] = useState<RelationshipContext>(contact?.relationship || "colleague")
  const [notes, setNotes] = useState(contact?.notes || "")
  const [neurotype, setNeurotype] = useState(contact?.neurotype || "Unsure")
  const [generation, setGeneration] = useState(contact?.generation || "unsure")
  const [politicalIdentity, setPoliticalIdentity] = useState<PoliticalIdentity>(contact?.political_identity || "unsure")
  const [isSaving, setIsSaving] = useState(false)

  const neurotypes = ["Autism", "ADHD", "Neurotypical", "Unsure"]
  const generations = ["Boomer", "Gen X", "Xennial", "Millennial", "Gen Z", "Gen Alpha", "unsure"]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const contactData = {
        user_id: user.id,
        name,
        relationship,
        notes,
        neurotype,
        generation,
        political_identity: politicalIdentity,
        updated_at: new Date().toISOString(),
      }

      if (contact) {
        // Update existing
        const { error } = await supabase.from("clarity_contacts").update(contactData).eq("id", contact.id)

        if (error) throw error
      } else {
        // Create new
        const { error } = await supabase.from("clarity_contacts").insert(contactData)

        if (error) throw error
      }

      onSave()
    } catch (error) {
      console.error("Error saving contact:", error)
      alert("Failed to save contact")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">{contact ? "Edit Contact" : "Add New Contact"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Sarah, Mom, John from Sales"
            required
          />
        </div>

        <RelationshipSelector label="Relationship" value={relationship} onChange={setRelationship} />

        <div>
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any context that helps you communicate better with them..."
            className="min-h-[80px]"
          />
        </div>

        <div>
          <Label className="mb-2 block">Their Neurotype</Label>
          <RadioPillGroup name="neurotype" value={neurotype} onChange={setNeurotype} options={neurotypes} />
        </div>

        <div>
          <Label className="mb-2 block">Their Generation</Label>
          <RadioPillGroup name="generation" value={generation} onChange={setGeneration} options={generations} />
        </div>

        <PoliticalIdentitySelector
          label="Political Identity (for political discussions)"
          value={politicalIdentity}
          onChange={setPoliticalIdentity}
          tooltip="Optional: Helps with political conversations"
        />

        <div className="flex gap-2 pt-4">
          <Button type="submit" disabled={isSaving || !name}>
            {isSaving ? "Saving..." : contact ? "Update Contact" : "Add Contact"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
