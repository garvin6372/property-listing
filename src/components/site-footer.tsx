import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import Image from "next/image";

export function SiteFooter() {
  const { theme } = useTheme();

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container py-12 md:py-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center space-x-2">
              {theme === "dark" ? (
                <Image
                  src="/dark_theme_logo.png"
                  alt="Skyvera Logo"
                  width={120}
                  height={32}
                  priority
                  className="h-8 w-auto md:h-10"
                />
              ) : (
                <Image
                  src="/light_theme_logo.png"
                  alt="Skyvera Logo"
                  width={120}
                  height={32}
                  priority
                  className="h-8 w-auto md:h-10"
                />
              )}
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Premium real estate services in Dubai and London.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4 md:mb-6">Quick Links</h4>
            <ul className="space-y-3 md:space-y-4 text-muted-foreground">
              <li><Link href="/search" className="hover:text-foreground transition-colors text-sm md:text-base">Search Properties</Link></li>
              <li><Link href="/search/london" className="hover:text-foreground transition-colors text-sm md:text-base">London Properties</Link></li>
              <li><Link href="/search/dubai" className="hover:text-foreground transition-colors text-sm md:text-base">Dubai Properties</Link></li>
              <li><Link href="/valuation" className="hover:text-foreground transition-colors text-sm md:text-base">Property Valuation</Link></li>
            </ul>
          </div>

          {/* Contact London */}
          <div>
            <h4 className="font-medium text-lg mb-4 md:mb-6">London Office</h4>
            <address className="not-italic text-muted-foreground space-y-3 md:space-y-4">
              <p className="text-sm md:text-base">123 Oxford Street<br />London, W1D 1LP<br />United Kingdom</p>
              <p className="text-sm md:text-base"><a href="tel:+447471219260" className="hover:text-foreground transition-colors">+44 7471 219260</a></p>
              <p className="text-sm md:text-base"><a href="mailto:info@skyvera.com" className="hover:text-foreground transition-colors">info@skyvera.com</a></p>
            </address>
          </div>

          {/* Contact Dubai */}
          <div>
            <h4 className="font-medium text-lg mb-4 md:mb-6">Dubai Office</h4>
            <address className="not-italic text-muted-foreground space-y-3 md:space-y-4">
              <p className="text-sm md:text-base">Dubai Marina<br />Dubai, UAE</p>
              <p className="text-sm md:text-base"><a href="tel:+971501234567" className="hover:text-foreground transition-colors">+971 50 123 4567</a></p>
              <p className="text-sm md:text-base"><a href="mailto:dubai@skyvera.com" className="hover:text-foreground transition-colors">dubai@skyvera.com</a></p>
            </address>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-xs md:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Skyvera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
