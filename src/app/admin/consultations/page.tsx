
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getConsultations } from "@/lib/data";
import type { Metadata } from "next";
import { ConsultationsList } from "./consultations-list";

export const metadata: Metadata = {
    title: "Consultation Requests | Skyvera",
};

export default async function ConsultationsPage() {
    const consultations = await getConsultations();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Consultation Requests</h1>
            <Card>
                <CardHeader>
                    <CardTitle>All Consultation Requests</CardTitle>
                    <CardDescription>
                        {consultations.length > 0
                            ? `You have ${consultations.length} new consultation requests.`
                            : "There are no new consultation requests at the moment."
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ConsultationsList consultations={consultations} />
                </CardContent>
            </Card>
        </div>
    );
}
