import { getProperties, getInquiries, getValuations } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MessageSquare, BadgePercent } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Skyvera",
};

export default async function DashboardPage() {
  const properties = await getProperties();
  const inquiries = await getInquiries();
  const valuations = await getValuations();

  const stats = [
    { title: "Total Properties", value: properties.length, icon: Building2 },
    { title: "Inquiries", value: inquiries.length, icon: MessageSquare },
    { title: "Valuation Requests", value: valuations.length, icon: BadgePercent },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Admin Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You can manage properties, view customer inquiries, and see valuation requests from the sidebar navigation.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}