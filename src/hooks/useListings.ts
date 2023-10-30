import { Listing } from '@/models/Listing';
import { useEffect, useState } from 'react';
import { ChatMessage } from '@azure/openai';

interface ListingsProps {
  market: string;
  messages: ChatMessage[];
}

export const useListings = ({ market, messages }: ListingsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listings, setListings] = useState<Listing[]>([]);

  const getListings = async () => {
    setLoading(true);
    const response = await fetch(`/api/listings`, {
      method: 'POST',
      body: JSON.stringify({
        market,
        messages,
      }),
    });
    const listingRecommendations = (await response.json()) as {
      listings: Listing[];
    };
    setListings(listingRecommendations.listings);
    setLoading(false);
  };

  useEffect(() => {
    getListings();
  }, [market, messages]);

  return {
    loading,
    listings,
    refresh: getListings,
  };
};
