import { Listing } from '@/models/Listing';
import { listings } from '@/data/listings';

export const getListings = async (
  take?: number,
  skip?: number,
  market?: string
): Promise<Listing[]> => {
  const filteredListings = listings.filter((x) => x.market == market);

  if (take && skip) {
    return filteredListings.slice(skip, take);
  } else {
    return filteredListings;
  }
};

export const getListing = async (mlsListingId: string): Promise<Listing> => {
  return listings.find((x) => x.mlsListingId == mlsListingId)!;
};
