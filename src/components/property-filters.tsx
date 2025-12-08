"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { regions } from "@/lib/data";
import { getPropertyTypes, getListingStatuses } from "@/lib/data";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import React, { useState, useEffect } from "react";
import { Filter, Search, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "./ui/scroll-area";
import { getLocations } from "@/lib/data";
import { useFilter } from "@/contexts/filter-context";

function FiltersContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setFilterVisible } = useFilter();

  // Determine default region based on the current path
  let defaultRegion = 'Dubai'; // Default to Dubai
  if (pathname.includes('/search/london')) {
    defaultRegion = 'London';
  } else if (pathname.includes('/search/dubai')) {
    defaultRegion = 'Dubai';
  }

  const [currentFilters, setCurrentFilters] = useState({
    region: searchParams.get('region') || defaultRegion,
    type: searchParams.get('type') || 'all',
    status: searchParams.get('status') || 'all',
    location: searchParams.get('location') || 'all',
    bedrooms: searchParams.get('bedrooms') || 'any',
    bathrooms: searchParams.get('bathrooms') || 'any',
  });

  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const [priceRange, setPriceRange] = useState([
    minPrice ? parseInt(minPrice) : 0,
    maxPrice ? parseInt(maxPrice) : 50000000
  ]);

  const [locations, setLocations] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [listingStatuses, setListingStatuses] = useState<string[]>([]);

  // Fetch locations, property types, and listing statuses when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedLocations = await getLocations();
        setLocations(fetchedLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setLocations([]);
      }

      try {
        const [types, statuses] = await Promise.all([
          getPropertyTypes(),
          getListingStatuses()
        ]);
        setPropertyTypes(types);
        setListingStatuses(statuses);
      } catch (error) {
        console.error('Error fetching property types and statuses:', error);
        // Fallback to static data if dynamic fetch fails
        setPropertyTypes(["Apartment", "Villa", "Townhouse", "Office", "Penthouse"]);
        setListingStatuses(["Buy", "Rent"]);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (key: string, value: string | string[]) => {
    setCurrentFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    // For regional pages, we don't include the region in the URL since it's implicit
    if (currentFilters.type && currentFilters.type !== 'all') params.set('type', currentFilters.type);
    if (currentFilters.status && currentFilters.status !== 'all') params.set('status', currentFilters.status);
    if (currentFilters.location && currentFilters.location !== 'all') params.set('location', currentFilters.location);
    if (currentFilters.bedrooms && currentFilters.bedrooms !== 'any') params.set('bedrooms', currentFilters.bedrooms);
    if (currentFilters.bathrooms && currentFilters.bathrooms !== 'any') params.set('bathrooms', currentFilters.bathrooms);

    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < 50000000) params.set('maxPrice', priceRange[1].toString());

    // For the regional search pages, we don't need to include the region in the URL
    // as it's already implied by the path
    if (pathname.includes('/search/london') || pathname.includes('/search/dubai')) {
      router.push(`${pathname}?${params.toString()}`);
    } else {
      // For main search page, include region parameter
      if (currentFilters.region && currentFilters.region !== 'all') params.set('region', currentFilters.region);
      router.push(`/search?${params.toString()}`);
    }
    setFilterVisible(false);
  }

  const clearFilters = () => {
    setCurrentFilters({
      region: defaultRegion, type: 'all', status: 'all', location: 'all', bedrooms: 'any', bathrooms: 'any'
    });
    setPriceRange([0, 50000000]);

    // For the regional search pages, clear filters but stay on the same page
    if (pathname.includes('/search/london') || pathname.includes('/search/dubai')) {
      router.push(pathname);
    } else {
      router.push('/search');
    }
  };

  const isFilterActive = searchParams.toString().length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/50">
        <SheetTitle className="flex items-center gap-2 font-serif text-xl font-medium text-[#2C2A26] dark:text-white">
          <Filter className="w-5 h-5" />
          Filter Properties
        </SheetTitle>
        {isFilterActive && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm h-auto p-1 hover:bg-transparent hover:text-[#2C2A26] dark:hover:text-white transition-colors">
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
      <div className="space-y-6 pt-6">
        {/* Only show region selector on the main search page, not on regional pages */}
        {!pathname.includes('/search/london') && !pathname.includes('/search/dubai') && (
          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Region</Label>
            <ToggleGroup
              type="single"
              defaultValue={defaultRegion}
              className="grid grid-cols-2 gap-2"
              value={currentFilters.region}
              onValueChange={(value) => { if (value) handleFilterChange('region', value) }}
            >
              <ToggleGroupItem value="Dubai" className="rounded-full data-[state=on]:bg-primary data-[state=on]:text-white border border-input hover:bg-accent hover:text-accent-foreground transition-all duration-300">Dubai</ToggleGroupItem>
              <ToggleGroupItem value="London" className="rounded-full data-[state=on]:bg-primary data-[state=on]:text-white border border-input hover:bg-accent hover:text-accent-foreground transition-all duration-300">London</ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}

        <div className="space-y-3">
          <Label htmlFor="type" className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Property Type</Label>
          <Select value={currentFilters.type} onValueChange={value => handleFilterChange('type', value)}>
            <SelectTrigger id="type" className="rounded-full h-11 border-input bg-background hover:bg-accent/50 transition-colors"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {propertyTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="location" className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Location</Label>
          <Select value={currentFilters.location} onValueChange={value => handleFilterChange('location', value)}>
            <SelectTrigger id="location" className="rounded-full h-11 border-input bg-background hover:bg-accent/50 transition-colors"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="status" className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Status</Label>
          <Select value={currentFilters.status} onValueChange={value => handleFilterChange('status', value)}>
            <SelectTrigger id="status" className="rounded-full h-11 border-input bg-background hover:bg-accent/50 transition-colors"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {listingStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Price Range</Label>
            <div className="text-sm font-medium text-[#2C2A26] dark:text-white">
              {formatPrice(priceRange[0], currentFilters.region === 'London' ? 'GBP' : 'AED')} - {formatPrice(priceRange[1], currentFilters.region === 'London' ? 'GBP' : 'AED')}{priceRange[1] === 50000000 ? '+' : ''}
            </div>
          </div>
          <Slider
            min={0}
            max={50000000}
            step={100000}
            value={priceRange}
            onValueChange={setPriceRange}
            className="py-4"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="bedrooms" className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Bedrooms</Label>
            <Select value={currentFilters.bedrooms} onValueChange={value => handleFilterChange('bedrooms', value)}>
              <SelectTrigger id="bedrooms" className="rounded-full h-11 border-input bg-background hover:bg-accent/50 transition-colors"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {[1, 2, 3, 4, 5, 6].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label htmlFor="bathrooms" className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Bathrooms</Label>
            <Select value={currentFilters.bathrooms} onValueChange={value => handleFilterChange('bathrooms', value)}>
              <SelectTrigger id="bathrooms" className="rounded-full h-11 border-input bg-background hover:bg-accent/50 transition-colors"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {[1, 2, 3, 4, 5, 6].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={applyFilters} className="w-full rounded-full bg-primary hover:bg-[#433E38] text-white h-12 text-base font-medium transition-all duration-300 dark:bg-white dark:text-[#2C2A26] dark:hover:bg-gray-200 mt-4">
          <Search className="w-4 h-4 mr-2" />
          Search Properties
        </Button>
      </div>
    </div>
  );
}

export function PropertyFilters() {
  const { isFilterVisible, setFilterVisible } = useFilter();

  return (
    <Sheet open={isFilterVisible} onOpenChange={setFilterVisible}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
        <div className="py-4">
          <FiltersContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}