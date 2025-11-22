"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

interface FormErrors {
  propertyId?: string[];
  name?: string[];
  email?: string[];
  phone?: string[];
  message?: string[];
}

interface FormState {
  message: string;
  errors: FormErrors;
}

interface InquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending} className="w-full">{pending ? "Sending..." : "Send Inquiry"}</Button>;
}

export function InquiryForm({ propertyId, propertyTitle }: InquiryFormProps) {
  const initialState: FormState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(submitInquiry, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message?.includes('successfully')) {
      toast({
        title: "Inquiry Sent!",
        description: `We've received your inquiry for ${propertyTitle}. Our team will be in touch shortly.`,
      });
    } else if (state.message?.includes('Error') || state.message?.includes('Failed')) {
       toast({
        variant: "destructive",
        title: "Something went wrong",
        description: state.message,
      });
    }
  }, [state, propertyTitle, toast]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Inquire about this property</CardTitle>
        <CardDescription>An agent will contact you shortly.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-4">
          <input type="hidden" name="propertyId" value={propertyId} />
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
            {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" required />
            {state.errors?.phone && <p className="text-sm text-destructive">{state.errors.phone[0]}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea id="message" name="message" placeholder="I'm interested in this property and would like to schedule a viewing." />
             {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
          </div>
          
          <SubmitButton />
          
          <div className="mt-4">
            <Button 
              type="button"
              onClick={() => window.open('https://wa.me/919537681372', '_blank')}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
