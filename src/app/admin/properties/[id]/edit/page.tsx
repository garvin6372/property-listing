import { getPropertyById } from "@/lib/data";
import { notFound } from "next/navigation";
import { PropertyForm } from "../../property-form";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const property = await getPropertyById(params.id);
  return {
    title: `Edit: ${property?.title || "Property"}`,
  };
}

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Property</h1>
      <PropertyForm property={property} />
    </div>
  );
}
