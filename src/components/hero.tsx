/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            // Manual scroll calculation to account for fixed header
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Update URL hash without jumping, safely ignoring errors in sandboxed environments
            try {
                window.history.pushState(null, '', `#${targetId}`);
            } catch (err) {
                // Ignore SecurityError in restricted environments
            }
        }
    };

    return (
        <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-gray-200">

            {/* Background Image - Architecture */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="/landing_page.png"
                    alt="Minimalist modern home"
                    className="w-full h-full object-cover contrast-[0.8] brightness-[0.9] animate-[pulse_15s_ease-in-out_infinite_alternate]"
                />
                {/* Warmer Brown Overlay for Richness */}
                <div className="absolute inset-0 bg-[#433E38]/40 mix-blend-multiply"></div>
                {/* Deep Sepia Tone for Shadow Depth */}
                <div className="absolute inset-0 bg-[#313030]/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-start text-left md:items-center md:text-center px-6">
                <div className="animate-fade-in-up w-full md:w-auto">
                    <span className="block text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white/90 mb-6 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full mx-0 md:mx-auto w-fit">
                        Curated Living Spaces
                    </span>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-normal text-white tracking-tight mb-8 drop-shadow-sm">
                        Find your <span className="italic text-white">sanctuary.</span>
                    </h1>
                    <p className="max-w-lg mx-0 md:mx-auto text-lg md:text-xl text-white/90 font-light leading-relaxed mb-12 text-shadow-sm">
                        Architecture that respects the landscape. <br />
                        Homes designed for silence, light, and life.
                    </p>

                    <a
                        href="#featured-properties"
                        onClick={(e) => handleNavClick(e, 'featured-properties')}
                        className="group relative px-10 py-4 bg-white text-[#2C2A26] rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-gray-50 transition-all duration-50 overflow-hidden shadow-lg hover:shadow-xl inline-block"
                    >
                        <span className="relative z-10 group-hover:text-[#2C2A26]">Explore Listings</span>
                    </a>
                </div>
                <Button className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300">
                    <Link href="/valuation">Get a Free Valuation</Link>
                </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};

export default Hero;