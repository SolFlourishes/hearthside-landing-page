"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Edit, Trash2, Eye, EyeOff, Save, X } from "lucide-react"

interface Story {
  id: string
  title: string
  content: string
  excerpt: string
  imageUrl?: string
  type: "ai-generated" | "player-submitted"
  status: "published" | "draft" | "pending"
  simulationId?: string
  metadata?: any
  createdAt: { seconds: number }
  publishedAt?: { seconds: number }
  views?: number
  likes?: number
}

export default function ManageStoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [editingStory, setEditingStory] = useState<Story | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<Story | null>(null)
  const [processing, setProcessing] = useState(false)

  // Edit form state
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")
  const [editExcerpt, setEditExcerpt] = useState("")
  const [editImageUrl, setEditImageUrl] = useState("")
  const [editStatus, setEditStatus] = useState<"published" | "draft" | "pending">("draft")

  useEffect(() => {
    fetchStories()
  }, [statusFilter, typeFilter])

  const fetchStories = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (typeFilter !== "all") params.append("type", typeFilter)

      const response = await fetch(`/api/stories/all?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setStories(data.stories)
      }
    } catch (error) {
      console.error("Error fetching stories:", error)
    } finally {
      setLoading(false)
    }
  }

  const openEditDialog = (story: Story) => {
    setEditingStory(story)
    setEditTitle(story.title)
    setEditContent(story.content)
    setEditExcerpt(story.excerpt)
    setEditImageUrl(story.imageUrl || "")
    setEditStatus(story.status)
  }

  const handleUpdate = async () => {
    if (!editingStory) return

    setProcessing(true)
    try {
      const response = await fetch("/api/stories/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyId: editingStory.id,
          updates: {
            title: editTitle,
            content: editContent,
            excerpt: editExcerpt,
            imageUrl: editImageUrl,
            status: editStatus,
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert("Story updated successfully!")
        setEditingStory(null)
        fetchStories()
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert("An error occurred while updating the story")
      console.error(error)
    } finally {
      setProcessing(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteConfirm) return

    setProcessing(true)
    try {
      const response = await fetch("/api/stories/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId: deleteConfirm.id }),
      })

      const data = await response.json()

      if (data.success) {
        alert("Story deleted successfully!")
        setDeleteConfirm(null)
        fetchStories()
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert("An error occurred while deleting the story")
      console.error(error)
    } finally {
      setProcessing(false)
    }
  }

  const togglePublish = async (story: Story) => {
    const newStatus = story.status === "published" ? "draft" : "published"

    setProcessing(true)
    try {
      const response = await fetch("/api/stories/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyId: story.id,
          updates: { status: newStatus },
        }),
      })

      const data = await response.json()

      if (data.success) {
        fetchStories()
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert("An error occurred")
      console.error(error)
    } finally {
      setProcessing(false)
    }
  }

  const formatDate = (timestamp: { seconds: number } | undefined) => {
    if (!timestamp) return "N/A"
    return new Date(timestamp.seconds * 1000).toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Manage Stories</h1>
          <p className="text-slate-400">Edit, publish, or delete stories</p>
        </div>

        {/* Filters */}
        <Card className="bg-slate-900 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-white">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label className="text-white">Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="ai-generated">AI Generated</SelectItem>
                    <SelectItem value="player-submitted">Player Submitted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stories List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-slate-400 text-center py-8">Loading...</div>
          ) : stories.length === 0 ? (
            <div className="text-slate-400 text-center py-8">No stories found</div>
          ) : (
            stories.map((story) => (
              <Card key={story.id} className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-white text-xl mb-2">{story.title}</CardTitle>
                      <CardDescription className="text-slate-400">{story.excerpt}</CardDescription>
                      <div className="flex gap-2 mt-3">
                        <Badge
                          variant="outline"
                          className={
                            story.status === "published"
                              ? "border-green-500/50 text-green-300"
                              : story.status === "pending"
                                ? "border-yellow-500/50 text-yellow-300"
                                : "border-slate-500/50 text-slate-300"
                          }
                        >
                          {story.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            story.type === "ai-generated"
                              ? "border-purple-500/50 text-purple-300"
                              : "border-blue-500/50 text-blue-300"
                          }
                        >
                          {story.type === "ai-generated" ? "AI" : "Player"}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-500 mt-2">
                        Created: {formatDate(story.createdAt)} | Views: {story.views || 0} | Likes: {story.likes || 0}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePublish(story)}
                        disabled={processing}
                        className="border-slate-600 text-white hover:bg-slate-800"
                      >
                        {story.status === "published" ? (
                          <>
                            <EyeOff className="w-4 h-4 mr-1" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-1" />
                            Publish
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(story)}
                        className="border-slate-600 text-white hover:bg-slate-800"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteConfirm(story)}
                        disabled={processing}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingStory} onOpenChange={() => setEditingStory(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Story</DialogTitle>
            <DialogDescription className="text-slate-400">Make changes to the story</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label>Excerpt</Label>
              <Textarea
                value={editExcerpt}
                onChange={(e) => setEditExcerpt(e.target.value)}
                rows={2}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={12}
                className="bg-slate-800 border-slate-600 text-white font-mono text-sm"
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={editImageUrl}
                onChange={(e) => setEditImageUrl(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={editStatus} onValueChange={(v: any) => setEditStatus(v)}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingStory(null)} disabled={processing}>
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={processing} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-1" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Delete Story</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete "{deleteConfirm?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} disabled={processing}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={processing}>
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
