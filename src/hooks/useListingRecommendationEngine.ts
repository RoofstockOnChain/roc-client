import { useEffect, useState } from 'react';
import { Listing } from '@/models/Listing';
import {
  addListingFeedbackForUser,
  clearListingFeedbackForUser,
  getListingFeedbackForUser,
  ListingFeedback,
} from '@/services/ListingFeedbackService';
import { getRecommendedMlsListingWithExplanation } from '@/services/RecommendationService';

export const useListingRecommendationEngine = () => {
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
      await getRecommendedMlsListingWithExplanation(listingFeedbackForUser);
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
  }, []);

  return {
    listing,
    getNextListing,
    explanation,
    clearListingRecommendations,
    loading,
  };
};
