
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
import { Valuation } from "@/lib/types";

export function ValuationsList({ valuations }: { valuations: Valuation[] }) {
    const [searchQuery, setSearchQuery] = React.useState("");

    const filteredValuations = React.useMemo(() => {
        return valuations.filter((valuation) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                valuation.name.toLowerCase().includes(searchLower) ||
                valuation.email.toLowerCase().includes(searchLower) ||
                (valuation.address && valuation.address.toLowerCase().includes(searchLower)) ||
                (valuation.type && valuation.type.toLowerCase().includes(searchLower)) ||
                valuation.message.toLowerCase().includes(searchLower)
            );
        });
    }, [valuations, searchQuery]);

    return (
        <>
            <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search valuations by name, email, address..."
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
                            <TableHead>Address</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Expected Value</TableHead>
                            <TableHead>Message</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredValuations.length > 0 ? (
                            filteredValuations.map((valuation) => (
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
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    No valuations found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
