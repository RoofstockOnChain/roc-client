import { NextApiRequest, NextApiResponse } from 'next';
import { getListings } from '@/services/ListingService';
import { getListingRecommendations } from '@/services/ListingRecommendationService';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    market,
    feedback,
  }: {
    market?: string;
    feedback?: string;
  } = request.query;

  const listingRecommendations = await getListingRecommendations(
    market,
    feedback
  );

  const listings = await getListings(listingRecommendations.listingIds);

  response.status(200).json({
    listings,
    explanation: listingRecommendations.explanation,
  });
};

export default handler;
