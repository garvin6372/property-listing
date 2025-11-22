import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    // Test database connection by querying a table
    const admin = supabaseAdmin();
    const { data, error } = await admin
      .from('properties')
      .select('count()', { count: 'exact' })
      .limit(1);

    if (error) {
      console.error('Supabase connection error:', error);
      return NextResponse.json({ status: 'error', message: 'Database connection failed' }, { status: 500 });
    }

    return NextResponse.json({ status: 'ok', message: 'Supabase connection successful', count: data?.length || 0 });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({ status: 'error', message: 'Health check failed' }, { status: 500 });
  }
}