export type Listing = {
  mlsListingId: number;
  address1: string;
  city: string;
  state: string;
  zip: string;
  mainImageUrl: string;
  listingDescription: string;
  bedrooms: number;
  bathrooms: number;
  homeSizeSquareFoot: number;
  lotSizeSquareFoot: number;
  propertyType: 'House' | 'Apartment';
  yearBuilt: number;
  listingPrice: number;
};