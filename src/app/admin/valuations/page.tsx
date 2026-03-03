
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getValuations } from "@/lib/data";
import type { Metadata } from "next";
import { ValuationsList } from "./valuations-list";

export const metadata: Metadata = {
  title: "Valuation Requests | Skyvera",
};

export default async function ValuationsPage() {
  const valuations = await getValuations();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Valuation Requests</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Valuation Requests</CardTitle>
          <CardDescription>
            {valuations.length > 0
              ? `You have ${valuations.length} new valuation requests.`
              : "There are no new valuation requests at the moment."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ValuationsList valuations={valuations} />
        </CardContent>
      </Card>
    </div>
  );
}
