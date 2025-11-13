"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, UserCircle, TrendingUp, MessageSquare, Calendar, Trash2, Edit } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import { ContactForm } from "@/components/contact-form"
import { ContactProgressCard } from "@/components/contact-progress-card"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingContact, setEditingContact] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadContacts()
  }, [])

  async function loadContacts() {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { data, error } = await supabase
        .from("clarity_contacts")
        .select("*")
        .order("last_interaction_at", { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (error) {
      console.error("Error loading contacts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(contactId: string) {
    if (!confirm("Delete this contact? This will also remove interaction history.")) return

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { error } = await supabase.from("clarity_contacts").delete().eq("id", contactId)

      if (error) throw error

      setContacts(contacts.filter((c) => c.id !== contactId))
      if (selectedContact?.id === contactId) setSelectedContact(null)
    } catch (error) {
      console.error("Error deleting contact:", error)
      alert("Failed to delete contact")
    }
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-serif">Your Contacts</h1>
            <p className="text-muted-foreground mt-1">
              Build deeper understanding with people you communicate with frequently
            </p>
          </div>
          <Button
            onClick={() => {
              setShowForm(true)
              setEditingContact(null)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>

        {showForm && (
          <ContactForm
            contact={editingContact}
            onSave={() => {
              setShowForm(false)
              setEditingContact(null)
              loadContacts()
            }}
            onCancel={() => {
              setShowForm(false)
              setEditingContact(null)
            }}
          />
        )}

        {isLoading ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Loading contacts...</p>
          </Card>
        ) : contacts.length === 0 ? (
          <Card className="p-12 text-center">
            <UserCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No contacts yet</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Save people you communicate with regularly. We'll track your progress and help you build stronger
              connections over time.
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Contact
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Your People</h2>
              {contacts.map((contact) => (
                <Card
                  key={contact.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedContact?.id === contact.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {contact.relationship.replace(/-/g, " ")}
                      </p>
                      {contact.notes && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{contact.notes}</p>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {contact.total_interactions} interactions
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Last: {new Date(contact.last_interaction_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingContact(contact)
                          setShowForm(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(contact.id)
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div>
              {selectedContact ? (
                <ContactProgressCard contact={selectedContact} />
              ) : (
                <Card className="p-8 text-center h-full flex items-center justify-center">
                  <div>
                    <TrendingUp className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">Select a contact to see your communication progress</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
