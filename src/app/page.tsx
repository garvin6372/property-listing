'use client'

import React, { useState, useEffect } from 'react';
import { HeroSearch } from "@/components/hero-search";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getClientFeaturedProperties } from '@/lib/data';
import { PropertyCard } from '@/components/property-card';
import { Button } from "@/components/ui/button";
import Hero from "@/components/hero";
import { CityHero } from "@/components/city-hero";
import { Testimonials } from "@/components/testimonials";
import { ViewState } from '../../types';
import LoadingScreen from '@/components/LoadingScreen';
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
        setFeaturedProperties(properties.slice(0, 6));
      }
    });
  }, []);

  const expertCards = [
    {
      title: "",
      stat: "Find Your Ideal Property",
      description: "Buy",
      href: "/"
    },
    {
      title: "",
      stat: "Maximize Your Property Value",
      description: "Sell",
      href: "/"
    },
    {
      title: "",
      stat: "Find Your Perfect Rental",
      description: "Rent",
      href: "/"
    },
    {
      title: "",
      stat: "Grow Your Real Estate Portfolio",
      description: "Invest",
      href: "/"
    }
  ];


  return (
    <>
      <div className={`bg-background min-h-screen flex flex-col`}>
        <Hero />
        <CitySections />
        {/* <HeroSearch /> */}

        {/* Featured Properties Section */}
        <div id="featured-properties" className="container mx-auto px-4 py-12 md:py-24 scroll-mt-20 md:scroll-mt-28">
          <div className="flex flex-col md:flex-row items-end justify-between mb-10 md:mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2 block">Exclusive Listings</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2C2A26] dark:text-white leading-tight">
                Featured Properties
              </h2>
              <p className="text-muted-foreground mt-3 md:mt-4 text-base md:text-lg font-light">
                Discover our handpicked selection of premium properties in prime locations.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full px-6 md:px-8 h-10 md:h-12 border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary transition-all duration-300">
              <Link href="/search">View All Properties</Link>
            </Button>
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
        <div className="bg-[#2C2A26] text-white py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16 gap-6 md:gap-8">
              <div>
                {/* <span className="text-sm font-medium uppercase tracking-widest text-white/60 mb-2 block">Our Expertise</span> */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight">
                  Our services
                </h2>
              </div>
              <p className="max-w-md text-white/70 font-light text-base md:text-lg">
                We provide market-leading advice and support to help you make the right property decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {expertCards.map((card, index) => (
                <Link href={card.href} key={index} className="group">
                  <div className="h-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 p-6 md:p-8 rounded-xl flex flex-col justify-between min-h-[240px] md:min-h-[280px]">
                    <div>
                      <div className="flex justify-end mb-4 md:mb-6">
                        <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 text-white/40 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl mb-3 md:mb-4 text-white group-hover:translate-x-1 transition-transform duration-300">{card.title}</h3>
                    </div>
                    <div>
                      <p className="text-3xl md:text-5xl font-serif text-white/90 mb-1 md:mb-2">{card.stat}</p>
                      <h3 className="text-white/50 text-xl md:text-2xl leading-relaxed">{card.description}</h3>
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