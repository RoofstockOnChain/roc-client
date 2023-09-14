import { Listing } from '@/models/Listing';
import { listings } from '@/data/listings';

export const getListings = async (): Promise<Listing[]> => {
  return listings;
};

export const getListing = async (mlsListingId: string): Promise<Listing> => {
  return listings.find((x) => x.mlsListingId == mlsListingId)!;
};
