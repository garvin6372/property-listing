'use client'

import React from 'react';
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getClientFeaturedProperties } from '@/lib/data';
import { PropertyCard } from '@/components/property-card';
import { Button } from '@/components/ui/button';
import Hero from "@/components/hero";
import { Testimonials } from "@/components/testimonials";
import { CitySections } from "@/components/city-sections";
import { WhySkyvera } from "@/components/why-skyvera";
import { HowItWorks } from "@/components/how-it-works";
import { SeoContent } from "@/components/seo-content";

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = React.useState<Awaited<ReturnType<typeof getClientFeaturedProperties>>>([
    {
      id: 'aspirz-1',
      title: 'Modern Studio in Aspirz',
      price: 850000,
      currency: 'AED',
      status: 'Off-Plan',
      location: 'Dubai Sports City, Dubai',
      bedrooms: 3,
      bathrooms: 2,
      area: 450,
      images: [{ imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop', id: 'img-aspirz-1', description: 'Modern Studio Interior', imageHint: 'interior' }],
      type: 'Studio'
    },
    {
      id: 'breez-1',
      title: 'Luxury 2-Bed with Sea View in Breez',
      price: 1800000,
      currency: 'AED',
      status: 'Off-Plan',
      location: 'Dubai Maritime City, Dubai',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      images: [{ imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', id: 'img-breez-1', description: 'Breez Tower Exterior', imageHint: 'exterior' }],
      type: 'Apartment'
    },
    {
      id: 'aspirz-2',
      title: 'Premium 2-Bed Flex Apartment in Aspirz',
      price: 1400000,
      currency: 'AED',
      status: 'Off-Plan',
      location: 'Dubai Sports City, Dubai',
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      images: [{ imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop', id: 'img-aspirz-2', description: 'Spacious Living Room', imageHint: 'interior' }],
      type: 'Apartment'
    }
  ] as any);

  React.useEffect(() => {
    // Get featured properties (first 6)
    getClientFeaturedProperties().then(properties => {
      if (properties && properties.length > 0) {
        setFeaturedProperties(properties.slice(0, 3));
      }
    });
  }, []);

  const expertCards = [
    {
      title: "",
      stat: "Find Your Ideal Property",
      description: "Buy",
      href: "#cities"
    },
    {
      title: "",
      stat: "Maximize Your Property Value",
      description: "Sell",
      href: "/valuation"
    },
    {
      title: "",
      stat: "Find Your Perfect Rental",
      description: "Rent",
      href: "#cities"
    },
    {
      title: "",
      stat: "Grow Your Real Estate Portfolio",
      description: "Invest",
      href: "#cities"
    }
  ];


  return (
    <>
      <div className={`bg-background min-h-screen flex flex-col`}>
        <Hero />
        <CitySections />
        {/* <HeroSearch /> */}

        {/* Featured Properties Section */}
        <div id="featured-properties" className="container mx-auto px-4 py-16 md:py-32 scroll-mt-20 md:scroll-mt-28">
          <div className="flex flex-col md:flex-row items-end justify-between mb-10 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground/80 mb-3 block">Exclusive Listings</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground font-light leading-tight tracking-wide">
                Featured Properties
              </h2>
              <p className="text-muted-foreground mt-4 md:mt-6 text-lg font-light leading-relaxed">
                Discover our handpicked selection of premium properties in prime locations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Optional: Simple Filters like 'London' / 'Dubai' / 'All' or a modal trigger */}
              <Button asChild variant="outline" className="w-full sm:w-auto rounded-full px-6 md:px-8 h-10 md:h-12 border-border text-foreground hover:bg-muted font-medium transition-all duration-300">
                <Link href="/search">Advanced Filters</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto rounded-full px-6 md:px-8 h-10 md:h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all duration-300 shadow-sm hover:shadow-md">
                <Link href="/search">View All Properties</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProperties.map((property, index) => (
              <div key={property.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {featuredProperties.length === 0 && (
            <div className="text-center py-16 md:py-20 text-muted-foreground font-light">
              {/* No properties found */}
            </div>
          )}
        </div>

        <WhySkyvera />
        <HowItWorks />
        <Testimonials />

        {/* When you need experts Section */}
        <div className="bg-muted/30 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-20 gap-6 md:gap-8">
              <div>
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground/80 mb-3 block">Our Expertise</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground font-light leading-tight tracking-wide">
                  Our Services
                </h2>
              </div>
              <p className="max-w-md text-muted-foreground font-light text-lg leading-relaxed mt-4 md:mt-0">
                We provide market-leading advice and support to help you make the right property decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {expertCards.map((card, index) => (
                <Link href={card.href} key={index} className="group">
                  <div className="h-full bg-background border border-border/40 shadow-soft hover:shadow-soft-lg transition-all duration-700 ease-luxury p-6 sm:p-8 md:p-10 rounded-xl flex flex-col justify-between min-h-[180px] sm:min-h-[280px] md:min-h-[320px]">
                    <div>
                      <div className="flex justify-end mb-4 sm:mb-6 md:mb-8">
                        <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground/40 group-hover:text-primary transition-all duration-500 ease-luxury transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                      {card.title && <h3 className="font-serif text-xl md:text-2xl mb-3 md:mb-4 text-foreground/80 font-light tracking-wide">{card.title}</h3>}
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-foreground font-light tracking-wide leading-tight mb-2 md:mb-4">{card.stat}</p>
                      <h3 className="text-primary/70 text-base sm:text-lg md:text-xl font-light tracking-widest uppercase">{card.description}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <SeoContent />
      </div>
    </>
  );
}