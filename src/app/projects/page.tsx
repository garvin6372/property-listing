import { getProperties } from "@/lib/data";
import { PropertyCardList } from "@/components/property-card-list";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
    const properties = await getProperties().catch(() => []);
    const heroImage = PlaceHolderImages.find((img) => img.id === "dubai-offplan-1")?.imageUrl || "https://placehold.co/1920x600";

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="relative h-[40vh] min-h-[300px] w-full bg-slate-900 flex items-center justify-center overflow-hidden mb-12">
                <Image
                    src={heroImage}
                    alt="Our Projects"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 tracking-tight">Our Projects</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto font-light">
                        Discover our exclusive collection of premium properties across Dubai and London.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                {properties && properties.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8">
                        {properties.map((property) => (
                            <PropertyCardList key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-serif text-muted-foreground">No projects found.</h2>
                        <p className="text-muted-foreground mt-2">Please check back later for our latest listings.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
