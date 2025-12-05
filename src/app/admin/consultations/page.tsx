
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getConsultations } from "@/lib/data";
import { format } from "date-fns";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultation Requests | Skyvera",
};

export default async function ConsultationsPage() {
    const consultations = await getConsultations();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Consultation Requests</h1>
            <Card>
                <CardHeader>
                    <CardTitle>All Consultation Requests</CardTitle>
                    <CardDescription>
                        {consultations.length > 0
                            ? `You have ${consultations.length} new consultation requests.`
                            : "There are no new consultation requests at the moment."
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
                                    <TableHead>Budget</TableHead>
                                    <TableHead>Message</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {consultations.map((consultation) => (
                                    <TableRow key={consultation.id}>
                                        <TableCell>{format(consultation.submittedAt, 'PPP')}</TableCell>
                                        <TableCell className="font-medium">{consultation.name}</TableCell>
                                        <TableCell>{consultation.email}</TableCell>
                                        <TableCell>{consultation.phone}</TableCell>
                                        <TableCell>{consultation.budget || '-'}</TableCell>
                                        <TableCell className="max-w-md truncate">{consultation.message}</TableCell>
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
