import { ListingFeedback } from '@/services/ListingFeedbackService';
import { Listing } from '@/models/Listing';

export const getRecommendedMlsListingWithExplanation = async (
  market: string,
  listingFeedbackForUser: ListingFeedback[],
  tone: string
): Promise<ListingWithExplanation> => {
  const response = await fetch('/api/recommend', {
    method: 'POST',
    body: JSON.stringify({
      market,
      listingFeedbackForUser: listingFeedbackForUser,
      mlsListingIdsToExclude: listingFeedbackForUser.map((x) => x.mlsListingId),
      tone,
    }),
  });
  return (await response.json()) as ListingWithExplanation;
};

type ListingWithExplanation = {
  listing: Listing;
  explanation: string;
};
