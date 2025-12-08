
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Bath, SquareGanttChart, MapPin, MessageSquare, Heart } from "lucide-react";
import type { PropertyWithImages } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";

interface PropertyCardProps {
  property: PropertyWithImages;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const displayStatus = property.dubaiStatus && (property.dubaiStatus as string) !== 'none' ? property.dubaiStatus : property.status;

  return (
    <Card className="w-full overflow-hidden group border-none shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 bg-card">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
        <Link href={`/properties/${property.id}`} aria-label={property.title}>
          <Image
            src={property.images[0]?.imageUrl || "https://placehold.co/600x400"}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-ai-hint={property.images[0]?.imageHint || "house exterior"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        <div className="absolute bottom-4 left-4">
          <Badge
            className={`capitalize px-3 py-1 text-xs font-medium tracking-wide rounded-full ${displayStatus === 'Buy' || displayStatus === 'Rent' ? 'bg-primary text-white' : 'bg-green-600 text-white'}`}>
            {displayStatus}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <Link href={`/properties/${property.id}`} className="group-hover:text-[#2C2A26] transition-colors">
            <h3 className="font-serif text-xl font-medium leading-tight tracking-tight truncate pr-2 text-foreground">
              {property.title}
            </h3>
          </Link>
        </div>

        <div className="text-2xl text-[#2C2A26] dark:text-white">
          {formatPrice(property.price, property.region === 'Dubai' ? 'AED' : 'GBP')}
        </div>

        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate font-light">{property.location}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground gap-6 py-2 border-t border-border/50 border-b">
          <div className="flex items-center gap-2">
            <BedDouble className="w-4 h-4" />
            <span className="font-light">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4" />
            <span className="font-light">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <SquareGanttChart className="w-4 h-4" />
            <span className="font-light">{property.area.toLocaleString()} sqft</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <Button variant="default" className="w-full rounded-full bg-primary hover:bg-[#433E38] text-white transition-all duration-300 dark:bg-white dark:text-[#2C2A26] dark:hover:bg-gray-200" asChild>
            <Link href={`/properties/${property.id}#inquire`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
