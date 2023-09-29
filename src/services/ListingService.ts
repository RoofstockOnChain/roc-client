import { Listing } from '@/models/Listing';
import { listings } from '@/data/listings';

export const getAllListings = async (): Promise<Listing[]> => {
  return listings;
};

export const getListings = async (listingIds: string[]): Promise<Listing[]> => {
  return Promise.all(
    listingIds.map(async (listingId) => {
      return await getListing(listingId);
    })
  );
};

export const getListing = async (mlsListingId: string): Promise<Listing> => {
  return listings.find((x) => x.mlsListingId == mlsListingId)!;
};
