"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function HeroSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const location = formData.get("location") as string;

    const params = new URLSearchParams();
    if (location) params.set("location", location);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white py-16 px-4 border-b border-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-[#2C2A26] mb-4">
          Find your perfect property
        </h1>
        <p className="text-muted-foreground mb-8 font-light">
          Discover a wide range of properties for sale and rent in Dubai and London.
        </p>

        <div className="w-full">
          <Tabs defaultValue="buy" className="w-full max-w-2xl mx-auto">
            {/* <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-full">
              <TabsTrigger
                value="buy"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300"
              >
                For Sale
              </TabsTrigger>
              <TabsTrigger
                value="rent"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300"
              >
                To Rent
              </TabsTrigger>
            </TabsList> */}

            <TabsContent value="buy">
              <form onSubmit={handleSearch} className="relative flex flex-col md:flex-row gap-4">
                <input type="hidden" name="status" value="Buy" />
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search by location (e.g. 'Downtown Dubai')"
                    className="h-14 pl-12 rounded-full border-gray-200 bg-gray-50 focus:bg-white transition-all duration-300 text-base"
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white transition-colors duration-300">
                  Search
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="rent">
              <form onSubmit={handleSearch} className="relative flex flex-col md:flex-row gap-4">
                <input type="hidden" name="status" value="Rent" />
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search by location (e.g. 'Dubai Marina')"
                    className="h-14 pl-12 rounded-full border-gray-200 bg-gray-50 focus:bg-white transition-all duration-300 text-base"
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white transition-colors duration-300">
                  Search
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <span className="text-muted-foreground">Or explore by region:</span>
            <div className="flex gap-2">
              <Link href="/search/london" className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#2C2A26] transition-colors">
                London
              </Link>
              <Link href="/search/dubai" className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#2C2A26] transition-colors">
                Dubai
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}