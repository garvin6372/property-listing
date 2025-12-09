/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */


import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ValuationModal } from "@/components/valuation-modal";

const Hero: React.FC = () => {

    return (
        <section className="relative w-full h-screen min-h-[500px] md:min-h-[600px] lg:min-h-[800px] overflow-hidden bg-gray-200">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover contrast-[0.8] brightness-[0.9]"
                >
                    <source src="/1765296760046076.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Warmer Brown Overlay for Richness */}
                <div className="absolute inset-0 bg-[#433E38]/40 mix-blend-multiply"></div>
                {/* Deep Sepia Tone for Shadow Depth */}
                {/* <div className="absolute inset-0 bg-[#313030]/20"></div> */}
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-start text-left md:items-center md:text-center px-4 sm:px-6">
                <div className="animate-fade-in-up w-full md:w-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal text-white tracking-tight mb-4 md:mb-6 drop-shadow-sm">
                        London & Dubai Property Experts
                    </h1>
                    <p className="max-w-lg mx-0 md:mx-auto text-base md:text-xl text-white/90 font-light leading-relaxed mb-6 md:mb-8 text-shadow-sm">
                        Helping buyers & investors worldwide.
                    </p>

                    <Link
                        href="#featured-properties"
                        className="group relative px-8 py-3 md:px-10 md:py-4 bg-white text-[#2C2A26] rounded-full text-sm md:text-sm font-semibold uppercase tracking-widest hover:bg-gray-50 transition-all duration-50 overflow-hidden shadow-lg hover:shadow-xl inline-block"
                    >
                        <span className="relative z-10 group-hover:text-[#2C2A26]">Explore Listings</span>
                    </Link>
                </div>
                <div className="mt-6 md:mt-8">
                    <ValuationModal>
                        <Button className="rounded-full bg-white text-[#2C2A26] hover:bg-gray-100 transition-all duration-300 px-6 py-4 md:px-8 md:py-6 text-base md:text-lg">
                            Get a Free Valuation
                        </Button>
                    </ValuationModal>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};

export default Hero;