import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const admin = supabaseAdmin();
  try {
    // Test creating a property
    const testProperty = {
      title: 'Test Property',
      description: 'This is a test property for integration testing',
      price: 1000000,
      location: 'Test Location',
      region: 'Dubai',
      type: 'Apartment',
      status: 'Buy',
      dubai_status: 'Ready',
      image_ids: ['test-image-1', 'test-image-2'],
      bedrooms: 3,
      bathrooms: 2,
      area: 1500
    };

    // Insert test property
    const { data: insertedProperty, error: insertError } = await admin
      .from('properties')
      .insert([testProperty])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ status: 'error', message: 'Failed to insert test property', error: insertError.message }, { status: 500 });
    }

    // Test retrieving the property
    const { data: retrievedProperty, error: selectError } = await admin
      .from('properties')
      .select('*')
      .eq('id', insertedProperty.id)
      .single();

    if (selectError) {
      console.error('Select error:', selectError);
      return NextResponse.json({ status: 'error', message: 'Failed to retrieve test property', error: selectError.message }, { status: 500 });
    }

    // Test updating the property
    const { data: updatedProperty, error: updateError } = await admin
      .from('properties')
      .update({ price: 1200000 })
      .eq('id', insertedProperty.id)
      .select()
      .single();

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json({ status: 'error', message: 'Failed to update test property', error: updateError.message }, { status: 500 });
    }

    // Test deleting the property
    const { error: deleteError } = await admin
      .from('properties')
      .delete()
      .eq('id', insertedProperty.id);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return NextResponse.json({ status: 'error', message: 'Failed to delete test property', error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      status: 'success', 
      message: 'Supabase integration test passed',
      insertedProperty,
      retrievedProperty,
      updatedProperty
    });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({ status: 'error', message: 'Integration test failed', error: (error as Error).message }, { status: 500 });
  }
}