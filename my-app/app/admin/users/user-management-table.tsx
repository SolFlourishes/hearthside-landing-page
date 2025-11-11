"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"

interface User {
  id: string
  email: string
  display_name: string | null
  role: string
  subscription_tier: string // Updated from 'tier' to 'subscription_tier'
  created_at: string
}

export function UserManagementTable({ users }: { users: User[] }) {
  const [localUsers, setLocalUsers] = useState(users)

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })

      if (response.ok) {
        setLocalUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
      }
    } catch (error) {
      console.error("Failed to update role:", error)
    }
  }

  const handleTierChange = async (userId: string, newTier: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/tier`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: newTier }),
      })

      if (response.ok) {
        setLocalUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, subscription_tier: newTier } : u)))
      }
    } catch (error) {
      console.error("Failed to update tier:", error)
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Tier</TableHead>
          <TableHead>Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {localUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div>
                <p className="font-medium">{user.display_name || "No name"}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </TableCell>
            <TableCell>
              <Select value={user.role} onValueChange={(value) => handleRoleChange(user.id, value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="elder">Elder</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Select value={user.subscription_tier} onValueChange={(value) => handleTierChange(user.id, value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>{formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
