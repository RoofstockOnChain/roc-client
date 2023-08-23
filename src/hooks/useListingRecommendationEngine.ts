import { useEffect, useState } from 'react';
import { Listing } from '@/models/Listing';

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

const listingFeedbackLocalStorageKey = 'listing-feedback';

const addListingFeedbackForUser = (listingFeedback: ListingFeedback) => {
  if (
    listingFeedback.pros.trim() !== '' ||
    listingFeedback.cons.trim() !== ''
  ) {
    const listingFeedbackForUser = getListingFeedbackForUser();
    listingFeedbackForUser.push(listingFeedback);
    localStorage.setItem(
      listingFeedbackLocalStorageKey,
      JSON.stringify(listingFeedbackForUser)
    );
  }
};

const getListingFeedbackForUser = (): ListingFeedback[] => {
  const listingFeedbackLocalStorage = localStorage.getItem(
    listingFeedbackLocalStorageKey
  );
  return listingFeedbackLocalStorage
    ? JSON.parse(listingFeedbackLocalStorage)
    : [];
};

const clearListingFeedbackForUser = () => {
  localStorage.removeItem(listingFeedbackLocalStorageKey);
};

const getRecommendedMlsListingWithExplanation = async (
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

type ListingFeedback = {
  mlsListingId: string;
  pros: string;
  cons: string;
};

type ListingWithExplanation = {
  listing: Listing;
  explanation: string;
};
