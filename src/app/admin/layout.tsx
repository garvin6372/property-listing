"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Building2, MessageSquare, BadgePercent, LogOut, User, Settings, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";

import { AdminProviders } from "./providers";

const menuItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/properties",
    label: "Properties",
    icon: Building2,
  },
  {
    href: "/admin/inquiries",
    label: "Inquiries",
    icon: MessageSquare,
  },
  {
    href: "/admin/valuations",
    label: "Valuations",
    icon: BadgePercent,
  },
  {
    href: "/admin/consultations",
    label: "Consultations",
    icon: BadgePercent,
  },
  {
    href: "/admin/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/admin/email-settings",
    label: "Email Settings",
    icon: Mail,
  },
  {
    href: "/admin/property-config",
    label: "Property Config",
    icon: Settings,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProviders>
      <AdminContent>{children}</AdminContent>
    </AdminProviders>
  );
}

function AdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useSupabaseAuth();
  const logo = PlaceHolderImages.find(p => p.id === 'skyvera-logo');

  // Redirect logic is now handled by middleware


  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If on login page, render without sidebar layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="mt-5 h-20 justify-center">
          {/* {logo && (
            <Link href="/" className="block">
              <Image
                src={logo.imageUrl}
                alt="Skyvera Logo"
                width={120}
                height={30}
                data-ai-hint={logo.imageHint}
                className="group-data-[state=collapsed]:hidden"
              />
            </Link>
          )} */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, side: "right" }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <div className="mt-auto p-2">
          <Button variant="ghost" className="w-full justify-start gap-2 p-2" onClick={handleLogout}>
            <LogOut className="size-4 shrink-0" />
            <span className="group-data-[state=collapsed]:hidden">Logout</span>
          </Button>
        </div>
      </Sidebar>
      <SidebarInset className="bg-secondary/50">
        <header className="p-4 flex items-center justify-between border-b md:border-none">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <div className="hidden md:block" />
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/admin/40/40" alt="Admin" data-ai-hint="person face" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </header>
        <div className="p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}