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
      id: '1',
      title: '1-Bed Apartment in Business Bay',
      price: 1200000,
      currency: 'AED',
      status: 'Off-Plan',
      location: 'Business Bay, Dubai',
      bedrooms: 1,
      bathrooms: 1,
      area: 850,
      images: [{ imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop', id: 'img1', description: 'Main Image', imageHint: 'interior' }],
      type: 'Apartment'
    },
    {
      id: '2',
      title: 'Luxury Villa in Palm Jumeirah',
      price: 15000000,
      currency: 'AED',
      status: 'Ready',
      location: 'Palm Jumeirah, Dubai',
      bedrooms: 5,
      bathrooms: 6,
      area: 5000,
      images: [{ imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', id: 'img2', description: 'Main Image', imageHint: 'exterior' }],
      type: 'Villa'
    },
    {
      id: '3',
      title: 'Modern Townhouse in London',
      price: 850000,
      currency: 'GBP',
      status: 'New Build',
      location: 'Greenwich, London',
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      images: [{ imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop', id: 'img3', description: 'Main Image', imageHint: 'exterior' }],
      type: 'Townhouse'
    },
    {
      id: '4',
      title: 'Penthouse with Marina View',
      price: 3500000,
      currency: 'AED',
      status: 'Ready',
      location: 'Dubai Marina, Dubai',
      bedrooms: 3,
      bathrooms: 3,
      area: 2100,
      images: [{ imageUrl: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop', id: 'img4', description: 'Main Image', imageHint: 'interior' }],
      type: 'Penthouse'
    },
    {
      id: '5',
      title: 'Victorian Family Home',
      price: 1200000,
      currency: 'GBP',
      status: 'Resale',
      location: 'Richmond, London',
      bedrooms: 4,
      bathrooms: 3,
      area: 1800,
      images: [{ imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop', id: 'img5', description: 'Main Image', imageHint: 'exterior' }],
      type: 'House'
    },
    {
      id: '6',
      title: 'Studio in Downtown',
      price: 950000,
      currency: 'AED',
      status: 'Off-Plan',
      location: 'Downtown Dubai',
      bedrooms: 0,
      bathrooms: 1,
      area: 500,
      images: [{ imageUrl: 'https://images.unsplash.com/photo-1591348122449-02525d70379b?q=80&w=2070&auto=format&fit=crop', id: 'img6', description: 'Main Image', imageHint: 'interior' }],
      type: 'Studio'
    }
  ] as any);
  const [viewState, setViewState] = useState<ViewState>(ViewState.LOADING);

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

  const handleLoadingComplete = () => {
    setViewState(ViewState.LANDING);
  };


  return (
    <>
      {viewState === ViewState.LOADING && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      <div className={`bg-background min-h-screen flex flex-col ${viewState === ViewState.LANDING ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <CitySections />
        {/* <HeroSearch /> */}

        {/* Featured Properties Section */}
        <div id="featured-properties" className="container mx-auto px-4 py-12 md:py-24 scroll-mt-28">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2 block">Exclusive Listings</span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2C2A26] dark:text-white leading-tight">
                Featured Properties
              </h2>
              <p className="text-muted-foreground mt-4 text-lg font-light">
                Discover our handpicked selection of premium properties in prime locations.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full px-8 h-12 border-[#2C2A26] text-[#2C2A26] hover:bg-[#2C2A26] hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-[#2C2A26] transition-all duration-300">
              <Link href="/search">View All Properties</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <div key={property.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {featuredProperties.length === 0 && (
            <div className="text-center py-20 text-muted-foreground font-light">
              {/* No properties found */}
            </div>
          )}
        </div>

        <WhySkyvera />
        <HowItWorks />
        <SeoContent />

        {/* When you need experts Section */}
        <div className="bg-[#2C2A26] text-white py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
              <div>
                {/* <span className="text-sm font-medium uppercase tracking-widest text-white/60 mb-2 block">Our Expertise</span> */}
                <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                  Our services
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
                      <h3 className="text-white/50 text-2xl leading-relaxed">{card.description}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Testimonials />
      </div>
    </>
  );
}