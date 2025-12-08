
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Bath, SquareGanttChart, MapPin, MessageSquare, Heart } from "lucide-react";
import type { PropertyWithImages } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";

interface PropertyCardListProps {
  property: PropertyWithImages;
}

export function PropertyCardList({ property }: PropertyCardListProps) {
  const displayStatus = property.dubaiStatus && (property.dubaiStatus as string) !== 'none' ? property.dubaiStatus : property.status;

  return (
    <Card className="w-full overflow-hidden group border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 bg-card flex flex-col md:flex-row">
      <div className="relative md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden">
        <Link href={`/properties/${property.id}`} aria-label={property.title}>
          <Image
            src={property.images[0]?.imageUrl || "https://placehold.co/600x400"}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-ai-hint={property.images[0]?.imageHint || "house exterior"}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
        <div className="absolute bottom-4 left-4">
          <Badge className={`capitalize px-3 py-1 text-xs font-medium tracking-wide rounded-full ${displayStatus === 'Buy' || displayStatus === 'Rent' ? 'bg-primary text-white' : 'bg-green-600 text-white'}`}>
            {displayStatus}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-center">
        <div>
          <div className="flex justify-between items-start gap-4 mb-2">
            <Link href={`/properties/${property.id}`} className="group-hover:text-[#2C2A26] transition-colors">
              <h3 className="font-serif text-2xl font-medium leading-tight tracking-tight text-foreground">
                {property.title}
              </h3>
            </Link>
            <div className="text-2xl font-serif text-[#2C2A26] dark:text-white flex-shrink-0 pl-4">
              {formatPrice(property.price, property.region === 'Dubai' ? 'AED' : 'GBP')}
            </div>
          </div>

          <div className="flex items-center text-muted-foreground text-sm mb-6">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate font-light">{property.location}</span>
          </div>

          <p className="text-muted-foreground font-light leading-relaxed mb-6 line-clamp-2">
            {property.description}
          </p>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-border/50">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
          <Button variant="default" className="rounded-full bg-primary hover:bg-[#433E38] text-white transition-all duration-300 px-8 dark:bg-white dark:text-[#2C2A26] dark:hover:bg-gray-200" asChild>
            <Link href={`/properties/${property.id}#inquire`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
