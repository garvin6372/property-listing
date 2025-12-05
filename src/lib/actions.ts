"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { uploadPropertyImage } from "@/lib/supabase/storage";
import { v4 as uuidv4 } from 'uuid';
import { sendEmail, getSmtpSettings } from '@/lib/email';

const propertySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  location: z.string().min(3, "Location is required"),
  region: z.enum(["Dubai", "London"]),
  type: z.string().min(1, "Property type is required"),
  status: z.string().min(1, "Status is required"),
  dubaiStatus: z.string().optional(), // Changed to string to accommodate 'none' value
  imageIds: z.string().min(1, "At least one image is required"),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  area: z.number(), // Removed validation, allow any number including decimals
});

const inquirySchema = z.object({
  propertyId: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  message: z.string().optional(),
});

const valuationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Helper function to convert our Property type to Supabase property
function formatPropertyForInsert(property: any) {
  return {
    title: property.title,
    description: property.description,
    price: property.price,
    location: property.location,
    region: property.region,
    type: property.type,
    status: property.status,
    dubai_status: property.dubaiStatus && property.dubaiStatus !== 'none' ? property.dubaiStatus : null,
    image_ids: Array.isArray(property.imageIds) ? property.imageIds : (property.imageIds ? property.imageIds.split(',') : []),
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
  };
}

// Helper function to convert our Property type for updates
function formatPropertyForUpdate(property: any) {
  const formatted: any = {};
  if (property.title !== undefined) formatted.title = property.title;
  if (property.description !== undefined) formatted.description = property.description;
  if (property.price !== undefined) formatted.price = property.price;
  if (property.location !== undefined) formatted.location = property.location;
  if (property.region !== undefined) formatted.region = property.region;
  if (property.type !== undefined) formatted.type = property.type;
  if (property.status !== undefined) formatted.status = property.status;
  if (property.dubaiStatus !== undefined) formatted.dubai_status = property.dubaiStatus && property.dubaiStatus !== 'none' ? property.dubaiStatus : null;
  if (property.imageIds !== undefined) formatted.image_ids = Array.isArray(property.imageIds) ? property.imageIds : (property.imageIds ? property.imageIds.split(',') : []);
  if (property.bedrooms !== undefined) formatted.bedrooms = property.bedrooms;
  if (property.bathrooms !== undefined) formatted.bathrooms = property.bathrooms;
  if (property.area !== undefined) formatted.area = property.area;
  return formatted;
}

export async function saveProperty(prevState: any, formData: FormData) {
  const admin = supabaseAdmin();
  const id = formData.get('id') as string || undefined;

  // Validate form data
  const validatedFields = propertySchema.safeParse({
    id,
    title: formData.get('title'),
    description: formData.get('description'),
    price: Number(formData.get('price')),
    location: formData.get('location'),
    region: formData.get('region'),
    type: formData.get('type'),
    status: formData.get('status'),
    dubaiStatus: formData.get('dubaiStatus') ?? undefined, // Use undefined instead of null for optional fields
    imageIds: formData.get('imageIds') as string,
    bedrooms: Number(formData.get('bedrooms')),
    bathrooms: Number(formData.get('bathrooms')),
    area: Number(formData.get('area')),
  });

  // Return early if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Property.',
    };
  }

  try {
    const { dubaiStatus, imageIds, ...rest } = validatedFields.data;
    const propertyData = {
      ...rest,
      // Split the comma-separated image IDs
      imageIds: imageIds.split(',').filter(id => id.trim() !== ''),
      dubaiStatus: validatedFields.data.region === 'Dubai' && validatedFields.data.status === 'Buy' && dubaiStatus && dubaiStatus !== 'none' ? dubaiStatus : undefined,
    };

    if (id) {
      const { data, error } = await admin
        .from('properties')
        .update(formatPropertyForUpdate(propertyData))
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
    } else {
      const { data, error } = await admin
        .from('properties')
        .insert([formatPropertyForInsert(propertyData)])
        .select()
        .single();

      if (error) throw error;
    }
    revalidatePath("/admin/properties");
    return { message: `Property ${id ? 'updated' : 'created'} successfully!`, errors: {} };
  } catch (e) {
    console.error('Error saving property:', e);
    return { message: `Failed to ${id ? 'update' : 'create'} property.`, errors: {} };
  }
}

export async function deleteProperty(id: string) {
  const admin = supabaseAdmin();
  try {
    const { error } = await admin
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/properties');
    return { message: "Property deleted successfully." };
  } catch (error) {
    console.error('Error deleting property:', error);
    return { message: "Failed to delete property." };
  }
}

export async function submitInquiry(prevState: any, formData: FormData) {
  const admin = supabaseAdmin();
  // Validate form data
  const validatedFields = inquirySchema.safeParse({
    propertyId: formData.get('propertyId'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  // Return early if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Submit Inquiry.',
    };
  }

  try {
    const { data, error } = await admin
      .from('inquiries')
      .insert([{
        property_id: validatedFields.data.propertyId || null,
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone,
        message: validatedFields.data.message || '',
      }])
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/properties/[id]');

    // Send email notification
    const settings = await getSmtpSettings();
    if (settings) {
      await sendEmail({
        to: settings.from_email,
        subject: `New Inquiry for ${validatedFields.data.propertyId ? 'Property' : 'General'}`,
        text: `
New Inquiry

Property ID: ${validatedFields.data.propertyId || 'N/A'}
Name: ${validatedFields.data.name}
Email: ${validatedFields.data.email}
Phone: ${validatedFields.data.phone}
Message: ${validatedFields.data.message || 'N/A'}
            `,
        html: `
<h1>New Inquiry</h1>
<p><strong>Property ID:</strong> ${validatedFields.data.propertyId || 'N/A'}</p>
<p><strong>Name:</strong> ${validatedFields.data.name}</p>
<p><strong>Email:</strong> ${validatedFields.data.email}</p>
<p><strong>Phone:</strong> ${validatedFields.data.phone}</p>
<p><strong>Message:</strong> ${validatedFields.data.message || 'N/A'}</p>
            `
      });
    }

    return { message: "Inquiry submitted successfully!", errors: {} };
  } catch (e) {
    console.error('Error submitting inquiry:', e);
    return { message: "Failed to submit inquiry.", errors: {} };
  }
}

export async function submitValuation(prevState: any, formData: FormData) {
  const admin = supabaseAdmin();
  // Validate form data
  const validatedFields = valuationSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  // Return early if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Submit Valuation Request.',
    };
  }

  try {
    const { data, error } = await admin
      .from('valuations')
      .insert([{
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone,
        message: validatedFields.data.message,
      }])
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/properties/[id]');

    // Send email notification
    const settings = await getSmtpSettings();
    if (settings) {
      await sendEmail({
        to: settings.from_email,
        subject: 'New Valuation Request',
        text: `
New Valuation Request

Name: ${validatedFields.data.name}
Email: ${validatedFields.data.email}
Phone: ${validatedFields.data.phone}
Message: ${validatedFields.data.message}
            `,
        html: `
<h1>New Valuation Request</h1>
<p><strong>Name:</strong> ${validatedFields.data.name}</p>
<p><strong>Email:</strong> ${validatedFields.data.email}</p>
<p><strong>Phone:</strong> ${validatedFields.data.phone}</p>
<p><strong>Message:</strong> ${validatedFields.data.message}</p>
            `
      });
    }

    return { message: "Valuation request submitted successfully!", errors: {} };
  } catch (e) {
    console.error('Error submitting valuation:', e);
    return { message: "Failed to submit valuation request.", errors: {} };
  }
}