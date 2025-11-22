export async function GET() {
  return Response.json({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "MISSING",
    anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "MISSING",
    role: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2dkaHZqdnZ0d2ZweHRuanhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzQ4NjI1NywiZXhwIjoyMDc5MDYyMjU3fQ.wZUJ7wHXk9hEK4yp-O-0NGXpBe6Zyhvet1vOv4ByNMI" ? "OK" : "MISSING"
  });
}
