import { Listing } from '@/models/Listing';
import { useEffect, useState } from 'react';
import { ChatMessage } from '@azure/openai';

interface ListingsProps {
  market: string;
}

export const useListings = ({ market }: ListingsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [explanation, setExplanation] = useState<string>('');

  const getListings = async () => {
    setLoading(true);
    const response = await fetch(`/api/listings`, {
      method: 'POST',
      body: JSON.stringify({
        market,
      }),
    });
    const listingRecommendations = (await response.json()) as {
      listings: Listing[];
      explanation: string;
      messages: ChatMessage[];
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
