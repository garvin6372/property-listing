
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getValuations } from "@/lib/data";
import { format } from "date-fns";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Valuation Requests | Skyvera",
};

export default async function ValuationsPage() {
  const valuations = await getValuations();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Valuation Requests</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Valuation Requests</CardTitle>
          <CardDescription>
            {valuations.length > 0
              ? `You have ${valuations.length} new valuation requests.`
              : "There are no new valuation requests at the moment."
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
                  <TableHead>Address</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Expected Value</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {valuations.map((valuation) => (
                  <TableRow key={valuation.id}>
                    <TableCell>{format(valuation.submittedAt, 'PPP')}</TableCell>
                    <TableCell className="font-medium">{valuation.name}</TableCell>
                    <TableCell>{valuation.email}</TableCell>
                    <TableCell>{valuation.phone}</TableCell>
                    <TableCell>{valuation.address}</TableCell>
                    <TableCell className="capitalize">{valuation.type}</TableCell>
                    <TableCell>{valuation.expectedValue}</TableCell>
                    <TableCell className="max-w-md truncate">{valuation.message}</TableCell>
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
