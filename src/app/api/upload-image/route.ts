import { supabaseAdmin } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;

    if (!file || !fileName) {
      return NextResponse.json(
        { success: false, message: 'Missing file or filename' },
        { status: 400 }
      );
    }

    // Convert File to Buffer for Supabase upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const admin = supabaseAdmin();
    const { data, error } = await admin
      .storage
      .from('property-images')
      .upload(fileName, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (error) {
      console.error('Error uploading image:', error);
      return NextResponse.json(
        { success: false, message: `Failed to upload image: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, message: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}