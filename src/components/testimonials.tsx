import React from 'react';

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    purpose?: string;
    image?: string;
    stars?: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "Working with Preet was a pleasure. His professionalism and knowledge of the market helped us find our dream home in no time.",
        author: "Jeremy",
        purpose: "Bought 2-bed in Wembley",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
        stars: 5
    },
    {
        id: 2,
        quote: "Preet went above and beyond to sell our property quickly and at a great price. Highly recommend his services.",
        author: "Valerie",
        purpose: "Sold apartment in Business Bay",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
        stars: 5
    },
    {
        id: 3,
        quote: "I couldn't be happier with the rental property Preet found for me. It's exactly what I was looking for.",
        author: "Brandon",
        purpose: "Rented penthouse in Marina",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
        stars: 5
    },
];

export function Testimonials() {
    return (
        <section className="w-full bg-[#1c1c1c] text-white pt-12 md:pt-24 pb-0 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-headline mb-12 md:mb-20 text-white">
                    Testimonials
                </h2>

                <div className="flex flex-col">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="group">
                            {/* Separator Line */}
                            <div className="w-full h-px bg-white/20 mb-12" />

                            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                                <div className="flex-1">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.stars || 5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-lg md:text-2xl font-body leading-relaxed max-w-4xl text-gray-200 mb-6">
                                        "{testimonial.quote}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 self-start md:self-end min-w-[200px]">
                                    {testimonial.image && (
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.author}
                                            className="w-12 h-12 rounded-full object-cover border border-white/20"
                                        />
                                    )}
                                    <div>
                                        <h4 className="font-medium text-white">{testimonial.author}</h4>
                                        {testimonial.purpose && (
                                            <p className="text-sm text-gray-400">{testimonial.purpose}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Bottom Separator for the last item if needed, but design usually has lines between or above. 
              The image shows lines separating them. Let's stick to the top separator for each item 
              or maybe a bottom one. The image shows lines ABOVE each testimonial? 
              Actually looking closely at the image, there is a line above the first one, 
              and lines between them. So a line above each entry works. 
          */}
                </div>
            </div>
        </section>
    );
}
