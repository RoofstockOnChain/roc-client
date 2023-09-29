import { NextApiRequest, NextApiResponse } from 'next';
import { getListings } from '@/services/ListingService';
import { getListingRecommendations } from '@/services/ListingRecommendationService';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    market,
    criteria,
  }: {
    market?: string;
    criteria?: string;
  } = request.query;

  const listingRecommendations = await getListingRecommendations(
    market,
    criteria
  );

  const listings = await getListings(listingRecommendations.listingIds);

  response.status(200).json({
    listings,
    explanation: listingRecommendations.explanation,
    openAiRequestMessages: listingRecommendations.openAiRequestMessages,
    openAiResponse: listingRecommendations.openAiResponse,
  });
};

export default handler;
