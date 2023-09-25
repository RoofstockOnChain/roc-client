import { Listing } from '@/models/Listing';
import { listings } from '@/data/listings';

export const getListings = async (
  take?: number,
  skip?: number,
  market?: string,
  bedrooms?: number,
  bathrooms?: number,
  desiredPrice?: number
): Promise<Listing[]> => {
  const filteredListings = listings
    .filter((x) => x.bedrooms == bedrooms)
    .filter((x) => x.bathrooms == bathrooms);

  if (take && skip) {
    return filteredListings.slice(skip, take);
  } else {
    return filteredListings;
  }
};

export const getListing = async (mlsListingId: string): Promise<Listing> => {
  return listings.find((x) => x.mlsListingId == mlsListingId)!;
};
