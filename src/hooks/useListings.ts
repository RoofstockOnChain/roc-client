import { Listing } from '@/models/Listing';
import { useEffect, useState } from 'react';

interface ListingsProps {
  market: string;
  feedback: string;
}

export const useListings = ({ market, feedback }: ListingsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [explanation, setExplanation] = useState<string>('');

  const getListings = async () => {
    setLoading(true);
    const searchParams = new URLSearchParams({
      market,
      feedback,
    });
    const response = await fetch(`/api/listings?${searchParams}`);
    const listingRecommendations = (await response.json()) as {
      listings: Listing[];
      explanation: string;
    };
    setListings(listingRecommendations.listings);
    setExplanation(listingRecommendations.explanation);
    setLoading(false);
  };

  useEffect(() => {
    getListings();
  }, [market]);

  return {
    loading,
    listings,
    explanation,
    refresh: getListings,
  };
};
