
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
import { Button } from "@/components/ui/button";
import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Inquiry } from "@/lib/types";

export function InquiriesList({ inquiries }: { inquiries: Inquiry[] }) {
    const [searchQuery, setSearchQuery] = React.useState("");

    const filteredInquiries = React.useMemo(() => {
        return inquiries.filter((inquiry) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                inquiry.name.toLowerCase().includes(searchLower) ||
                inquiry.email.toLowerCase().includes(searchLower) ||
                inquiry.propertyId.toLowerCase().includes(searchLower) ||
                inquiry.message.toLowerCase().includes(searchLower)
            );
        });
    }, [inquiries, searchQuery]);

    return (
        <>
            <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search inquiries by name, email, property ID..."
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
                            <TableHead>Property ID</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredInquiries.length > 0 ? (
                            filteredInquiries.map((inquiry) => (
                                <TableRow key={inquiry.id}>
                                    <TableCell>{format(inquiry.submittedAt, 'PPP')}</TableCell>
                                    <TableCell className="font-medium">{inquiry.name}</TableCell>
                                    <TableCell>{inquiry.email}</TableCell>
                                    <TableCell>{inquiry.phone}</TableCell>
                                    <TableCell>{inquiry.propertyId}</TableCell>
                                    <TableCell className="max-w-xs truncate">{inquiry.message}</TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/properties/${inquiry.propertyId}`} target="_blank">
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                View
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No inquiries found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
