import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getInquiries } from "@/lib/data";
import type { Metadata } from "next";
import { InquiriesList } from "./inquiries-list";

export const metadata: Metadata = {
  title: "Customer Inquiries | Skyvera",
};

export default async function InquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Customer Inquiries</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Inquiries</CardTitle>
          <CardDescription>
            {inquiries.length > 0
              ? `You have ${inquiries.length} new inquiries.`
              : "There are no new inquiries at the moment."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InquiriesList inquiries={inquiries} />
        </CardContent>
      </Card>
    </div>
  );
}