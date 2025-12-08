"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { saveProperty } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPropertyTypes, getListingStatuses } from "@/lib/data";
import { regions, dubaiStatuses } from "@/lib/data";
import type { PropertyWithImages } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { uploadPropertyImage } from "@/lib/supabase/storage";
import { uploadImageAction } from "@/app/actions";

interface PropertyFormProps {
  property?: PropertyWithImages;
}

interface FormState {
  message: string;
  errors: {
    title?: string[];
    description?: string[];
    price?: string[];
    location?: string[];
    region?: string[];
    type?: string[];
    status?: string[];
    dubaiStatus?: string[];
    company?: string[];
    bedrooms?: string[];
    bathrooms?: string[];
    area?: string[];
    imageIds?: string[];
  };
}

// Frontend validation function
function validatePropertyForm(formData: FormData): { isValid: boolean; errors: FormState['errors'] } {
  const errors: FormState['errors'] = {};
  let isValid = true;

  // Title validation
  const title = formData.get('title') as string;
  if (!title || title.trim().length < 3) {
    errors.title = ['Title must be at least 3 characters'];
    isValid = false;
  }

  // Description validation
  const description = formData.get('description') as string;
  if (!description || description.trim().length < 10) {
    errors.description = ['Description must be at least 10 characters'];
    isValid = false;
  }

  // Price validation
  const price = Number(formData.get('price'));
  if (isNaN(price) || price <= 0) {
    errors.price = ['Price must be greater than 0'];
    isValid = false;
  }

  // Location validation
  const location = formData.get('location') as string;
  if (!location || location.trim().length < 3) {
    errors.location = ['Location is required and must be at least 3 characters'];
    isValid = false;
  }

  // Region validation
  const region = formData.get('region') as string;
  if (!region) {
    errors.region = ['Region is required'];
    isValid = false;
  }

  // Type validation
  const type = formData.get('type') as string;
  if (!type) {
    errors.type = ['Property type is required'];
    isValid = false;
  }

  // Status validation
  const status = formData.get('status') as string;
  if (!status) {
    errors.status = ['Listing status is required'];
    isValid = false;
  }

  // Bedrooms validation
  const bedrooms = Number(formData.get('bedrooms'));
  if (isNaN(bedrooms) || bedrooms < 0) {
    errors.bedrooms = ['Bedrooms must be a valid number (0 or greater)'];
    isValid = false;
  }

  // Bathrooms validation
  const bathrooms = Number(formData.get('bathrooms'));
  if (isNaN(bathrooms) || bathrooms < 0) {
    errors.bathrooms = ['Bathrooms must be a valid number (0 or greater)'];
    isValid = false;
  }

  // Area validation (now allows decimals)
  const area = Number(formData.get('area'));
  if (isNaN(area) || area <= 0) {
    errors.area = ['Area must be a valid number greater than 0'];
    isValid = false;
  }

  return { isValid, errors };
}

function SubmitButton({ isEditing, pending }: { isEditing: boolean; pending: boolean }) {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (isEditing ? "Saving..." : "Creating...") : (isEditing ? "Save Changes" : "Create Property")}
    </Button>
  );
}

