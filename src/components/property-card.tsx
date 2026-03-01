
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Bath, SquareGanttChart, MapPin, Heart } from "lucide-react";
import type { PropertyWithImages } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";

interface PropertyCardProps {
  property: PropertyWithImages;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const displayStatus = property.dubaiStatus && (property.dubaiStatus as string) !== 'none' ? property.dubaiStatus : property.status;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check local storage on mount
    const savedFavorites = JSON.parse(localStorage.getItem("skyvera_favorites") || "[]");
    if (savedFavorites.includes(property.id)) {
      setIsFavorite(true);
    }
  }, [property.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent triggering the link wrapper if any

    const savedFavorites = JSON.parse(localStorage.getItem("skyvera_favorites") || "[]");
    let newFavorites;

    if (isFavorite) {
      newFavorites = savedFavorites.filter((id: string) => id !== property.id);
    } else {
      newFavorites = [...savedFavorites, property.id];
    }

    localStorage.setItem("skyvera_favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="w-full overflow-hidden group border border-border/20 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-700 ease-luxury bg-card rounded-xl flex flex-col h-full">
      {/* Big Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Link href={`/properties/${property.id}`} aria-label={property.title}>
          <Image
            src={property.images[0]?.imageUrl || "https://placehold.co/600x400"}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-ai-hint={property.images[0]?.imageHint || "house exterior"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={90}
          />
        </Link>
        <div className="absolute top-4 right-4 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 h-10 w-10 text-white transition-colors"
            onClick={toggleFavorite}
          >
            <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-white"} />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 z-20 flex gap-2">
          <Badge
            className={`capitalize px-3 py-1.5 text-xs font-semibold tracking-wider rounded-md shadow-md ${displayStatus === 'Buy' || displayStatus === 'Rent' ? 'bg-primary/95 text-white' : 'bg-green-600/95 text-white'}`}>
            {displayStatus}
          </Badge>
          <Badge className="bg-background/95 text-foreground px-3 py-1.5 text-xs font-semibold tracking-wider rounded-md shadow-md">
            {property.type}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6 md:p-8 flex-1 flex flex-col space-y-4">
        {/* Price Bold */}
        <div className="text-2xl md:text-3xl font-bold font-serif text-foreground tracking-tight">
          {formatPrice(property.price, property.region === 'Dubai' ? 'AED' : 'GBP')}
        </div>

        {/* Title */}
        <Link href={`/properties/${property.id}`} className="group-hover:text-primary transition-colors block">
          <h3 className="font-serif text-xl md:text-2xl font-light tracking-wide leading-relaxed truncate text-foreground/90">
            {property.title}
          </h3>
        </Link>

        {/* Location Small Text */}
        <div className="flex items-center text-muted-foreground text-xs md:text-sm tracking-wide">
          <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0 text-primary/70" />
          <span className="truncate font-light">{property.location}</span>
        </div>

        {/* 3 Icons Layout */}
        <div className="flex items-center justify-between text-muted-foreground text-sm pt-6 mt-auto border-t border-border/30">
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
      </CardContent>
    </Card>
  );
}
