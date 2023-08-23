import { ListingFeedback } from '@/services/ListingFeedbackService';
import { Listing } from '@/models/Listing';

export const getRecommendedMlsListingWithExplanation = async (
  market: string,
  bedrooms: number,
  bathrooms: number,
  desiredPrice: number,
  listingFeedbackForUser: ListingFeedback[]
): Promise<ListingWithExplanation> => {
  const response = await fetch('/api/recommend', {
    method: 'POST',
    body: JSON.stringify({
      market,
      desiredPrice,
      bedrooms,
      bathrooms,
      listingFeedbackForUser: listingFeedbackForUser,
    }),
  });
  return (await response.json()) as ListingWithExplanation;
};

type ListingWithExplanation = {
  listing: Listing;
  explanation: string;
};
