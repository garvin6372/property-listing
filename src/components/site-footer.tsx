import Link from "next/link";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-6">Skyvera</h3>
            <p className="text-muted-foreground mb-6">
              Your trusted partner for premium property investments in London and Dubai.
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
            <h4 className="font-medium text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/search" className="hover:text-foreground transition-colors">Search Properties</Link></li>
              <li><Link href="/search?city=London" className="hover:text-foreground transition-colors">London Properties</Link></li>
              <li><Link href="/search?city=Dubai" className="hover:text-foreground transition-colors">Dubai Properties</Link></li>
              <li><Link href="/valuation" className="hover:text-foreground transition-colors">Property Valuation</Link></li>
            </ul>
          </div>

          {/* Contact London */}
          <div>
            <h4 className="font-medium text-lg mb-6">London Office</h4>
            <address className="not-italic text-muted-foreground space-y-4">
              <p>123 Oxford Street<br />London, W1D 1LP<br />United Kingdom</p>
              <p><a href="tel:+447471219260" className="hover:text-foreground transition-colors">+44 7471 219260</a></p>
              <p><a href="mailto:info@skyvera.com" className="hover:text-foreground transition-colors">info@skyvera.com</a></p>
            </address>
          </div>

          {/* Contact Dubai */}
          <div>
            <h4 className="font-medium text-lg mb-6">Dubai Office</h4>
            <address className="not-italic text-muted-foreground space-y-4">
              <p>Business Bay, Tower A<br />Dubai, UAE</p>
              <p><a href="tel:+971500000000" className="hover:text-foreground transition-colors">020 8137 4448</a></p>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Skyvera. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
