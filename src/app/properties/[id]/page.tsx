
import { getPropertyById } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Bath, SquareGanttChart, MapPin, Building, Home, Map } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const property = await getPropertyById(params.id);

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  return {
    title: `${property.title} | Skyvera`,
    description: property.description,
  };
}


export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  const propertyDetails = [
    { icon: property.region === 'Dubai' ? <Building className="w-5 h-5 text-primary" /> : <Home className="w-5 h-5 text-primary" />, label: "Type", value: property.type },
    { icon: <BedDouble className="w-5 h-5 text-primary" />, label: "Bedrooms", value: property.bedrooms },
    { icon: <Bath className="w-5 h-5 text-primary" />, label: "Bathrooms", value: property.bathrooms },
    { icon: <SquareGanttChart className="w-5 h-5 text-primary" />, label: "Area", value: `${property.area.toLocaleString()} sqft` },
    { icon: <Map className="w-5 h-5 text-primary" />, label: "Region", value: property.region },
  ];

  return (
    <div className="bg-background min-h-screen pb-20 pt-8">
      <div className="container mx-auto px-4 space-y-8">

        {/* Header Section */}
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className={`capitalize px-4 py-1.5 text-sm font-medium tracking-wide rounded-full ${property.status === 'Buy' || property.status === 'Rent' ? 'bg-primary text-white dark:bg-primary dark:text-white' : 'bg-green-600 text-white'}`}>
                {property.status}
              </Badge>
              {property.dubaiStatus && (property.dubaiStatus as string) !== 'none' && (
                <Badge variant="outline" className="text-sm px-4 py-1.5 rounded-full border-border/80 text-foreground font-light tracking-wide">
                  {property.dubaiStatus}
                </Badge>
              )}
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-serif font-light tracking-wide text-foreground mb-3 leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center text-muted-foreground text-lg font-light tracking-wide">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <span>{property.location}</span>
              </div>
            </div>
          </div>
          <div className="text-4xl md:text-5xl font-serif font-light text-foreground flex-shrink-0 tracking-tight">
            {formatPrice(property.price, property.region === 'Dubai' ? 'AED' : 'GBP')}
            {property.status === 'Rent' && <span className="text-lg font-sans font-light text-muted-foreground ml-1">/year</span>}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-muted relative aspect-video md:aspect-[21/9]">
          <Carousel className="w-full h-full">
            <CarouselContent className="h-full ml-0">
              {property.images.map((image, index) => (
                <CarouselItem key={index} className="pl-0 h-full basis-full min-h-full">
                  <div className="w-full h-full relative">
                    <Image
                      src={image.imageUrl}
                      alt={`${property.title} image ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      data-ai-hint={image.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-6 right-6 flex gap-2 z-10">
              <CarouselPrevious className="static translate-y-0 bg-white/50 backdrop-blur-md hover:bg-white border-none text-foreground h-12 w-12 rounded-full shadow-soft transition-all duration-300" />
              <CarouselNext className="static translate-y-0 bg-white/50 backdrop-blur-md hover:bg-white border-none text-foreground h-12 w-12 rounded-full shadow-soft transition-all duration-300" />
            </div>
          </Carousel>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* Key Features */}
            <div className="bg-card rounded-xl p-8 shadow-soft border border-border/20">
              <h2 className="font-serif text-3xl font-light text-foreground tracking-wide mb-8">Property Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {propertyDetails.map(detail => (
                  <div key={detail.label} className="flex items-start gap-4">
                    <div className="p-3 bg-muted/50 rounded-full flex-shrink-0">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/80 mb-1.5">{detail.label}</p>
                      <p className="font-light text-lg text-foreground tracking-wide break-words">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-xl p-8 shadow-soft border border-border/20">
              <h2 className="font-serif text-3xl font-light text-foreground tracking-wide mb-8">Description</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert text-muted-foreground font-light leading-loose tracking-wide">
                <p>{property.description}</p>
              </div>
            </div>

          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card rounded-xl p-8 shadow-soft border border-border/20">
                <h3 className="font-serif text-2xl font-light text-foreground tracking-wide mb-8">Interested in this property?</h3>
                <InquiryForm propertyId={property.id} propertyTitle={property.title} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

