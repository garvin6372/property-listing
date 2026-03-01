"use client"
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function CitySections() {
  const londonImage = PlaceHolderImages.find(img => img.id === 'london-Skyvera');
  const dubaiImage = PlaceHolderImages.find(img => img.id === 'dubai-Skyvera');

  return (
    <section className="py-16 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide text-foreground mb-6">
            London & Dubai
          </h2>
          <p className="text-lg font-light tracking-wide text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our premium property listings in two of the world's most dynamic real estate markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* London Section */}
          <div className="relative group overflow-hidden rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-700 ease-luxury aspect-[4/3] md:aspect-auto md:h-[540px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-all duration-700 z-10" />
            {/* Placeholder image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-luxury group-hover:scale-105"
              style={{ backgroundImage: "url('/landing_page.png')" }}
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-serif font-light tracking-wide text-white mb-4">London</h3>
              <p className="text-white/90 font-light tracking-wide text-base md:text-lg mb-8 max-w-md leading-relaxed">
                Buy-to-let, family homes, new-builds in Zones 1–6.
              </p>
              <Button asChild className="w-fit bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-medium tracking-wide rounded-full px-8 md:px-10 py-6 md:py-6 text-sm md:text-base">
                <Link href="/search/london">
                  Explore London Homes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Dubai Section */}
          <div className="relative group overflow-hidden rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-700 ease-luxury aspect-[4/3] md:aspect-auto md:h-[540px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-all duration-700 z-10" />
            {/* Placeholder image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-luxury group-hover:scale-105"
              style={{ backgroundImage: "url('/landing_page.png')" }}
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-serif font-light tracking-wide text-white mb-4">Dubai</h3>
              <p className="text-white/90 font-light tracking-wide text-base md:text-lg mb-8 max-w-md leading-relaxed">
                Off-plan, luxury villas, 1% monthly payment plans.
              </p>
              <Button asChild className="w-fit bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-medium tracking-wide rounded-full px-8 md:px-10 py-6 md:py-6 text-sm md:text-base">
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