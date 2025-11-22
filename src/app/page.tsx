'use client'

import { HeroSearch } from "@/components/hero-search";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getClientProperties } from '@/lib/data';
import { PropertyCard } from '@/components/property-card';
import React from 'react';
import { Button } from "@/components/ui/button";
import Hero from "@/components/hero";

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = React.useState<Awaited<ReturnType<typeof getClientProperties>>>([]);

  React.useEffect(() => {
    // Get featured properties (first 6)
    getClientProperties().then(properties => {
      setFeaturedProperties(properties.slice(0, 6));
    });
  }, []);

  const expertCards = [
    {
      title: "Let your property hassle free",
      stat: "96%",
      description: "of the asking price consistently achieved",
      href: "/"
    },
    {
      title: "What's your home worth?",
      stat: "More",
      description: "sales agreed in London than any other agent",
      href: "/"
    },
    {
      title: "Find the right property to rent",
      stat: "332",
      description: "new listings each week",
      href: "/"
    },
    {
      title: "Find the right property for sale",
      stat: "356",
      description: "new properties registered every week",
      href: "/"
    }
  ];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Hero />
      <HeroSearch />

      {/* Featured Properties Section */}
      <div id="featured-properties" className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2 block">Exclusive Listings</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2C2A26] leading-tight">
              Featured Properties
            </h2>
            <p className="text-muted-foreground mt-4 text-lg font-light">
              Discover our handpicked selection of premium properties in prime locations.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full px-8 h-12 border-[#2C2A26] text-[#2C2A26] hover:bg-[#2C2A26] hover:text-white transition-all duration-300">
            <Link href="/search">View All Properties</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {featuredProperties.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-light">
            Loading featured properties...
          </div>
        )}
      </div>

      {/* When you need experts Section */}
      <div className="bg-[#2C2A26] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
            <div>
              <span className="text-sm font-medium uppercase tracking-widest text-white/60 mb-2 block">Our Expertise</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                When you need experts
              </h2>
            </div>
            <p className="max-w-md text-white/70 font-light text-lg">
              We provide market-leading advice and support to help you make the right property decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertCards.map((card, index) => (
              <Link href={card.href} key={index} className="group">
                <div className="h-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 p-8 rounded-xl flex flex-col justify-between min-h-[280px]">
                  <div>
                    <div className="flex justify-end mb-6">
                      <ArrowUpRight className="h-6 w-6 text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-serif text-2xl mb-4 text-white group-hover:translate-x-1 transition-transform duration-300">{card.title}</h3>
                  </div>
                  <div>
                    <p className="text-5xl font-serif text-white/90 mb-2">{card.stat}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}