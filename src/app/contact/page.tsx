"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-muted/30 py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Contact Us</h1>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto px-4">
                    We're here to help you find your dream property. Reach out to us for any inquiries.
                </p>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-serif mb-6">Get in touch</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1">Dubai Office</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Office 123, Luxury Tower A<br />
                                            Business Bay, Dubai, UAE
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1">London Office</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            45 Kensington High Street<br />
                                            London, W8 5ED, UK
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1">Email</h3>
                                        <p className="text-muted-foreground">contact@skyvera.com</p>
                                        <p className="text-muted-foreground">sales@skyvera.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1">Phone</h3>
                                        <p className="text-muted-foreground">+971 4 123 4567 (Dubai)</p>
                                        <p className="text-muted-foreground">+44 20 1234 5678 (London)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder
                        <div className="rounded-2xl overflow-hidden h-[300px] bg-muted relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206253.22728956!2d-115.31481541094031!3d36.1249195971439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1709503487000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0, opacity: 0.7 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale"
                            ></iframe>
                            <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
                        </div> */}
                    </div>

                    {/* Contact Form */}
                    <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 h-fit">
                        <h2 className="text-2xl font-serif mb-6">Send us a message</h2>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone (Optional)</Label>
                                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="Inquiry about..." />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="How can we help you?"
                                    className="min-h-[150px]"
                                />
                            </div>

                            <Button type="submit" className="w-full rounded-full" size="lg">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
