"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Briefcase, Home, Info, Menu, Moon, Search, Sun, UserCog, X } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";
import { useFilter } from "@/contexts/filter-context";
import { Filter } from "lucide-react";

const navLinks = [
    { href: "/", label: "Properties", icon: Briefcase },
    { href: "/search", label: "Search", icon: Search },
];


export default function SiteHeader() {
    const logo = PlaceHolderImages.find(img => img.id === 'skyvera-logo-dark');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const { toggleFilter, isFilterVisible } = useFilter();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-20 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2 md:hidden">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu />
                                <span className="sr-only">Open Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setIsMobileMenuOpen(false)}>
                                <span className="font-serif text-2xl font-bold tracking-tight">Skyvera</span>
                            </Link>
                            <div className="flex flex-col space-y-2">
                                {navLinks.map(link => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-2 p-3 rounded-l-md",
                                            pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <link.icon className="h-4 w-4" /> {link.label}
                                    </Link>
                                ))}
                            </div>
                            {/* <div className="mt-6">
                                <Button asChild className="w-full justify-center">
                                    <Link href="/admin/login">
                                        <UserCog className="h-4 w-4 mr-2" />
                                        Admin Login
                                    </Link>
                                </Button>
                            </div> */}
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-serif text-2xl font-bold tracking-tight">Skyvera</span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
                    <Link
                        href="/"
                        className="transition-colors hover:text-foreground flex items-center gap-1"
                    >
                        <Briefcase className="h-4 w-4" /> Home
                    </Link>
                    <Link
                        href="/search"
                        className="transition-colors hover:text-foreground flex items-center gap-1"
                    >
                        <Search className="h-4 w-4" /> Search Properties
                    </Link>
                </nav>


                <div className="flex items-center justify-end space-x-2">
                    {pathname === '/search' && (
                        <Button variant="ghost" size="sm" onClick={toggleFilter} className="flex gap-2">
                            <Filter className="h-4 w-4" />
                            Filters
                        </Button>
                    )}

                    {/* Theme Toggle Button */}
                    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>

                    {/* <div className="hidden md:block">
                        <Button asChild>
                            <Link href="/admin/login">
                                <UserCog className="h-4 w-4 mr-2" />
                                Admin Login
                            </Link>
                        </Button>
                    </div> */}

                </div>
            </div>
        </header>
    );
}