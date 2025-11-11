"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Recipient {
  id: string
  name: string
  relationship: string | null
  communication_style: string | null
  formality_level: string | null
  times_used: number
  last_used_at: string | null
}

export function RecipientList({ recipients }: { recipients: Recipient[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {recipients.map((recipient) => (
        <Card key={recipient.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{recipient.name}</CardTitle>
                {recipient.relationship && (
                  <Badge variant="secondary" className="mt-2">
                    {recipient.relationship}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-muted-foreground">
              {recipient.communication_style && <p>Style: {recipient.communication_style}</p>}
              {recipient.formality_level && <p>Formality: {recipient.formality_level.replace("_", " ")}</p>}
              <p>Used {recipient.times_used} times</p>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" className="flex-1">
                <Link href={`/account/recipients/${recipient.id}`}>Edit</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
                <Link href={`/apps/clarity/draft?recipient=${recipient.id}`}>Use in Draft</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
