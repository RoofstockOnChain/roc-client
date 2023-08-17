import { useEffect, useState } from 'react';
import { Listing } from '@/models/Listing';
import { listings } from '@/data/listings';

export const useListingRecommendationEngine = () => {
  const [listing, setListing] = useState<Listing>();

  const getRandomListing = (): Listing => {
    const randomListingIndex = Math.floor(Math.random() * listings.length);
    return listings[randomListingIndex];
  };

  const getNextListing = () => {
    // TODO: This should not be random, the recommendation should be based on the AI algorithm
    const randomListing = getRandomListing();
    setListing(randomListing);
  };

  useEffect(() => {
    // TODO: If some data is stored, load data based on that data
    // On initial load, give a random listing
    const randomListing = getRandomListing();
    setListing(randomListing);
  }, []);

  return {
    listing,
    getNextListing,
  };
};
