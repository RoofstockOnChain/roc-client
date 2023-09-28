export type Listing = {
  mlsListingId: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
  mainImageUrl: string;
  listingDescription?: string;
  bedrooms: number | null;
  bathrooms: number | null;
  homeSizeSquareFoot?: number | null;
  lotSizeSquareFoot?: number | null;
  propertyType?: 'House' | 'Apartment';
  yearBuilt: number;
  listingPrice: number;
  latitude?: number | null;
  longitude?: number | null;
  market: string;
};
