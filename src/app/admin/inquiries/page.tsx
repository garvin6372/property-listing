import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getInquiries } from "@/lib/data";
import { format } from "date-fns";
import type { Metadata } from "next";

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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Property ID</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>{format(inquiry.submittedAt, 'PPP')}</TableCell>
                    <TableCell className="font-medium">{inquiry.name}</TableCell>
                    <TableCell>{inquiry.email}</TableCell>
                    <TableCell>{inquiry.phone}</TableCell>
                    <TableCell>{inquiry.propertyId}</TableCell>
                    <TableCell className="max-w-xs truncate">{inquiry.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}