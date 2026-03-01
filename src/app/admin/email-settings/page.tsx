import { getSmtpSettings } from '@/lib/email';
import { SmtpSettingsForm } from './smtp-form';

export default async function EmailSettingsPage() {
    const settings = await getSmtpSettings();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif text-foreground font-light tracking-wide">Email Settings</h1>
            </div>
            <SmtpSettingsForm initialSettings={settings} />
        </div>
    );
}
