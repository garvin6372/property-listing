'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'
import { comparePassword } from '@/lib/auth'

export async function authenticateAdminAction(email: string, password: string) {
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

export async function uploadImageAction(formData: FormData) {
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;

    if (!file || !fileName) {
        return { success: false, message: 'Missing file or filename' };
    }

    const admin = supabaseAdmin();
    const { data, error } = await admin
        .storage
        .from('property-images')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        console.error('Error uploading image:', error);
        return { success: false, message: 'Failed to upload image' };
    }

    return { success: true, data };
}

export async function addPropertyTypeAction(name: string) {
    const admin = supabaseAdmin();
    const { data, error } = await admin
        .from('property_types')
        .insert([{ name }])
        .select();

    if (error) {
        console.error('Error adding property type:', error);
        return { success: false, message: 'Failed to add property type' };
    }

    return { success: true, data: data[0] };
}

export async function addListingStatusAction(name: string) {
    const admin = supabaseAdmin();
    const { data, error } = await admin
        .from('listing_statuses')
        .insert([{ name }])
        .select();

    if (error) {
        console.error('Error adding listing status:', error);
        return { success: false, message: 'Failed to add listing status' };
    }

    return { success: true, data: data[0] };
}

export async function deletePropertyTypeAction(name: string) {
    const admin = supabaseAdmin();
    const { error } = await admin
        .from('property_types')
        .update({ is_active: false })
        .eq('name', name);

    if (error) {
        console.error('Error deleting property type:', error);
        return { success: false, message: 'Failed to delete property type' };
    }

    return { success: true };
}

export async function deleteListingStatusAction(name: string) {
    const admin = supabaseAdmin();
    const { error } = await admin
        .from('listing_statuses')
        .update({ is_active: false })
        .eq('name', name);

    if (error) {
        console.error('Error deleting listing status:', error);
        return { success: false, message: 'Failed to delete listing status' };
    }

    return { success: true };
}
