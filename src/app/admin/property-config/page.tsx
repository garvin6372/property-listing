"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import type { Metadata } from "next";
import { useEffect, useState } from "react";
import { getPropertyTypes, getListingStatuses } from "@/lib/data";
import { addPropertyTypeAction, addListingStatusAction, deletePropertyTypeAction, deleteListingStatusAction } from "@/app/actions";

// Note: Metadata should be in the server component, not client component
// export const metadata: Metadata = {
//   title: "Property Configuration",
// };

export default function PropertyConfigPage() {
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [listingStatuses, setListingStatuses] = useState<string[]>([]);
  const [newPropertyType, setNewPropertyType] = useState("");
  const [newListingStatus, setNewListingStatus] = useState("");

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [types, statuses] = await Promise.all([
        getPropertyTypes(),
        getListingStatuses()
      ]);
      setPropertyTypes(types);
      setListingStatuses(statuses);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddPropertyType = async () => {
    if (!newPropertyType.trim()) return;

    try {
      const result = await addPropertyTypeAction(newPropertyType.trim());
      if (!result.success) {
        console.error("Error:", result.message);
        return;
      }
      setNewPropertyType("");
      fetchData();
    } catch (error) {
      console.error("Error adding property type:", error);
    }
  };

  const handleAddListingStatus = async () => {
    if (!newListingStatus.trim()) return;

    try {
      const result = await addListingStatusAction(newListingStatus.trim());
      if (!result.success) {
        console.error("Error:", result.message);
        return;
      }
      setNewListingStatus("");
      fetchData();
    } catch (error) {
      console.error("Error adding listing status:", error);
    }
  };

  const handleDeletePropertyType = async (name: string) => {
    try {
      const result = await deletePropertyTypeAction(name);
      if (!result.success) {
        console.error("Error:", result.message);
        return;
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting property type:", error);
    }
  };

  const handleDeleteListingStatus = async (name: string) => {
    try {
      const result = await deleteListingStatusAction(name);
      if (!result.success) {
        console.error("Error:", result.message);
        return;
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting listing status:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Property Configuration</h1>
        <p className="text-muted-foreground">
          Manage property types and listing statuses
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Property Types Section */}
        <Card>
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="property-type">Add New Property Type</Label>
              <div className="flex gap-2">
                <Input
                  id="property-type"
                  placeholder="Enter property type"
                  value={newPropertyType}
                  onChange={(e) => setNewPropertyType(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddPropertyType()}
                />
                <Button onClick={handleAddPropertyType}>Add</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Existing Property Types</Label>
              <div className="space-y-2">
                {propertyTypes.map((type) => (
                  <div key={type} className="flex items-center justify-between p-2 border rounded-md">
                    <span>{type}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeletePropertyType(type)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Listing Statuses Section */}
        <Card>
          <CardHeader>
            <CardTitle>Listing Statuses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="listing-status">Add New Listing Status</Label>
              <div className="flex gap-2">
                <Input
                  id="listing-status"
                  placeholder="Enter listing status"
                  value={newListingStatus}
                  onChange={(e) => setNewListingStatus(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddListingStatus()}
                />
                <Button onClick={handleAddListingStatus}>Add</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Existing Listing Statuses</Label>
              <div className="space-y-2">
                {listingStatuses.map((status) => (
                  <div key={status} className="flex items-center justify-between p-2 border rounded-md">
                    <span>{status}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteListingStatus(status)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}