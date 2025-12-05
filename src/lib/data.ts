import type { Property, Inquiry, Valuation, Consultation, Region, PropertyType, ListingStatus, DubaiStatus } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { supabaseClient } from '@/lib/supabase/client';
import { getPropertyImagePublicUrl } from "@/lib/supabase/storage";

// Helper function to convert Supabase property to our Property type
function formatProperty(property: any): Property & { createdAt?: string } {
  return {
    id: property.id,
    title: property.title,
    description: property.description,
    price: property.price,
    location: property.location,
    region: property.region,
    type: property.type,
    status: property.status,
    dubaiStatus: property.dubai_status || undefined,
    imageIds: property.image_ids || [],
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    createdAt: property.created_at,
  };
}

// Helper function to convert image IDs to image objects
function convertImageIdsToImages(imageIds: string[]) {
  return imageIds.map(id => {
    // Check if it's a placeholder image
    const placeholderImage = PlaceHolderImages.find(img => img.id === id);
    if (placeholderImage) {
      return placeholderImage;
    }

    // If not a placeholder, it's an uploaded image
    // Create an image object for uploaded images
    return {
      id: id,
      imageUrl: getPropertyImagePublicUrl(id),
      description: "Property Image",
      imageHint: "property image"
    };
  });
}

// Client-side functions (for use in client components)
export async function getClientProperties(search?: string) {
  const client = supabaseClient();

  let query = client
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  // If search parameter exists, filter by location or region
  if (search) {
    query = query.or(`location.ilike.%${search}%,region.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties');
  }

  const propertiesWithImages = data.map((p: any) => formatProperty(p)).map((p: Property) => ({
    ...p,
    images: convertImageIdsToImages(p.imageIds)
  }));

  return propertiesWithImages;
}

// Client-side functions (for use in client components)
export async function getClientFeaturedProperties(search?: string) {
  const client = supabaseClient();

  let query = client
    .from('properties')
    .select('*')
    .limit(6)
    .order('created_at', { ascending: false });

  // If search parameter exists, filter by location or region
  if (search) {
    query = query.or(`location.ilike.%${search}%,region.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties');
  }

  const propertiesWithImages = data.map((p: any) => formatProperty(p)).map((p: Property) => ({
    ...p,
    images: convertImageIdsToImages(p.imageIds)
  }));

  return propertiesWithImages;
}

export async function getClientPropertyById(id: string) {
  const client = supabaseClient();
  const { data, error } = await client
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    return null;
  }

  if (!data) return null;

  const property = formatProperty(data);

  return {
    ...property,
    images: convertImageIdsToImages(property.imageIds)
  };
}

// Server-side functions (for use in server components and API routes)
// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProperties() {
  const admin = supabaseAdmin();
  await delay(100);

  const { data, error } = await admin
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties');
  }

  const propertiesWithImages = data.map((p: any) => formatProperty(p)).map((p: Property) => ({
    ...p,
    images: convertImageIdsToImages(p.imageIds)
  }));

  return propertiesWithImages;
}

export async function getPropertyById(id: string) {
  const admin = supabaseAdmin();
  await delay(100);

  const { data, error } = await admin
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    return null;
  }

  if (!data) return null;

  const property = formatProperty(data);

  return {
    ...property,
    images: convertImageIdsToImages(property.imageIds)
  };
}

