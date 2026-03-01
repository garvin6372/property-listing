import { Phone, Search, FileSignature, Key } from "lucide-react";

export function HowItWorks() {
    const steps = [
        {
            icon: Phone,
            title: "Discovery Call",
            description: "We discuss your goals, budget, and preferences to understand your needs."
        },
        {
            icon: Search,
            title: "Shortlist + Virtual Tours",
            description: "We curate a list of properties and arrange viewings, physical or virtual."
        },
        {
            icon: FileSignature,
            title: "Reservation + Legal",
            description: "We guide you through the reservation process and connect you with legal experts."
        },
        {
            icon: Key,
            title: "Completion + Handover",
            description: "We handle the final details ensuring a smooth transition to ownership."
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
                    <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground/80 mb-4 block">Process</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-foreground font-light tracking-wide leading-tight">How It Works</h2>
                    <p className="text-muted-foreground font-light text-lg md:text-xl tracking-wide leading-relaxed">
                        Your journey to property ownership in 4 simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-20 h-20 rounded-full bg-background shadow-soft border border-border/40 flex items-center justify-center mb-8 text-primary transition-transform duration-700 ease-luxury group-hover:-translate-y-2 group-hover:shadow-soft-lg">
                                    <step.icon className="h-8 w-8 stroke-[1.5]" />
                                </div>
                                <h3 className="text-2xl font-serif font-light tracking-wide mb-4 text-foreground/90">{step.title}</h3>
                                <p className="text-muted-foreground font-light leading-relaxed tracking-wide px-4">{step.description}</p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-border/50 -z-10" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
