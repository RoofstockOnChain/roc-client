import { Listing } from '@/models/Listing';
import { useEffect, useState } from 'react';

interface ListingsProps {
  market: string;
  bedrooms: number;
  bathrooms: number;
  desiredPrice: number;
}

export const useListings = ({
  market,
  bedrooms,
  bathrooms,
  desiredPrice,
}: ListingsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listings, setListings] = useState<Listing[]>([]);

  const getListings = async () => {
    setLoading(true);
    const searchParams = new URLSearchParams({
      take: '6',
      skip: '0',
      market,
      bedrooms: bedrooms.toString(),
      bathrooms: bathrooms.toString(),
      desiredPrice: desiredPrice.toString(),
    });
    const response = await fetch(`/api/listings?${searchParams}`);
    const listings = (await response.json()) as Listing[];
    setListings(listings);
    setLoading(false);
  };

  useEffect(() => {
    getListings();
  }, [market, bedrooms, bathrooms, desiredPrice]);

  return {
    loading,
    listings,
  };
};
