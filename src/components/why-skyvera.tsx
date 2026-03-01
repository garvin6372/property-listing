import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function WhySkyvera() {
    return (
        <section className="py-16 md:py-32 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
                    <div className="flex-1">
                        <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Why Choose Us</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground font-light leading-tight tracking-wide mb-6">
                            Why Skyvera?
                        </h2>
                        <p className="text-muted-foreground font-light text-lg leading-relaxed mb-10">
                            We bridge the gap between international investors and premium property markets, offering end-to-end support for a seamless experience.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                "London & Dubai specialists",
                                "Support with mortgages, lawyers, currency exchange",
                                "Works with overseas buyers (India, GCC, UK)",
                                "Exclusive access to off-plan developments"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                                    <span className="text-lg text-foreground/90 font-light tracking-wide">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative w-full">
                        <div className="relative h-[300px] md:h-[500px] w-full rounded-xl shadow-soft overflow-hidden bg-muted">
                            {/* Display image with proper fallback for small screens */}
                            <Image
                                src="/fulllogo.png"
                                alt="Founder"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-background p-6 md:p-8 rounded-xl shadow-soft-lg max-w-[280px] md:max-w-sm border border-border/40">
                            <p className="font-serif text-base md:text-xl md:leading-relaxed mb-3 text-foreground font-light tracking-wide">"Our mission is to make property investment accessible and transparent for everyone."</p>
                            <p className="font-medium text-xs md:text-sm tracking-widest uppercase text-muted-foreground/80">- Founder, Skyvera</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
