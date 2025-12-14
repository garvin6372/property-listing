
"use client"
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Button } from "./ui/button";

export function CityHero() {
  const londonImage = PlaceHolderImages.find(img => img.id === 'london-Skyvera');
  const dubaiImage = PlaceHolderImages.find(img => img.id === 'dubai-Skyvera');

  const cities = [
    { name: 'London', image: londonImage, href: '/search?region=London', buttonText: 'View London Developments' },
    { name: 'Dubai', image: dubaiImage, href: '/search?region=Dubai', buttonText: 'View Dubai Developments' },
  ];

  return (
    <section className="relative h-[30vh] md:h-[40vh] w-full flex flex-col md:flex-row text-white overflow-hidden">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center bg-[#1c1c1c]">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-headline font-bold tracking-wider uppercase">
          London & Dubai
        </h1>
        <p className="text-base md:text-2xl font-light tracking-widest uppercase mb-4 md:mb-6">Property Specialists</p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
             {cities.map((city) => (
                <Button key={city.name} asChild variant="outline" className="bg-transparent border-white/80 text-white/80 hover:bg-white/10 hover:text-white hover:border-white transition-all duration-300 rounded-none w-full sm:w-auto text-xs sm:text-sm tracking-widest uppercase px-4 py-2 md:px-6 md:py-3">
                    <Link href={city.href}>{city.buttonText}</Link>
                </Button>
            ))}
        </div>
      </div>
    <div className="relative w-full md:h-full md:w-full group">
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
    </div>
    </section>
  );
}
