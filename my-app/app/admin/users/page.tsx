import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserManagementTable } from "./user-management-table"

export default async function UserManagementPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirectTo=/admin/users")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Only admins can manage users
  if (!profile || profile.role !== "admin") {
    redirect("/admin")
  }

  // Get all users
  const { data: users } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage user roles and permissions across Hearthside Works</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Update user roles and subscription tiers</CardDescription>
        </CardHeader>
        <CardContent>
          {users && users.length > 0 ? (
            <UserManagementTable users={users} />
          ) : (
            <p className="text-muted-foreground">No users found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
