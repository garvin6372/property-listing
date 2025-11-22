import { supabaseClient } from './client';
import { supabaseAdmin } from './admin';

// Upload a file to the property-images bucket
export async function uploadPropertyImage(file: File, fileName: string) {
  const client = supabaseClient();
  const { data, error } = await client
    .storage
    .from('property-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }

  return data;
}

// Get the public URL for a file in the property-images bucket
export function getPropertyImagePublicUrl(fileName: string) {
  const client = supabaseClient();
  const { data } = client
    .storage
    .from('property-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

// Delete a file from the property-images bucket
export async function deletePropertyImage(fileName: string) {
  const client = supabaseClient();
  const { data, error } = await client
    .storage
    .from('property-images')
    .remove([fileName]);

  if (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }

  return data;
}

// List all files in the property-images bucket
export async function listPropertyImages() {
  const client = supabaseClient();
  const { data, error } = await client
    .storage
    .from('property-images')
    .list();

  if (error) {
    console.error('Error listing images:', error);
    throw new Error('Failed to list images');
  }

  return data;
}