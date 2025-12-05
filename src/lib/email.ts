import nodemailer from 'nodemailer';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function getSmtpSettings() {
    const admin = supabaseAdmin();
    const { data: settings, error } = await admin
        .from('smtp_settings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) return null;
    return settings;
}

export async function sendEmail({
    to,
    subject,
    text,
    html,
}: {
    to: string;
    subject: string;
    text: string;
    html?: string;
}) {
    const settings = await getSmtpSettings();

    if (!settings) {
        console.error('No active SMTP settings found');
        return { success: false, error: 'SMTP settings not configured' };
    }

    try {
        const transporter = nodemailer.createTransport({
            host: settings.host,
            port: settings.port,
            secure: settings.secure, // true for 465, false for other ports
            auth: {
                user: settings.username,
                pass: settings.password,
            },
        });

        const info = await transporter.sendMail({
            from: `"${settings.from_name}" <${settings.from_email}>`,
            to, // This should be the admin email or where notifications go
            subject,
            text,
            html,
        });

        console.log('Message sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (emailError) {
        console.error('Error sending email:', emailError);
        return { success: false, error: emailError };
    }
}
