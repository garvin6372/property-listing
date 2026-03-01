
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
    <Card className="w-full overflow-hidden group border border-border/20 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-700 ease-luxury bg-card rounded-xl flex flex-col md:flex-row">
      <div className="relative md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden">
        <Link href={`/properties/${property.id}`} aria-label={property.title}>
          <Image
            src={property.images[0]?.imageUrl || "https://placehold.co/600x400"}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-ai-hint={property.images[0]?.imageHint || "house exterior"}
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={90}
          />
        </Link>
        <div className="absolute top-4 right-4 z-20 md:hidden">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 h-10 w-10 text-white transition-colors">
            <Heart size={20} className="text-white" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge className={`capitalize px-3 py-1 text-xs font-medium tracking-wide rounded-full ${displayStatus === 'Buy' || displayStatus === 'Rent' ? 'bg-primary text-white' : 'bg-green-600 text-white'}`}>
            {displayStatus}
          </Badge>
        </div>
      </div>
      <CardContent className="p-8 md:p-10 space-y-4 flex-1 flex flex-col justify-center">
        <div>
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-3 md:gap-4 mb-3">
            <Link href={`/properties/${property.id}`} className="group-hover:text-primary transition-colors">
              <h3 className="font-serif text-2xl md:text-3xl font-light leading-relaxed tracking-wide text-foreground/90">
                {property.title}
              </h3>
            </Link>
            <div className="text-2xl md:text-3xl font-bold font-serif text-foreground flex-shrink-0 tracking-tight">
              {formatPrice(property.price, property.region === 'Dubai' ? 'AED' : 'GBP')}
            </div>
          </div>

          <div className="flex items-center text-muted-foreground text-sm mb-6 tracking-wide">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-primary/70" />
            <span className="truncate font-light">{property.location}</span>
          </div>

          <p className="text-muted-foreground font-light leading-loose mb-8 line-clamp-2 md:line-clamp-3">
            {property.description}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-auto border-t border-border/30 gap-6 md:gap-0">
          <div className="flex w-full md:w-auto justify-between md:justify-start items-center gap-2 sm:gap-6 text-sm text-muted-foreground mr-auto">
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-primary" />
              <span className="font-medium">{property.bedrooms} <span className="font-light text-xs sm:text-sm opacity-80">Beds</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-primary" />
              <span className="font-medium">{property.bathrooms} <span className="font-light text-xs sm:text-sm opacity-80">Baths</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <SquareGanttChart className="w-4 h-4 text-primary" />
              <span className="font-medium">{property.area.toLocaleString()} <span className="font-light text-xs sm:text-sm opacity-80">sqft</span></span>
            </div>
          </div>
          <Button variant="default" className="w-full md:w-auto rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 px-8 py-6 md:py-4 shadow-md font-medium text-base md:text-sm" asChild>
            <Link href={`/properties/${property.id}#inquire`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
