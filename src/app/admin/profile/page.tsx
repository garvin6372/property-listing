import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Profile | Skyvera",
};

export default async function ProfilePage() {
  // For our custom authentication, we'll use a mock user
  // In a real application, you would get this from your auth context
  const user = {
    id: 'admin-user-id',
    email: 'admin@skyvera.com',
    role: 'admin',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">User ID</label>
            <p className="text-lg font-mono text-sm">{user.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Role</label>
            <p className="text-lg">Administrator</p>
          </div>
          <div className="pt-4">
            <Button variant="outline" disabled>Change Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}