export function PropertyForm({ property }: PropertyFormProps) {
  const initialState: FormState = { message: "", errors: {} };
  const [state, formAction, pending] = useActionState(saveProperty, initialState);
  const { toast } = useToast();
  const router = useRouter();

  const [selectedRegion, setSelectedRegion] = useState(property?.region || '');
  const [selectedStatus, setSelectedStatus] = useState(property?.status || '');

  // State for dynamic property types and listing statuses
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [listingStatuses, setListingStatuses] = useState<string[]>([]);

  // State for uploaded images
  const [uploadedImages, setUploadedImages] = useState<{ id: string, url: string }[]>([]);

  // Form validation state
  const [validationErrors, setValidationErrors] = useState<FormState['errors']>({});

  // Create a ref for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch dynamic property types and listing statuses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [types, statuses] = await Promise.all([
          getPropertyTypes(),
          getListingStatuses()
        ]);
        setPropertyTypes(types);
        setListingStatuses(statuses);
      } catch (error) {
        console.error("Error fetching property types and statuses:", error);
        // Fallback to static data if dynamic fetch fails
        setPropertyTypes(["Apartment", "Villa", "Townhouse", "Office", "Penthouse"]);
        setListingStatuses(["Buy", "Rent"]);
      }
    };

    fetchData();
  }, []);

  // Handle image file selection and upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newUploadedImages: { id: string, url: string }[] = [];

    // Upload each file to Supabase Storage
    for (const file of Array.from(files)) {
      try {
        // Create a unique filename
        const fileName = `property-${Date.now()}-${file.name}`;

        // Create FormData for the server action
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);

        // Upload via Server Action (bypasses RLS)
        const result = await uploadImageAction(formData);

        if (!result.success) {
          throw new Error(result.message);
        }

        // Store the uploaded image info
        newUploadedImages.push({
          id: fileName,
          url: URL.createObjectURL(file), // For preview
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          variant: "destructive",
          title: "Upload Error",
          description: `Failed to upload image: ${file.name}`,
        });
      }
    }

    setUploadedImages(prev => [...prev, ...newUploadedImages]);
  };

  useEffect(() => {
    if (state.message?.includes('successfully')) {
      toast({
        title: "Success!",
        description: state.message,
      });
      router.push('/admin/properties');
    } else if (state.message?.includes('Error') || state.message?.includes('Failed')) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: state.message,
      });
    }
  }, [state, toast, router]);

  const isEditing = !!property;

  // Handle form submission with frontend validation
  const handleSubmit = (formData: FormData) => {
    // Add validation for at least one image uploaded
    if (uploadedImages.length === 0) {
      setValidationErrors({ imageIds: ['At least one image is required'] });
      return;
    }

    // Perform frontend validation
    const { isValid, errors } = validatePropertyForm(formData);
    setValidationErrors(errors);

    if (isValid) {
      // Add uploaded image IDs to form data
      const imageIds = uploadedImages.map(img => img.id).join(',');
      formData.set('imageIds', imageIds);

      // Call the server action
      return formAction(formData);
    }
  };

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={property?.id} />
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={property?.title} />
              {(state.errors?.title || validationErrors.title) && (
                <p className="text-sm text-destructive">
                  {state.errors?.title?.[0] || validationErrors.title?.[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={property?.description} />
              {(state.errors?.description || validationErrors.description) && (
                <p className="text-sm text-destructive">
                  {state.errors?.description?.[0] || validationErrors.description?.[0]}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select name="region" defaultValue={property?.region} onValueChange={setSelectedRegion}>
                  <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                  <SelectContent>{regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                </Select>
                {(state.errors?.region || validationErrors.region) && (
                  <p className="text-sm text-destructive">
                    {state.errors?.region?.[0] || validationErrors.region?.[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                {/* Changed from Input to Textarea as requested */}
                <Textarea id="location" name="location" defaultValue={property?.location} />
                {(state.errors?.location || validationErrors.location) && (
                  <p className="text-sm text-destructive">
                    {state.errors?.location?.[0] || validationErrors.location?.[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select name="type" defaultValue={property?.type}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                {(state.errors?.type || validationErrors.type) && (
                  <p className="text-sm text-destructive">
                    {state.errors?.type?.[0] || validationErrors.type?.[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" defaultValue={property?.price} />
                {(state.errors?.price || validationErrors.price) && (
                  <p className="text-sm text-destructive">
                    {state.errors?.price?.[0] || validationErrors.price?.[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Listing Status</Label>
                <Select name="status" defaultValue={property?.status} onValueChange={setSelectedStatus}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    {listingStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                {(state.errors?.status || validationErrors.status) && (
                  <p className="text-sm text-destructive">
                    {state.errors?.status?.[0] || validationErrors.status?.[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dubaiStatus">{selectedRegion} Status</Label>
                <Select name="dubaiStatus" defaultValue={property?.dubaiStatus || 'none'}>
                  <SelectTrigger><SelectValue placeholder={`Select ${selectedRegion} status`} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {dubaiStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {selectedRegion === 'Dubai' && (
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" defaultValue={property?.company || ''} />
                {(state.errors?.company || validationErrors.company) && (
                  <p className="text-sm text-destructive">
                    {state.errors?.company?.[0] || validationErrors.company?.[0]}
                  </p>
                )}
              </div>
            )}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" name="bedrooms" type="number" defaultValue={property?.bedrooms} />
                {(state.errors?.bedrooms || validationErrors.bedrooms) && (
                  <p className="text-sm text-destructive">
                    {state.errors?.bedrooms?.[0] || validationErrors.bedrooms?.[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" name="bathrooms" type="number" defaultValue={property?.bathrooms} />
                {(state.errors?.bathrooms || validationErrors.bathrooms) && (
                  <p className="text-sm text-destructive">
                    {state.errors?.bathrooms?.[0] || validationErrors.bathrooms?.[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area (sqft)</Label>
                {/* Changed to step="0.01" to allow decimal values */}
                <Input id="area" name="area" type="number" step="0.01" defaultValue={property?.area} />
                {(state.errors?.area || validationErrors.area) && (
                  <p className="text-sm text-destructive">
                    {state.errors?.area?.[0] || validationErrors.area?.[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Images</Label>
            {(state.errors?.imageIds || validationErrors.imageIds) && (
              <p className="text-sm text-destructive">
                {state.errors?.imageIds?.[0] || validationErrors.imageIds?.[0]}
              </p>
            )}

            {/* Image upload section */}
            <div className="mb-4">
              <Label htmlFor="imageUpload">Upload Images</Label>
              <Input
                id="imageUpload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1"
              />
            </div>

            <ScrollArea className="h-96 rounded-md border">
              <div className="p-4 grid grid-cols-2 gap-4">
                {/* Uploaded images - no selection option */}
                {uploadedImages.map((image) => (
                  <div key={image.id}>
                    <div className="relative aspect-video mb-2 rounded-md overflow-hidden">
                      <Image src={image.url} alt={`Uploaded image`} fill className="object-cover" />
                    </div>
                    <div className="text-sm font-medium leading-none text-center mt-1">
                      Uploaded Image
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <SubmitButton isEditing={isEditing} pending={pending} />
        </CardFooter>
      </Card>
    </form>
  );
}