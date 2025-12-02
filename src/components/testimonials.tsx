import React from 'react';

interface Testimonial {
    id: number;
    quote: string;
    author: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "Working with Jeremy was a pleasure. His professionalism and knowledge of the market helped us find our dream home in no time.",
        author: "Preet.",
    },
    {
        id: 2,
        quote: "Jeremy went above and beyond to sell our property quickly and at a great price. Highly recommend his services.",
        author: "Preet.",
    },
    {
        id: 3,
        quote: "I couldn't be happier with the rental property Jeremy found for me. It's exactly what I was looking for.",
        author: "Preet.",
    },
];

export function Testimonials() {
    return (
        <section className="w-full bg-[#1c1c1c] text-white py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-headline mb-20 text-white">
                    Testimonials
                </h2>

                <div className="flex flex-col">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="group">
                            {/* Separator Line */}
                            <div className="w-full h-px bg-white/20 mb-12" />

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
                                <p className="text-lg md:text-2xl font-body leading-relaxed max-w-4xl text-gray-200">
                                    "{testimonial.quote}"
                                </p>

                                <div className="self-end md:self-auto">
                                    <span className="inline-block px-6 py-2 rounded-full bg-[#2a2a2a] text-gray-300 font-body text-sm md:text-base border border-white/10">
                                        {testimonial.author}
                                    </span>
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
