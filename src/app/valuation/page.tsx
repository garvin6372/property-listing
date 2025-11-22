
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Users, Star, Home, Award, CheckCircle, ChevronRight, TrendingUp, CalendarDays, UserCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ValuationForm } from "@/components/valuation-form";

// In a real app, you'd add metadata here, but since it's a client component,
// you'd typically handle the title in a parent server component or layout.
export default function ValuationPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'valuation-hero');

  const features = [
    { icon: Users, text: "13,000 new buyers and tenants register each week" },
    { icon: Star, text: "Highly rated by over 15,000 Google reviews" },
    { icon: Home, text: "We sell a property every 88 minutes" },
    { icon: Award, text: "We're London's number-one estate agent" },
    { icon: CheckCircle, text: "90% of Foxtons customers are satisfied with our valuation service" },
  ];

  const valuationSteps = [
    {
      icon: TrendingUp,
      title: "Step 1",
      description: "Enter your details in the form and select your address.",
    },
    {
      icon: CalendarDays,
      title: "Step 2",
      description: "Complete the short, online form and choose the type of house valuation you'd like to book.",
    },
    {
      icon: UserCheck,
      title: "Step 3",
      description: "We'll arrange for a local estate agent to visit your home to get an accurate valuation.",
    },
    {
      icon: Check,
      title: "Step 4",
      description: "You'll be given your free property valuation with no obligation to sell your home with us.",
    },
  ];
  
  useEffect(() => {
    document.title = "Property Valuation | Skyvera";
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Find out your home's sales or rental value</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
          <div className="py-8">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-8 text-primary">
              Book a Property Valuation
            </h1>
            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-4 text-lg">
                  <feature.icon className="w-7 h-7 text-primary flex-shrink-0" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Book your free valuation</h2>
              <Dialog>
                  <DialogTrigger asChild>
                      <Button size="lg" className="h-12 w-full sm:w-auto">
                          Get Started <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                      <DialogTitle>Book a Free Valuation</DialogTitle>
                      <DialogDescription>
                          Fill in your details below and one of our experts will get in touch.
                      </DialogDescription>
                      </DialogHeader>
                      <ValuationForm />
                  </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary/60 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-6">How does a free property valuation work?</h2>
               <Dialog>
                  <DialogTrigger asChild>
                       <Button size="lg">Book your free valuation</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                      <DialogTitle>Book a Free Valuation</DialogTitle>
                      <DialogDescription>
                          Fill in your details below and one of our experts will get in touch.
                      </DialogDescription>
                      </DialogHeader>
                      <ValuationForm />
                  </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-8">
              {valuationSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
