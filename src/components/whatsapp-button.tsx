"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppButton() {
    const phoneNumber = "+447471219260";

    const handleClick = () => {
        // WhatsApp URL format: https://wa.me/<number>
        // This works on both mobile and desktop
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Button
            onClick={handleClick}
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-0"
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle className="h-7 w-7" />
        </Button>
    );
}
