import { getProperties } from "@/lib/data";
import OurProjectsClient from "./our-projects-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Projects",
};

export default async function OurProjectsAdminPage() {
    const properties = await getProperties();

    return <OurProjectsClient initialProperties={properties as any} />;
}
