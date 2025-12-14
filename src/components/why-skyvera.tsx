import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function WhySkyvera() {
    return (
        <section className="py-12 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
                    <div className="flex-1">
                        <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2 block">Why Choose Us</span>
                        <h2 className="text-3xl md:text-5xl font-serif text-[#2C2A26] dark:text-white leading-tight mb-6">
                            Why Skyvera?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            We bridge the gap between international investors and premium property markets, offering end-to-end support for a seamless experience.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                "London & Dubai specialists",
                                "Support with mortgages, lawyers, currency exchange",
                                "Works with overseas buyers (India, GCC, UK)",
                                "Exclusive access to off-plan developments"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-[#2C2A26] dark:text-white flex-shrink-0" />
                                    <span className="text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative w-full">
                        <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden bg-muted">
                            {/* Display image with proper fallback for small screens */}
                            <Image 
                                src="/fulllogo.png" 
                                alt="Founder" 
                                fill 
                                className="object-cover" 
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white dark:bg-[#2C2A26] p-3 md:p-6 rounded-xl shadow-xl max-w-[240px] md:max-w-xs border border-border">
                            <p className="font-serif text-sm md:text-xl mb-2">"Our mission is to make property investment accessible and transparent for everyone."</p>
                            <p className="font-medium text-[0.7rem] md:text-sm text-muted-foreground">- Founder, Skyvera</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