export async function addProperty(propertyData: Omit<Property, 'id'>) {
  const admin = supabaseAdmin();
  await delay(200);

  const { data, error } = await admin
    .from('properties')
    .insert([{
      title: propertyData.title,
      description: propertyData.description,
      price: propertyData.price,
      location: propertyData.location,
      region: propertyData.region,
      type: propertyData.type,
      status: propertyData.status,
      dubai_status: propertyData.dubaiStatus || null,
      image_ids: propertyData.imageIds,
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      area: propertyData.area,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error adding property:', error);
    throw new Error('Failed to add property');
  }

  const newProperty = formatProperty(data);
  return newProperty;
}

export async function updateProperty(id: string, propertyData: Partial<Property>) {
  const admin = supabaseAdmin();
  await delay(200);

  const { data, error } = await admin
    .from('properties')
    .update({
      title: propertyData.title,
      description: propertyData.description,
      price: propertyData.price,
      location: propertyData.location,
      region: propertyData.region,
      type: propertyData.type,
      status: propertyData.status,
      dubai_status: propertyData.dubaiStatus || null,
      image_ids: propertyData.imageIds,
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      area: propertyData.area,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating property with id ${id}:`, error);
    throw new Error('Failed to update property');
  }

  const updatedProperty = formatProperty(data);
  return updatedProperty;
}

export async function deleteProperty(id: string) {
  const admin = supabaseAdmin();
  await delay(200);

  const { error } = await admin
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting property with id ${id}:`, error);
    throw new Error('Failed to delete property');
  }

  return true;
}

export async function getInquiries() {
  const admin = supabaseAdmin();
  await delay(100);

  const { data, error } = await admin
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching inquiries:', error);
    throw new Error('Failed to fetch inquiries');
  }

  return data.map(inquiry => ({
    id: inquiry.id,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    message: inquiry.message,
    propertyId: inquiry.property_id,
    submittedAt: new Date(inquiry.created_at),
  }));
}

export async function getValuations() {
  const admin = supabaseAdmin();
  await delay(100);

  const { data, error } = await admin
    .from('valuations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching valuations:', error);
    throw new Error('Failed to fetch valuations');
  }

  return data.map(valuation => ({
    id: valuation.id,
    name: valuation.name,
    email: valuation.email,
    phone: valuation.phone,
    message: valuation.message,
    address: valuation.address,
    type: valuation.type,
    expectedValue: valuation.expected_value,
    submittedAt: new Date(valuation.created_at),
  }));
}

export async function getConsultations(): Promise<Consultation[]> {
  const admin = supabaseAdmin();
  await delay(100);

  const { data, error } = await admin
    .from('consultations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching consultations:', error);
    throw new Error('Failed to fetch consultations');
  }

  return data.map(consultation => ({
    id: consultation.id,
    name: consultation.name,
    email: consultation.email,
    phone: consultation.phone,
    budget: consultation.budget,
    message: consultation.message,
    submittedAt: new Date(consultation.created_at),
  }));
}

// Add new functions for property types and listing statuses
export async function getPropertyTypes() {
  const client = supabaseClient();
  const { data, error } = await client
    .from('property_types')
    .select('name')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching property types:', error);
    return [];
  }

  return data.map((item: any) => item.name);
}

export async function getListingStatuses() {
  const client = supabaseClient();
  const { data, error } = await client
    .from('listing_statuses')
    .select('name')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching listing statuses:', error);
    return [];
  }

  return data.map((item: any) => item.name);
}

export async function addPropertyType(name: string) {
  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from('property_types')
    .insert([{ name }])
    .select();

  if (error) {
    console.error('Error adding property type:', error);
    throw new Error('Failed to add property type');
  }

  return data[0];
}

export async function addListingStatus(name: string) {
  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from('listing_statuses')
    .insert([{ name }])
    .select();

  if (error) {
    console.error('Error adding listing status:', error);
    throw new Error('Failed to add listing status');
  }

  return data[0];
}

export async function deletePropertyType(name: string) {
  const admin = supabaseAdmin();
  const { error } = await admin
    .from('property_types')
    .update({ is_active: false })
    .eq('name', name);

  if (error) {
    console.error('Error deleting property type:', error);
    throw new Error('Failed to delete property type');
  }

  return true;
}

export async function deleteListingStatus(name: string) {
  const admin = supabaseAdmin();
  const { error } = await admin
    .from('listing_statuses')
    .update({ is_active: false })
    .eq('name', name);

  if (error) {
    console.error('Error deleting listing status:', error);
    throw new Error('Failed to delete listing status');
  }

  return true;
}

export const propertyTypes: PropertyType[] = ["Apartment", "Villa", "Townhouse", "Office", "Penthouse"];
export const regions: Region[] = ["Dubai", "London"];
export const listingStatuses: ListingStatus[] = ["Buy", "Rent"];
export const dubaiStatuses: DubaiStatus[] = ["Ready", "Off-plan", "Buy-to-let", "Family homes", "Luxury villas"];
export const allStatuses: (ListingStatus | DubaiStatus)[] = ["Buy", "Rent", "Ready", "Off-plan", "Buy-to-let"];

// We'll fetch locations dynamically from the database
export async function getLocations() {
  const client = supabaseClient();
  const { data, error } = await client
    .from('properties')
    .select('location');

  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }

  return [...new Set(data.map((p: any) => p.location))];
}