import { Listing } from '@/models/Listing';
import { useEffect, useState } from 'react';

interface ListingsProps {
  market: string;
}

export const useListings = ({ market }: ListingsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listings, setListings] = useState<Listing[]>([]);

  const getListings = async () => {
    setLoading(true);
    const searchParams = new URLSearchParams({
      take: '12',
      skip: '0',
      market,
    });
    const response = await fetch(`/api/listings?${searchParams}`);
    const listings = (await response.json()) as Listing[];
    setListings(listings);
    setLoading(false);
  };

  useEffect(() => {
    getListings();
  }, [market]);

  return {
    loading,
    listings,
  };
};
