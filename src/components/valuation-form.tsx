"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { submitValuation } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending} className="w-full">{pending ? "Submitting..." : "Submit Request"}</Button>;
}

export function ValuationForm() {
  const initialState: any = { message: null, errors: {} };
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
    <form action={dispatch} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
        <Input id="name" name="name" placeholder="John Doe" required />
        {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
        <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" required />
        {state.errors?.phone && <p className="text-sm text-destructive">{state.errors.phone[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="expectedPrice">Expected Price</Label>
        <Input id="expectedPrice" name="expectedPrice" type="text" placeholder="e.g. £500,000 / AED 2.5M" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyType">Property Type</Label>
        <Select name="propertyType">
          <SelectTrigger id="propertyType" className="bg-background">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="House">House</SelectItem>
            <SelectItem value="Villa">Villa</SelectItem>
            <SelectItem value="Penthouse">Penthouse</SelectItem>
            <SelectItem value="Townhouse">Townhouse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="condition">Condition</Label>
        <Select name="condition">
          <SelectTrigger id="condition" className="bg-background">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Newly Built">Newly Built</SelectItem>
            <SelectItem value="Excellent">Excellent</SelectItem>
            <SelectItem value="Good">Good</SelectItem>
            <SelectItem value="Needs Renovation">Needs Renovation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" placeholder="e.g. Downtown Dubai or Mayfair" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="size">Size (sqft)</Label>
        <Input id="size" name="size" placeholder="e.g. 1500" />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="message">Additional Details</Label>
        <Textarea id="message" name="message" placeholder="Please provide the exact address or a link to your property, and any other relevant details." className="min-h-[100px]" />
        {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
      </div>

      <div className="md:col-span-2 pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
