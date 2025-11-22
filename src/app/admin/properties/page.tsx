import { Button } from "@/components/ui/button";
import { getProperties } from "@/lib/data";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { PropertiesDataTable } from "./properties-data-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Properties",
};

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Properties</h1>
        <Button asChild>
          <Link href="/admin/properties/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Property
          </Link>
        </Button>
      </div>
      <PropertiesDataTable data={properties} />
    </div>
  );
}