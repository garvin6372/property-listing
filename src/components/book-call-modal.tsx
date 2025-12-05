"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PhoneCall } from "lucide-react"
import { submitConsultationRequest } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export function BookCallModal() {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)

        try {
            const result = await submitConsultationRequest(formData)
            if (result.success) {
                toast({
                    title: "Request Sent",
                    description: "We have received your request and will contact you shortly.",
                })
                setOpen(false)
            } else {
                throw new Error("Failed to submit")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="hidden md:flex gap-2 bg-[#2C2A26] text-white hover:bg-[#2C2A26]/90">
                    <PhoneCall className="h-4 w-4" />
                    Book a Free Consultation
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book a Free Consultation</DialogTitle>
                    <DialogDescription>
                        Fill out the form below and our team will get back to you shortly.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="John Doe" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+1 234 567 890" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="budget">Budget</Label>
                        <Input id="budget" name="budget" placeholder="e.g. $500k - $1M" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="message" placeholder="I'm interested in..." />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full bg-[#2C2A26] text-white hover:bg-[#2C2A26]/90" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Submit Request"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
