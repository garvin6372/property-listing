"use client"
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function CitySections() {
  const londonImage = PlaceHolderImages.find(img => img.id === 'london-Skyvera');
  const dubaiImage = PlaceHolderImages.find(img => img.id === 'dubai-Skyvera');

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#2C2A26] dark:text-white mb-6">
            London & Dubai
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our premium property listings in two of the world's most dynamic real estate markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* London Section */}
          <div className="relative group overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:h-[500px]">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
            {/* Placeholder image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: "url('/landing_page.png')" }}
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-12">
              <h3 className="text-2xl md:text-4xl font-serif text-white mb-3 md:mb-4">London</h3>
              <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 max-w-md">
                Buy-to-let, family homes, new-builds in Zones 3–6.
              </p>
              <Button asChild className="w-fit bg-white text-black hover:bg-white/90 rounded-full px-6 md:px-8 py-2 md:py-3 text-sm md:text-base">
                <Link href="/search/london">
                  Explore London Homes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Dubai Section */}
          <div className="relative group overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:h-[500px]">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
            {/* Placeholder image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: "url('/landing_page.png')" }}
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-12">
              <h3 className="text-2xl md:text-4xl font-serif text-white mb-3 md:mb-4">Dubai</h3>
              <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 max-w-md">
                Off-plan, luxury villas, 1% monthly payment plans.
              </p>
              <Button asChild className="w-fit bg-white text-black hover:bg-white/90 rounded-full px-6 md:px-8 py-2 md:py-3 text-sm md:text-base">
                <Link href="/search/dubai">
                  View Dubai Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}