
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
    { icon: property.region === 'Dubai' ? <Building className="w-5 h-5 text-[#2C2A26] dark:text-white" /> : <Home className="w-5 h-5 text-[#2C2A26] dark:text-white" />, label: "Type", value: property.type },
    { icon: <BedDouble className="w-5 h-5 text-[#2C2A26] dark:text-white" />, label: "Bedrooms", value: property.bedrooms },
    { icon: <Bath className="w-5 h-5 text-[#2C2A26] dark:text-white" />, label: "Bathrooms", value: property.bathrooms },
    { icon: <SquareGanttChart className="w-5 h-5 text-[#2C2A26] dark:text-white" />, label: "Area", value: `${property.area.toLocaleString()} sqft` },
    { icon: <Map className="w-5 h-5 text-[#2C2A26] dark:text-white" />, label: "Region", value: property.region },
  ];

  return (
    <div className="bg-background min-h-screen pb-20 pt-8">
      <div className="container mx-auto px-4 space-y-8">

        {/* Header Section */}
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className={`capitalize px-4 py-1.5 text-sm font-medium tracking-wide rounded-full ${property.status === 'Buy' || property.status === 'Rent' ? 'bg-primary text-white dark:bg-white dark:text-primary' : 'bg-green-600 text-white'}`}>
                {property.status}
              </Badge>
              {property.dubaiStatus && (property.dubaiStatus as string) !== 'none' && (
                <Badge variant="outline" className="text-sm px-4 py-1.5 rounded-full border-[#2C2A26] text-[#2C2A26] dark:border-white dark:text-white">
                  {property.dubaiStatus}
                </Badge>
              )}
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-serif font-medium text-[#2C2A26] dark:text-white mb-2 leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center text-muted-foreground text-lg font-light">
                <MapPin className="w-5 h-5 mr-2 text-[#2C2A26] dark:text-white" />
                <span>{property.location}</span>
              </div>
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-serif text-[#2C2A26] dark:text-white flex-shrink-0">
            {formatPrice(property.price, property.region === 'Dubai' ? 'AED' : 'GBP')}
            {property.status === 'Rent' && <span className="text-lg font-sans font-normal text-muted-foreground ml-1">/year</span>}
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
              <CarouselPrevious className="static translate-y-0 bg-white/90 hover:bg-white border-none text-[#2C2A26] h-10 w-10" />
              <CarouselNext className="static translate-y-0 bg-white/90 hover:bg-white border-none text-[#2C2A26] h-10 w-10" />
            </div>
          </Carousel>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* Key Features */}
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50">
              <h2 className="font-serif text-2xl text-[#2C2A26] dark:text-white mb-6">Property Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                {propertyDetails.map(detail => (
                  <div key={detail.label} className="flex items-center gap-4">
                    <div className="p-3 bg-secondary rounded-full">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{detail.label}</p>
                      <p className="font-medium text-lg text-[#2C2A26] dark:text-white">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50">
              <h2 className="font-serif text-2xl text-[#2C2A26] dark:text-white mb-6">Description</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert text-muted-foreground font-light leading-relaxed">
                <p>{property.description}</p>
              </div>
            </div>

          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50">
                <h3 className="font-serif text-xl text-[#2C2A26] dark:text-white mb-6">Interested in this property?</h3>
                <InquiryForm propertyId={property.id} propertyTitle={property.title} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

