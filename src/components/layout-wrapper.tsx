"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    return (
        <>
            <SiteHeader />
            <main className="flex-grow bg-secondary/50">{children}</main>
            {!isAdminRoute && <SiteFooter />}
        </>
    );
}
