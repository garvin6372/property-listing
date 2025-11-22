import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const admin = supabaseAdmin();
  const body = await req.json();

  const { data, error } = await admin
    .from("properties")
    .insert(body);

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ data });
}

export async function GET(req: Request) {
  const admin = supabaseAdmin();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');

  let query = admin
    .from("properties")
    .select('*')
    .order('created_at', { ascending: false });

  // If search parameter exists, filter by location or region
  if (search) {
    query = query.or(`location.ilike.%${search}%,region.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ data });
}