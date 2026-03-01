import { getProperties } from "@/lib/data";
import FeaturedPropertiesClient from "./featured-properties-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Featured Properties",
};

export default async function FeaturedPropertiesAdminPage() {
    const properties = await getProperties();

    return <FeaturedPropertiesClient initialProperties={properties as any} />;
}
