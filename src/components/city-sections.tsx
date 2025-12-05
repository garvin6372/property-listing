import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CitySections() {
    return (
        <section className="py-12 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* London Section */}
                    <div className="relative group overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:h-[500px]">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
                        {/* Placeholder image - in real app use Image component */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop')" }}
                        />
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">London</h3>
                            <p className="text-white/90 text-lg mb-8 max-w-md">
                                Buy-to-let, family homes, new-builds in Zones 3–6.
                            </p>
                            <Button asChild className="w-fit bg-white text-black hover:bg-white/90 rounded-full px-8">
                                <Link href="/search?region=London">
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
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Dubai</h3>
                            <p className="text-white/90 text-lg mb-8 max-w-md">
                                Off-plan, luxury villas, 1% monthly payment plans.
                            </p>
                            <Button asChild className="w-fit bg-white text-black hover:bg-white/90 rounded-full px-8">
                                <Link href="/search?region=Dubai">
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
