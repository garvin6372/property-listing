import { supabaseAdmin } from './admin'
import type { Property, Inquiry } from '../types'
import { comparePassword, hashPassword } from '@/lib/auth'

// Helper function to convert Supabase property to our Property type
function formatProperty(property: any): Property {
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
    company: property.company || undefined,
    imageIds: property.image_ids || [],
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
  }
}

// Helper function to convert our Property type to Supabase property
function formatPropertyForInsert(property: Omit<Property, 'id'>) {
  return {
    title: property.title,
    description: property.description,
    price: property.price,
    location: property.location,
    region: property.region,
    type: property.type,
    status: property.status,
    dubai_status: property.dubaiStatus || null,
    company: property.company || null,
    image_ids: property.imageIds,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
  }
}

// Helper function to convert our Property type for updates
function formatPropertyForUpdate(property: Partial<Property>) {
  const formatted: any = {}
  if (property.title !== undefined) formatted.title = property.title
  if (property.description !== undefined) formatted.description = property.description
  if (property.price !== undefined) formatted.price = property.price
  if (property.location !== undefined) formatted.location = property.location
  if (property.region !== undefined) formatted.region = property.region
  if (property.type !== undefined) formatted.type = property.type
  if (property.status !== undefined) formatted.status = property.status
  if (property.dubaiStatus !== undefined) formatted.dubai_status = property.dubaiStatus || null
  if (property.company !== undefined) formatted.company = property.company || null
  if (property.imageIds !== undefined) formatted.image_ids = property.imageIds
  if (property.bedrooms !== undefined) formatted.bedrooms = property.bedrooms
  if (property.bathrooms !== undefined) formatted.bathrooms = property.bathrooms
  if (property.area !== undefined) formatted.area = property.area
  return formatted
}

export async function getProperties() {
  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching properties:', error)
    throw new Error('Failed to fetch properties')
  }

  return data.map(formatProperty)
}

export async function getPropertyById(id: string) {
  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from('properties')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(`Error fetching property with id ${id}:`, error)
    return null
  }

  return data ? formatProperty(data) : null
}

export async function addProperty(propertyData: Omit<Property, 'id'>) {
  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from('properties')
    .insert([formatPropertyForInsert(propertyData)])
    .select()
    .single()

  if (error) {
    console.error('Error adding property:', error)
    throw new Error('Failed to add property')
  }

  return formatProperty(data)
}

export async function updateProperty(id: string, propertyData: Partial<Property>) {
  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from('properties')
    .update(formatPropertyForUpdate(propertyData))
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating property with id ${id}:`, error)
    throw new Error('Failed to update property')
  }

  return data ? formatProperty(data) : null
}

export async function deleteProperty(id: string) {
  const admin = supabaseAdmin();
  const { error } = await admin
    .from('properties')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(`Error deleting property with id ${id}:`, error)
    throw new Error('Failed to delete property')
  }

  return true
}

export async function addInquiry(inquiryData: Omit<Inquiry, 'id' | 'submittedAt'>) {
  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from('inquiries')
    .insert([{
      name: inquiryData.name,
      email: inquiryData.email,
      phone: inquiryData.phone,
      message: inquiryData.message,
      property_id: inquiryData.propertyId,
    }])
    .select()
    .single()

  if (error) {
    console.error('Error adding inquiry:', error)
    throw new Error('Failed to add inquiry')
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    propertyId: data.property_id,
    submittedAt: new Date(data.created_at),
  }
}

export async function getInquiries() {
  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching inquiries:', error)
    throw new Error('Failed to fetch inquiries')
  }

  return data.map(inquiry => ({
    id: inquiry.id,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    message: inquiry.message,
    propertyId: inquiry.property_id,
    submittedAt: new Date(inquiry.created_at),
  }))
}

// Admin authentication functions
export async function authenticateAdmin(email: string, password: string) {
  const admin = supabaseAdmin();
  // Check against admin users stored in the database
  const { data, error } = await admin
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !data) {
    return { success: false, message: 'Invalid credentials' }
  }

  // Compare the provided password with the hashed password
  const isValid = await comparePassword(password, data.password);
  
  if (isValid) {
    return { success: true, message: 'Authentication successful' }
  }

  return { success: false, message: 'Invalid credentials' }
}

// Register a new admin user with a hashed password
export async function registerAdmin(email: string, password: string) {
  const admin = supabaseAdmin();
  // Hash the password
  const hashedPassword = await hashPassword(password);
  
  // Insert the new admin user
  const { data, error } = await admin
    .from('admin_users')
    .insert([{ email, password: hashedPassword }])
    .select()
    .single();

  if (error) {
    console.error('Error registering admin:', error);
    throw new Error('Failed to register admin');
  }

  return data;
}