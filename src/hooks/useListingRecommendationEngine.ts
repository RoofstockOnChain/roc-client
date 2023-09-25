import { useEffect, useState } from 'react';
import { Listing } from '@/models/Listing';
import {
  addListingFeedbackForUser,
  clearListingFeedbackForUser,
  getListingFeedbackForUser,
  ListingFeedback,
} from '@/services/ListingFeedbackService';
import { getRecommendedMlsListingWithExplanation } from '@/services/RecommendationService';

interface ListingRecommendationEngineProps {
  market: string;
  tone: string;
}

export const useListingRecommendationEngine = ({
  market,
  tone,
}: ListingRecommendationEngineProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [listing, setListing] = useState<Listing>();
  const [explanation, setExplanation] = useState<string>(
    'This is a random selection based on your basic filters. As we learn more about what you are looking for, recommendations will improve.'
  );

  const getNextListing = async (listingFeedback?: ListingFeedback) => {
    setLoading(true);
    if (listingFeedback) {
      addListingFeedbackForUser(listingFeedback);
    }
    const listingFeedbackForUser = getListingFeedbackForUser();
    const recommendedMlsListingWithExplanation =
      await getRecommendedMlsListingWithExplanation(
        market,
        listingFeedbackForUser,
        tone
      );
    setListing(recommendedMlsListingWithExplanation.listing);
    setExplanation(recommendedMlsListingWithExplanation.explanation);
    setLoading(false);
  };

  const clearListingRecommendations = async () => {
    clearListingFeedbackForUser();
    await getNextListing();
  };

  useEffect(() => {
    getNextListing();
  }, [market, tone]);

  return {
    listing,
    getNextListing,
    explanation,
    clearListingRecommendations,
    loading,
  };
};
