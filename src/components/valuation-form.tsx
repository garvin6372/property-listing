"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { submitValuation } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending} className="w-full">{pending ? "Submitting..." : "Submit Request"}</Button>;
}

export function ValuationForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(submitValuation, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message?.includes('successfully')) {
      toast({
        title: "Request Sent!",
        description: "We've received your valuation request. Our team will be in touch shortly.",
      });
      // Here you might want to close the dialog
    } else if (state.message?.includes('Error') || state.message?.includes('Failed')) {
       toast({
        variant: "destructive",
        title: "Something went wrong",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form action={dispatch} className="grid gap-4 py-4">
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
            <Label htmlFor="message">Property Details</Label>
            <Textarea id="message" name="message" placeholder="Please provide the address or a link to your property, and any other relevant details." required />
            {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
        </div>
        
        <SubmitButton />
    </form>
  );
}
