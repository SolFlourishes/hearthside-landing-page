"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface RecipientFormProps {
  recipient?: {
    id: string
    name: string
    relationship: string | null
    communication_style: string | null
    formality_level: string | null
    directness_level: string | null
    neurodiversity_profile: Record<string, unknown> | null
    generational_identity: string | null
    political_identity: string | null
    notes: string | null
  } | null
}

export function RecipientForm({ recipient }: RecipientFormProps) {
  const [name, setName] = useState(recipient?.name || "")
  const [relationship, setRelationship] = useState(recipient?.relationship || "")
  const [communicationStyle, setCommunicationStyle] = useState(recipient?.communication_style || "")
  const [formalityLevel, setFormalityLevel] = useState(recipient?.formality_level || "")
  const [directnessLevel, setDirectnessLevel] = useState(recipient?.directness_level || "")
  const [generationalIdentity, setGenerationalIdentity] = useState(recipient?.generational_identity || "")
  const [politicalIdentity, setPoliticalIdentity] = useState(recipient?.political_identity || "")
  const [notes, setNotes] = useState(recipient?.notes || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const payload = {
        name,
        relationship: relationship || null,
        communication_style: communicationStyle || null,
        formality_level: formalityLevel || null,
        directness_level: directnessLevel || null,
        generational_identity: generationalIdentity || null,
        political_identity: politicalIdentity || null,
        notes: notes || null,
      }

      const url = recipient ? `/api/recipients/${recipient.id}` : "/api/recipients"

      const method = recipient ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save recipient")
      }

      router.push("/account/recipients")
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!recipient || !confirm("Are you sure you want to delete this recipient?")) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/recipients/${recipient.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete recipient")
      }

      router.push("/account/recipients")
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Christina" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="relationship">Relationship</Label>
        <Input
          id="relationship"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          placeholder="Boss, Colleague, Friend, etc."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="communication-style">Communication Style</Label>
        <Select value={communicationStyle} onValueChange={setCommunicationStyle}>
          <SelectTrigger>
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="direct">Direct</SelectItem>
            <SelectItem value="diplomatic">Diplomatic</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="formal">Formal</SelectItem>
            <SelectItem value="analytical">Analytical</SelectItem>
            <SelectItem value="collaborative">Collaborative</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="formality">Formality Level</Label>
        <Select value={formalityLevel} onValueChange={setFormalityLevel}>
          <SelectTrigger>
            <SelectValue placeholder="Select formality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="very_formal">Very Formal</SelectItem>
            <SelectItem value="formal">Formal</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="very_casual">Very Casual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="directness">Directness Level</Label>
        <Select value={directnessLevel} onValueChange={setDirectnessLevel}>
          <SelectTrigger>
            <SelectValue placeholder="Select directness" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="very_direct">Very Direct</SelectItem>
            <SelectItem value="direct">Direct</SelectItem>
            <SelectItem value="balanced">Balanced</SelectItem>
            <SelectItem value="indirect">Indirect</SelectItem>
            <SelectItem value="very_indirect">Very Indirect</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="generation">Generation</Label>
        <Select value={generationalIdentity} onValueChange={setGenerationalIdentity}>
          <SelectTrigger>
            <SelectValue placeholder="Select generation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gen_z">Gen Z</SelectItem>
            <SelectItem value="millennial">Millennial</SelectItem>
            <SelectItem value="gen_x">Gen X</SelectItem>
            <SelectItem value="boomer">Baby Boomer</SelectItem>
            <SelectItem value="silent">Silent Generation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="political">Political Identity</Label>
        <Select value={politicalIdentity} onValueChange={setPoliticalIdentity}>
          <SelectTrigger>
            <SelectValue placeholder="Select identity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="progressive">Progressive</SelectItem>
            <SelectItem value="liberal">Liberal</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="conservative">Conservative</SelectItem>
            <SelectItem value="libertarian">Libertarian</SelectItem>
            <SelectItem value="unsure">Unsure/Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Custom Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g., Prefers bullet points, dislikes long emails, responds best in the morning"
          rows={4}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Saving..." : recipient ? "Update Recipient" : "Create Recipient"}
        </Button>
        {recipient && (
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isLoading}>
            Delete
          </Button>
        )}
      </div>
    </form>
  )
}
