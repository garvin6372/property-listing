"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter } from "next/navigation";
import { getLocations, getPropertyTypes } from "@/lib/data";

export function HeaderSearchModal() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState("buy");
    const [location, setLocation] = useState("all");
    const [price, setPrice] = useState("all");
    const [bedrooms, setBedrooms] = useState("any");
    const [propertyType, setPropertyType] = useState("all");

    const [locations, setLocations] = useState<string[]>([]);
    const [propertyTypesList, setPropertyTypesList] = useState<string[]>([]);

    useEffect(() => {
        getLocations().then(setLocations).catch(console.error);
        getPropertyTypes().then(setPropertyTypesList).catch(console.error);
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (type) params.set('status', type === 'buy' ? 'Buy' : 'Rent');
        if (location && location !== 'all') params.set('location', location);
        if (bedrooms && bedrooms !== 'any') params.set('bedrooms', bedrooms);
        if (propertyType && propertyType !== 'all') params.set('type', propertyType);

        // Price parameter processing if needed
        if (price && price !== 'all') {
            const [min, max] = price.split('-');
            if (min) params.set('minPrice', min);
            if (max) params.set('maxPrice', max);
        }

        setIsOpen(false);
        router.push(`/search?${params.toString()}`);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Search properties" className="h-9 w-9 md:h-10 md:w-10 text-foreground/80 hover:text-primary transition-colors">
                    <Search className="h-5 w-5 md:h-5 md:w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:max-w-[800px] h-auto max-h-[90vh] overflow-y-auto p-0 rounded-2xl bg-background/95 backdrop-blur-xl border border-border/50">
                <DialogTitle className="sr-only">Advanced Search Filters</DialogTitle>
                <div className="p-6 md:p-10 space-y-6 md:space-y-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-serif text-foreground">Find your perfect property</h2>
                        <p className="text-muted-foreground mt-2 font-light text-lg">Search through our premium collection</p>
                    </div>

                    <div className="space-y-6">
                        {/* Line 1: Buy / Rent Toggle */}
                        <div className="flex justify-center">
                            <ToggleGroup type="single" value={type} onValueChange={(val) => val && setType(val)} className="bg-muted/80 p-1.5 rounded-full border border-border/40 shadow-inner w-full sm:w-auto overflow-x-auto">
                                <ToggleGroupItem value="buy" className="rounded-full flex-1 sm:flex-none px-6 sm:px-10 py-2.5 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-md transition-all font-medium text-muted-foreground whitespace-nowrap">Buy</ToggleGroupItem>
                                <ToggleGroupItem value="rent" className="rounded-full flex-1 sm:flex-none px-6 sm:px-10 py-2.5 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-md transition-all font-medium text-muted-foreground whitespace-nowrap">Rent</ToggleGroupItem>
                            </ToggleGroup>
                        </div>

                        {/* Line 2: Location, Price Range, Bedrooms */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-border/40">
                            <div className="space-y-2.5">
                                <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Location</Label>
                                <Select value={location} onValueChange={setLocation}>
                                    <SelectTrigger className="h-14 rounded-xl bg-muted/30 border-border/50 hover:bg-muted/60 hover:border-border transition-all text-base focus:ring-primary/20">
                                        <SelectValue placeholder="Any Location" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-border/50">
                                        <SelectItem value="all" className="rounded-lg">Any Location</SelectItem>
                                        {locations.map(l => <SelectItem key={l} value={l} className="rounded-lg">{l}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2.5">
                                <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Price Range</Label>
                                <Select value={price} onValueChange={setPrice}>
                                    <SelectTrigger className="h-14 rounded-xl bg-muted/30 border-border/50 hover:bg-muted/60 hover:border-border transition-all text-base focus:ring-primary/20">
                                        <SelectValue placeholder="Any Price" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-border/50">
                                        <SelectItem value="all" className="rounded-lg">Any Price</SelectItem>
                                        <SelectItem value="0-1000000" className="rounded-lg">Under 1M AED</SelectItem>
                                        <SelectItem value="1000000-3000000" className="rounded-lg">1M - 3M AED</SelectItem>
                                        <SelectItem value="3000000-5000000" className="rounded-lg">3M - 5M AED</SelectItem>
                                        <SelectItem value="5000000-" className="rounded-lg">5M+ AED</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2.5">
                                <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Bedrooms</Label>
                                <Select value={bedrooms} onValueChange={setBedrooms}>
                                    <SelectTrigger className="h-14 rounded-xl bg-muted/30 border-border/50 hover:bg-muted/60 hover:border-border transition-all text-base focus:ring-primary/20">
                                        <SelectValue placeholder="Any" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-border/50">
                                        <SelectItem value="any" className="rounded-lg">Any</SelectItem>
                                        <SelectItem value="1" className="rounded-lg">1 Bedroom</SelectItem>
                                        <SelectItem value="2" className="rounded-lg">2 Bedrooms</SelectItem>
                                        <SelectItem value="3" className="rounded-lg">3 Bedrooms</SelectItem>
                                        <SelectItem value="4" className="rounded-lg">4+ Bedrooms</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Line 3: Property Type, Search Button */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
                            <div className="sm:col-span-2 space-y-2.5">
                                <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Property Type</Label>
                                <Select value={propertyType} onValueChange={setPropertyType}>
                                    <SelectTrigger className="h-14 rounded-xl bg-muted/30 border-border/50 hover:bg-muted/60 hover:border-border transition-all text-base focus:ring-primary/20">
                                        <SelectValue placeholder="Any Type" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-border/50">
                                        <SelectItem value="all" className="rounded-lg">Any Type</SelectItem>
                                        {propertyTypesList.map(t => <SelectItem key={t} value={t} className="rounded-lg">{t}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="sm:col-span-1 mt-4 sm:mt-0">
                                <Button onClick={handleSearch} size="lg" className="w-full h-14 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                                    <Search className="mr-2 h-5 w-5" />
                                    Search
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
