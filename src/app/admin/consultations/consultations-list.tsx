
"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Consultation } from "@/lib/types";

export function ConsultationsList({ consultations }: { consultations: Consultation[] }) {
    const [searchQuery, setSearchQuery] = React.useState("");

    const filteredConsultations = React.useMemo(() => {
        return consultations.filter((consultation) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                consultation.name.toLowerCase().includes(searchLower) ||
                consultation.email.toLowerCase().includes(searchLower) ||
                consultation.message.toLowerCase().includes(searchLower) ||
                (consultation.budget && consultation.budget.toLowerCase().includes(searchLower))
            );
        });
    }, [consultations, searchQuery]);

    return (
        <>
            <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search consultations by name, email..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto rounded-md border">
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
                        {filteredConsultations.length > 0 ? (
                            filteredConsultations.map((consultation) => (
                                <TableRow key={consultation.id}>
                                    <TableCell>{format(consultation.submittedAt, 'PPP')}</TableCell>
                                    <TableCell className="font-medium">{consultation.name}</TableCell>
                                    <TableCell>{consultation.email}</TableCell>
                                    <TableCell>{consultation.phone}</TableCell>
                                    <TableCell>{consultation.budget || '-'}</TableCell>
                                    <TableCell className="max-w-md truncate">{consultation.message}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No consultations found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
