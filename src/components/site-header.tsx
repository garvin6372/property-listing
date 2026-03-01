"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronDown, Home, Info, Menu, Moon, Sun, UserCog } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";
import { BookCallModal } from "@/components/book-call-modal";
import { HeaderSearchModal } from "@/components/header-search-modal";

const mainNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "Who we are", icon: Info },
    {
        label: "Properties",
        icon: Home,
        items: [
            { href: "/search?status=Buy", label: "Buy", desc: "Find properties to buy" },
            { href: "/search?status=Rent", label: "Rent", desc: "Find properties to rent" },
            { href: "/contact", label: "Sell", desc: "List your property with us" },
            { href: "/projects", label: "Invest", desc: "Discover investment opportunities" },
            { href: "/search", label: "Advanced Search", desc: "Filter with precision" },
            { href: "/valuation", label: "Free Valuation", desc: "Get an accurate estimate" },
        ]
    },
    { href: "/projects", label: "Our Projects", icon: Home },
    { href: "/services", label: "What we do", icon: Briefcase },
    { href: "/contact", label: "Contact us", icon: UserCog },
];

export default function SiteHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300 border-b",
            scrolled
                ? "bg-background/95 backdrop-blur-md shadow-sm py-2 md:py-3"
                : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3 md:py-4"
        )}>
            <div className="mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between gap-4">
                    {/* Left Side: Logo */}
                    <Link href="/" className="flex items-center shrink-0">
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

                    {/* Center: Desktop Navigation */}
                    <nav className="hidden md:flex items-center justify-center gap-8 font-medium">
                        {mainNavItems.map((item, idx) => (
                            <div key={idx} className="relative group/navItem">
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "transition-colors hover:text-primary py-2",
                                            pathname === item.href ? "text-primary" : "text-foreground/80"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <button className="flex items-center gap-1 transition-colors hover:text-primary text-foreground/80 py-2">
                                        {item.label}
                                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover/navItem:-rotate-180" />
                                    </button>
                                )}

                                {item.items && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover/navItem:opacity-100 group-hover/navItem:pointer-events-auto transition-all duration-300 translate-y-2 group-hover/navItem:translate-y-0">
                                        <div className="bg-background border border-border/50 shadow-lg rounded-xl p-3 w-[450px] grid grid-cols-2 gap-2 relative z-50 overflow-hidden">
                                            {item.items.map((subItem, sIdx) => (
                                                <Link
                                                    key={sIdx}
                                                    href={subItem.href}
                                                    className="block p-3 rounded-md hover:bg-muted/50 transition-colors group/subLink"
                                                >
                                                    <div className="font-medium text-sm text-foreground group-hover/subLink:text-primary transition-colors">
                                                        {subItem.label}
                                                    </div>
                                                    {subItem.desc && (
                                                        <div className="text-xs text-muted-foreground mt-0.5 opacity-80">
                                                            {subItem.desc}
                                                        </div>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right Side: Actions & Mobile Hamburger */}
                    <div className="flex items-center gap-2 md:gap-4 shrink-0">
                        <HeaderSearchModal />

                        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="h-9 w-9 md:h-10 md:w-10">
                            {theme === "dark" ? (
                                <Sun className="h-4 w-4 md:h-5 md:w-5" />
                            ) : (
                                <Moon className="h-4 w-4 md:h-5 md:w-5" />
                            )}
                        </Button>

                        <BookCallModal />

                        {/* Mobile Hamburger Menu */}
                        <div className="md:hidden flex items-center">
                            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-9 w-9">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Open Menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                                    <div className="flex flex-col space-y-4 mt-8">
                                        {mainNavItems.map((item, idx) => (
                                            <div key={idx} className="flex flex-col">
                                                {item.href ? (
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className={cn(
                                                            "py-3 text-lg font-medium border-b border-border/40 transition-colors flex items-center gap-3",
                                                            pathname === item.href ? "text-primary" : "text-foreground"
                                                        )}
                                                    >
                                                        {item.icon && <item.icon className="h-5 w-5" />}
                                                        {item.label}
                                                    </Link>
                                                ) : (
                                                    <div className="py-3 border-b border-border/40">
                                                        <div className="text-lg font-medium mb-3 text-foreground flex items-center gap-3">
                                                            {item.icon && <item.icon className="h-5 w-5" />}
                                                            <span>{item.label}</span>
                                                        </div>
                                                        <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/20">
                                                            {item.items?.map((subItem, sIdx) => (
                                                                <Link
                                                                    key={sIdx}
                                                                    href={subItem.href}
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                    className="text-base text-muted-foreground hover:text-primary transition-colors flex items-center"
                                                                >
                                                                    {subItem.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}