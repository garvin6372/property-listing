'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { saveSmtpSettings } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";

interface SmtpSettings {
    host?: string;
    port?: number;
    secure?: boolean;
    username?: string;
    password?: string;
    from_email?: string;
    from_name?: string;
}

export function SmtpSettingsForm({ initialSettings }: { initialSettings: SmtpSettings | null }) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [secure, setSecure] = useState(initialSettings?.secure || false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            const result = await saveSmtpSettings(formData);
            if (result.success) {
                toast({
                    title: "Success",
                    description: result.message,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.message,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>SMTP Configuration</CardTitle>
                <CardDescription>Configure your email server settings for sending notifications.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="host">SMTP Host</Label>
                            <Input id="host" name="host" defaultValue={initialSettings?.host || 'smtp.gmail.com'} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="port">Port</Label>
                            <Input id="port" name="port" type="number" defaultValue={initialSettings?.port || 587} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" defaultValue={initialSettings?.username} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" defaultValue={initialSettings?.password} required />
                            <p className="text-xs text-muted-foreground">For Gmail, use an App Password.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="from_email">From Email</Label>
                            <Input id="from_email" name="from_email" type="email" defaultValue={initialSettings?.from_email} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="from_name">From Name</Label>
                            <Input id="from_name" name="from_name" defaultValue={initialSettings?.from_name || 'Skyvera'} required />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="secure-switch" checked={secure} onCheckedChange={setSecure} />
                            <input type="hidden" name="secure" value={secure ? 'on' : 'off'} />
                            <Label htmlFor="secure-switch">Secure (SSL/TLS)</Label>
                        </div>
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Settings'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
