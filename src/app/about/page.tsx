import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Globe2, Users2, Trophy } from "lucide-react";

export default function AboutPage() {
    const heroImage = PlaceHolderImages.find((img) => img.id === "dubai-Skyvera")?.imageUrl || "https://placehold.co/1920x1080";
    const missionImage = PlaceHolderImages.find((img) => img.id === "london-Skyvera")?.imageUrl || "https://placehold.co/800x600";

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src={heroImage}
                    alt="About Skyvera"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight">
                        Who We Are
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
                        Redefining luxury real estate with a global perspective and local expertise.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Mission</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                At Skyvera, we believe that true luxury lies in the details. Our mission is to bridge the gap between discerning clients and extraordinary properties in the world's most dynamic cities—Dubai and London.
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                We don't just sell properties; we curate lifestyles. Whether you're seeking a serene waterfront villa or a high-octane city penthouse, our dedicated team ensures a seamless journey from discovery to acquisition.
                            </p>
                            <div className="pt-4">
                                <Button className="rounded-full px-8" asChild>
                                    <Link href="/contact">Get in Touch</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={missionImage}
                                alt="Our Mission"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center space-y-2">
                            <div className="flex justify-center text-primary mb-2">
                                <Globe2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-4xl font-serif font-bold text-foreground">2</h3>
                            <p className="text-muted-foreground uppercase tracking-wider text-sm">Global HQs</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="flex justify-center text-primary mb-2">
                                <Users2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-4xl font-serif font-bold text-foreground">50+</h3>
                            <p className="text-muted-foreground uppercase tracking-wider text-sm">Expert Agents</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="flex justify-center text-primary mb-2">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-4xl font-serif font-bold text-foreground">500+</h3>
                            <p className="text-muted-foreground uppercase tracking-wider text-sm">Properties Sold</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="flex justify-center text-primary mb-2">
                                <Trophy className="w-10 h-10" />
                            </div>
                            <h3 className="text-4xl font-serif font-bold text-foreground">10+</h3>
                            <p className="text-muted-foreground uppercase tracking-wider text-sm">Years Excellence</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif mb-4">Why Choose Skyvera?</h2>
                        <p className="text-muted-foreground text-lg">
                            We combine traditional values of service with modern technology and market intelligence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Global Reach, Local Expertise",
                                description: "With offices in both Dubai and London, we offer a unique dual-market perspective that few can match."
                            },
                            {
                                title: "Curated Portfolio",
                                description: "We are selective about what we list. Every property meets our high standards of quality, potential, and aesthetics."
                            },
                            {
                                title: "Client-Centric Approach",
                                description: "Your goals are our goals. We provide personalized advice, market insights, and dedicated support."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-card p-8 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-serif font-semibold mb-4">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
