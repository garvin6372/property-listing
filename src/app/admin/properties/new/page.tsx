import { PropertyForm } from "../property-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Property",
};

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Property</h1>
      <PropertyForm />
    </div>
  );
}
