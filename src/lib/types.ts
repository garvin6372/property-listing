import type { PlaceHolderImages } from "./placeholder-images";

export type Region = "Dubai" | "London";
export type PropertyType = string; // Changed from fixed enum to string for dynamic types
export type ListingStatus = string; // Changed from fixed enum to string for dynamic statuses
export type DubaiStatus = "Ready" | "Off-plan";

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  region: Region;
  type: PropertyType;
  status: ListingStatus;
  dubaiStatus?: DubaiStatus;
  imageIds: string[];
  bedrooms: number;
  bathrooms: number;
  area: number; // in sqft
  createdAt?: string;
};

export type PropertyWithImages = Omit<Property, 'imageIds'> & {
  images: (typeof PlaceHolderImages)[number][];
};


export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string;
  submittedAt: Date;
};

export type Valuation = {
  id:string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: Date;
};