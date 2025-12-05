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
        <section className="py-12 md:py-24 bg-[#2C2A26] text-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif mb-4">How It Works</h2>
                    <p className="text-white/70 text-lg">
                        Your journey to property ownership in 4 simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 text-white">
                                    <step.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-serif mb-3">{step.title}</h3>
                                <p className="text-white/60 leading-relaxed">{step.description}</p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-[1px] bg-white/10 -z-10" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
