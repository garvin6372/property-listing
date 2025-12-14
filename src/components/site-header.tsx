"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Briefcase, Home, Info, Menu, Moon, Search, Sun, UserCog, X } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";
import { BookCallModal } from "@/components/book-call-modal";

const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "Who we are", icon: Info },
    { href: "/projects", label: "Our Projects", icon: Home },
    { href: "/services", label: "What we do", icon: Briefcase },
    { href: "/contact", label: "Contact us", icon: UserCog },
];


export default function SiteHeader() {
    const logo = PlaceHolderImages.find(img => img.id === 'skyvera-logo-dark');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    // Show filter button on main search page and regional search pages
    const showFilterButton = pathname === '/search' || pathname === '/search/dubai' || pathname === '/search/london';

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto px-4 md:px-6">
                <div className="grid grid-cols-3 items-center h-16 md:h-20 gap-2 md:gap-4">
                    {/* Left Side - Hamburger Menu */}
                    <div className="flex items-center justify-start">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10 md:h-12 md:w-12">
                                    <Menu className="h-6 w-6 md:h-8 md:w-8" />
                                    <span className="sr-only">Open Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="pr-0 w-72 md:w-96">
                                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                                <div className="flex flex-col space-y-2 mt-4">
                                    {navLinks.map(link => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 p-4 rounded-l-md text-lg md:text-xl",
                                                pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            <link.icon className="h-5 w-5" /> <span className="text-lg">{link.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Center - Logo */}
                    <div className="flex items-center justify-center">
                        <Link href="/" className="flex items-center">
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
                        </Link>
                    </div>

                    {/* Right Side - Action Buttons */}
                    <div className="flex items-center justify-end gap-1 md:gap-2">
                        {/* Theme Toggle Button */}
                        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="h-8 w-8 md:h-10 md:w-10">
                            {theme === "dark" ? (
                                <Sun className="h-4 w-4 md:h-5 md:w-5" />
                            ) : (
                                <Moon className="h-4 w-4 md:h-5 md:w-5" />
                            )}
                        </Button>

                        <BookCallModal />
                    </div>
                </div>
            </div>
        </header>
    );
}