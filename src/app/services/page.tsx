import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    BarChart3,
    Building2,
    Home,
    Key,
    LineChart,
    ShieldCheck
} from "lucide-react";

export default function ServicesPage() {
    const heroImage = PlaceHolderImages.find((img) => img.id === "dubai-office-1")?.imageUrl || "https://placehold.co/1920x800";

    const services = [
        {
            icon: Home,
            title: "Property Sales",
            description: "Expert guidance for buying and selling residential and commercial properties in Dubai and London. We handle the entire process from listing to handover."
        },
        {
            icon: Key,
            title: "Property Leasing",
            description: "Connecting landlords with qualified tenants. We ensure streamlined leasing processes, rigorous tenant screening, and maximize occupancy rates."
        },
        {
            icon: Building2,
            title: "Property Management",
            description: "Comprehensive management solutions for your real estate assets. From maintenance to rent collection, we take the stress out of ownership."
        },
        {
            icon: LineChart,
            title: "Investment Advisory",
            description: "Data-driven insights to help you build a robust real estate portfolio. We identify high-yield opportunities and emerging market trends."
        },
        {
            icon: BarChart3,
            title: "Market Valuation",
            description: "Accurate and up-to-date property appraisals based on current market data, ensuring you know the true value of your asset."
        },
        {
            icon: ShieldCheck,
            title: "Legal & Conveyancing",
            description: "Navigating the legal complexities of real estate. We work with trusted legal partners to ensure secure and compliant transactions."
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <Image
                    src={heroImage}
                    alt="Our Services"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 tracking-tight">
                        What We Do
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
                        Delivering excellence across the full spectrum of real estate services.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                    <service.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-2xl font-serif font-medium mb-3 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">Ready to get started?</h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        Whether you're looking to buy, sell, or manage a property, our team is here to help you achieve your goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="rounded-full px-8" asChild>
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                            <Link href="/projects">View Projects</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
