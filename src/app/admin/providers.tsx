"use client";

import { SupabaseAuthProvider } from "@/contexts/supabase-auth-context";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseAuthProvider>
      {children}
    </SupabaseAuthProvider>
  );
}