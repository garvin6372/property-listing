'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'
import { comparePassword } from '@/lib/auth'
import { sendEmail, getSmtpSettings } from '@/lib/email'

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

export async function submitValuationRequest(formData: FormData) {
    const admin = supabaseAdmin();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const type = formData.get('type') as string;
    const expectedValue = formData.get('expectedValue') as string;

    const { error } = await admin
        .from('valuations')
        .insert([{
            name,
            email,
            phone,
            address,
            type,
            expected_value: expectedValue
        }]);

    if (error) {
        console.error('Error submitting valuation request:', error);
        return { success: false, message: 'Failed to submit valuation request' };
    }

    // Send email notification
    const settings = await getSmtpSettings();
    if (settings) {
        await sendEmail({
            to: settings.from_email,
            subject: 'New Valuation Request',
            text: `
New Valuation Request

Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}
Type: ${type}
Expected Value: ${expectedValue}
            `,
            html: `
<h1>New Valuation Request</h1>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Address:</strong> ${address}</p>
<p><strong>Type:</strong> ${type}</p>
<p><strong>Expected Value:</strong> ${expectedValue}</p>
            `
        });
    }

    return { success: true, message: 'Valuation request submitted successfully' };
}

export async function submitConsultationRequest(formData: FormData) {
    const admin = supabaseAdmin();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const budget = formData.get('budget') as string;
    const message = formData.get('message') as string;

    const { error } = await admin
        .from('consultations')
        .insert([{
            name,
            email,
            phone,
            budget,
            message
        }]);

    if (error) {
        console.error('Error submitting consultation request:', error);
        return { success: false, message: 'Failed to submit consultation request' };
    }

    // Send email notification
    const settings = await getSmtpSettings();
    if (settings) {
        await sendEmail({
            to: settings.from_email,
            subject: 'New Consultation Request',
            text: `
New Consultation Request

Name: ${name}
Email: ${email}
Phone: ${phone}
Budget: ${budget}
Message: ${message}
            `,
            html: `
<h1>New Consultation Request</h1>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Budget:</strong> ${budget}</p>
<p><strong>Message:</strong> ${message}</p>
            `
        });
    }

    return { success: true, message: 'Consultation request submitted successfully' };
}

export async function saveSmtpSettings(formData: FormData) {
    const admin = supabaseAdmin();
    const host = formData.get('host') as string;
    const port = parseInt(formData.get('port') as string);
    const secure = formData.get('secure') === 'on';
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const from_email = formData.get('from_email') as string;
    const from_name = formData.get('from_name') as string;

    const existing = await getSmtpSettings();

    let error;
    if (existing) {
        const { error: updateError } = await admin
            .from('smtp_settings')
            .update({
                host,
                port,
                secure,
                username,
                password,
                from_email,
                from_name,
                updated_at: new Date().toISOString()
            })
            .eq('id', existing.id);
        error = updateError;
    } else {
        const { error: insertError } = await admin
            .from('smtp_settings')
            .insert([{
                host,
                port,
                secure,
                username,
                password,
                from_email,
                from_name
            }]);
        error = insertError;
    }

    if (error) {
        console.error('Error saving SMTP settings:', error);
        return { success: false, message: 'Failed to save SMTP settings' };
    }

    return { success: true, message: 'SMTP settings saved successfully' };
}
