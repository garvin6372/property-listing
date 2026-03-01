"use client";

import { useState, useEffect } from "react";
import { Property } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { togglePropertyProject } from "@/lib/actions";

interface OurProjectsClientProps {
    initialProperties: Property[];
}

export default function OurProjectsClient({ initialProperties }: OurProjectsClientProps) {
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>(initialProperties);
    const [searchQuery, setSearchQuery] = useState("");
    const [togglingPropertyId, setTogglingPropertyId] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (!searchQuery) {
            setFilteredProperties(properties);
        } else {
            const lowerQuery = searchQuery.toLowerCase();
            setFilteredProperties(properties.filter(p => p.title.toLowerCase().includes(lowerQuery) || p.location.toLowerCase().includes(lowerQuery)));
        }
    }, [searchQuery, properties]);

    const handleToggleProject = async (propertyId: string, currentValue: boolean) => {
        setTogglingPropertyId(propertyId);
        try {
            const result = await togglePropertyProject(propertyId, !currentValue);

            if (result.success) {
                // Update local state
                setProperties(prev => prev.map(p =>
                    p.id === propertyId ? { ...p, isProject: !currentValue } : p
                ));
                toast({ title: result.message });
            } else {
                toast({ title: result.message, variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Failed to update project status", variant: "destructive" });
        } finally {
            setTogglingPropertyId(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Our Projects</h1>
                <p className="text-muted-foreground mt-2">
                    Select properties from your existing listings to display in the &quot;Our Projects&quot; section.
                </p>
            </div>

            <div className="flex items-center space-x-2">
                <Input
                    type="search"
                    placeholder="Search properties by title or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-md"
                />
            </div>

            <div className="rounded-md border bg-card">
                <div className="p-4 bg-muted/50 font-medium grid grid-cols-[1fr_100px] border-b">
                    <div>Property</div>
                    <div className="text-right">Is Project</div>
                </div>

                <div className="divide-y">
                    {filteredProperties.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            No properties found.
                        </div>
                    ) : (
                        filteredProperties.map((property) => (
                            <div key={property.id} className="p-4 grid grid-cols-[1fr_100px] items-center">
                                <div>
                                    <div className="font-medium">{property.title}</div>
                                    <div className="text-sm text-muted-foreground max-w-[80%] truncate">
                                        {property.location} • {property.type} • {property.status}
                                    </div>
                                </div>
                                <div className="flex justify-end items-center">
                                    <Switch
                                        id={`project-${property.id}`}
                                        checked={!!property.isProject}
                                        disabled={togglingPropertyId === property.id}
                                        onCheckedChange={() => handleToggleProject(property.id, !!property.isProject)}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
