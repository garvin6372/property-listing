
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { PropertyWithImages } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { deleteProperty } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import React from "react";

export function PropertiesDataTable({ data }: { data: PropertyWithImages[] }) {
    const { toast } = useToast();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [propertyToDelete, setPropertyToDelete] = React.useState<string | null>(null);
    
    const handleDeleteClick = (id: string) => {
        setPropertyToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (propertyToDelete) {
            const result = await deleteProperty(propertyToDelete);
            if (result.message.includes("successfully")) {
                toast({ title: "Success", description: result.message });
            } else {
                toast({ variant: "destructive", title: "Error", description: result.message });
            }
            setPropertyToDelete(null);
            setIsDeleteDialogOpen(false);
        }
    };


  return (
    <>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium whitespace-nowrap">{property.id}</TableCell>
                <TableCell className="font-medium whitespace-nowrap">{property.title}</TableCell>
                <TableCell>{property.region}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Badge variant={property.status === 'Buy' ? 'default' : 'secondary'}>{property.status}</Badge>
                    {property.dubaiStatus && <Badge variant="outline">{property.dubaiStatus}</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">{formatPrice(property.price, property.region === 'Dubai' ? 'AED' : 'GBP')}</TableCell>
                <TableCell className="text-center">
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/properties/${property.id}/edit`} className="flex items-center">
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(property.id)} className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the property.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
  );
}

    