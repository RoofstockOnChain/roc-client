import { ListingFeedback } from '@/services/ListingFeedbackService';
import { Listing } from '@/models/Listing';

export const getRecommendedMlsListingWithExplanation = async (
  listingFeedbackForUser: ListingFeedback[]
): Promise<ListingWithExplanation> => {
  const response = await fetch('/api/recommend', {
    method: 'POST',
    body: JSON.stringify({
      market: 'Columbia, SC',
      desiredPrice: 250000,
      bedrooms: '3',
      bathrooms: '2',
      listingFeedbackForUser: listingFeedbackForUser,
    }),
  });
  return (await response.json()) as ListingWithExplanation;
};

type ListingWithExplanation = {
  listing: Listing;
  explanation: string;
};
