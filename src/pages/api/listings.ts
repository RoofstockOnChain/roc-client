import { NextApiRequest, NextApiResponse } from 'next';
import { getListings } from '@/services/ListingService';
import { getListingRecommendations } from '@/services/ListingRecommendationService';

export const config = {
  maxDuration: 30,
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    market,
  }: {
    market: string;
  } = JSON.parse(request.body);

  const listingRecommendations = await getListingRecommendations(market);

  const listings = await getListings(listingRecommendations.listingIds);

  response.status(200).json({
    listings,
    explanation: listingRecommendations.explanation,
    openAiRequestMessages: listingRecommendations.openAiRequestMessages,
    openAiResponse: listingRecommendations.openAiResponse,
  });
};

export default handler;
