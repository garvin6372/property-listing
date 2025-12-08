"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "./site-header";
import { SiteFooter } from "./site-footer";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useSupabaseAuth();
  const router = useRouter();

  // Redirect unauthenticated users trying to access admin pages
  useEffect(() => {
    if (!isLoading && pathname.startsWith("/admin") && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isLoading, pathname, isAuthenticated, router]);

  // Don't show header/footer on admin pages except login
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <SiteHeader />}
      <main className="flex-grow">{children}</main>
      {!isAdminPage && <SiteFooter />}
    </div>
  );
}