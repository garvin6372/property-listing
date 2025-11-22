'use client'

import { useState } from 'react';
import { getClientProperties } from '@/lib/data';
import { PropertyCard } from '@/components/property-card';
import { PropertyFilters } from '@/components/property-filters';
import { Grid3x3, List, Search } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import { PropertyCardList } from '@/components/property-card-list';
import { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function SearchContent() {
    const [allProperties, setAllProperties] = React.useState<Awaited<ReturnType<typeof getClientProperties>>>([]);
    const [view, setView] = useState('grid');
    const [sortBy, setSortBy] = useState('newest');
    const router = useRouter();
    const [searchLocation, setSearchLocation] = useState('');

    const searchParams = useSearchParams();

    const region = searchParams.get('region') as string | undefined;
    const type = searchParams.getAll('type');
    const status = searchParams.getAll('status');
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const location = searchParams.get('location') as string | undefined;
    const bedrooms = searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined;
    const bathrooms = searchParams.get('bathrooms') ? Number(searchParams.get('bathrooms')) : undefined;
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const limit = view === 'grid' ? 9 : 5;

    React.useEffect(() => {
        getClientProperties(location && location !== 'all' ? location : undefined).then(setAllProperties);
    }, [location]);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (searchLocation) {
            params.set('location', searchLocation);
        } else {
            params.delete('location');
        }
        params.delete('page'); // Reset to first page on new search
        router.push(`/search?${params.toString()}`);
    };


    const filteredProperties = allProperties.filter(property => {
        const regionMatch = !region || region === 'all' || property.region === region;
        const typeMatch = !type || type.length === 0 || type.includes('all') || type.includes(property.type);
        const statusMatch = !status || status.length === 0 || status.includes('all') || status.includes(property.status) || (property.dubaiStatus && status.includes(property.dubaiStatus));
        const minPriceMatch = !minPrice || property.price >= minPrice;
        const maxPriceMatch = !maxPrice || property.price <= maxPrice;
        const bedroomsMatch = bedrooms === undefined || String(bedrooms) === 'any' || bedrooms === property.bedrooms;
        const bathroomsMatch = bathrooms === undefined || String(bathrooms) === 'any' || bathrooms === property.bathrooms;

        return regionMatch && typeMatch && statusMatch && minPriceMatch && maxPriceMatch && bedroomsMatch && bathroomsMatch;
    }).sort((a, b) => {
        if (sortBy === 'price-asc') {
            return a.price - b.price;
        } else if (sortBy === 'price-desc') {
            return b.price - a.price;
        } else {
            // newest first (default)
            // If createdAt is not available, keep original order
            if (!a.createdAt || !b.createdAt) return 0;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    const totalPages = Math.ceil(filteredProperties.length / limit);
    const paginatedProperties = filteredProperties.slice((page - 1) * limit, page * limit);

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set('page', pageNumber.toString());
        return `/search?${params.toString()}`;
    };

    return (
        <div className="bg-background">
            {/* Search Bar Section */}
            <div className="bg-white border-b border-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-serif text-[#2C2A26] mb-8 text-center">
                            Find your perfect property
                        </h1>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="search"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                    placeholder="Search by location (e.g. 'Downtown Dubai', 'Kensington')"
                                    className="h-14 pl-12 rounded-full border-gray-200 bg-gray-50 focus:bg-white transition-all duration-300 text-base"
                                />
                            </div>
                            <Button type="submit" size="lg" className="h-14 px-10 rounded-full bg-[#2C2A26] hover:bg-[#433E38] text-white transition-colors duration-300">
                                Search
                            </Button>
                        </div>
                        {location && (
                            <div className="mt-4 text-center text-sm text-muted-foreground">
                                Searching in: <span className="font-medium text-[#2C2A26]">{location}</span>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <aside className="lg:col-span-3 mb-8 lg:mb-0">
                        <PropertyFilters />
                    </aside>
                    <main className="lg:col-span-9">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                            <h1 className="text-2xl font-serif font-medium tracking-tight text-[#2C2A26] dark:text-white">Properties <span className="text-muted-foreground font-light text-lg">({filteredProperties.length} properties found)</span></h1>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <Select defaultValue="newest" onValueChange={setSortBy}>
                                    <SelectTrigger className="w-full md:w-[150px] bg-card border-border">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest First</SelectItem>
                                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                    </SelectContent>
                                </Select>
                                <ToggleGroup type="single" defaultValue="grid" variant="outline" className="bg-card border rounded-md p-1 h-10 gap-0" onValueChange={(value) => value && setView(value)}>
                                    <ToggleGroupItem value="grid" aria-label="Grid view" className="border-none data-[state=on]:bg-background">
                                        <Grid3x3 className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="list" aria-label="List view" className="border-none data-[state=on]:bg-background">
                                        <List className="h-4 w-4" />
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                        </div>
                        {paginatedProperties.length > 0 ? (
                            <>
                                {view === 'grid' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {paginatedProperties.map((property) => (
                                            <PropertyCard key={property.id} property={property} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-6">
                                        {paginatedProperties.map((property) => (
                                            <PropertyCardList key={property.id} property={property} />
                                        ))}
                                    </div>
                                )}
                                {totalPages > 1 && (
                                    <Pagination className="mt-8">
                                        <PaginationContent>
                                            {page > 1 && (
                                                <PaginationItem>
                                                    <PaginationPrevious href={createPageURL(page - 1)} />
                                                </PaginationItem>
                                            )}
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                                <PaginationItem key={p}>
                                                    <PaginationLink href={createPageURL(p)} isActive={page === p}>
                                                        {p}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}
                                            {page < totalPages && (
                                                <PaginationItem>
                                                    <PaginationNext href={createPageURL(page + 1)} />
                                                </PaginationItem>
                                            )}
                                        </PaginationContent>
                                    </Pagination>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-lg bg-card border border-dashed h-full">
                                <Search className="w-16 h-16 text-muted-foreground mb-4" />
                                <h2 className="text-2xl font-semibold mb-2">No Properties Found</h2>
                                <p className="text-muted-foreground">Try adjusting your search filters to find what you're looking for.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
}
