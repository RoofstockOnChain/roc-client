import { NextApiRequest, NextApiResponse } from 'next';
import { getListings } from '@/services/ListingService';
import { getListingRecommendations } from '@/services/ListingRecommendationService';
import { ChatMessage } from '@azure/openai';

export const config = {
  maxDuration: 30,
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    messages = [],
  }: {
    messages: ChatMessage[];
  } = JSON.parse(request.body);

  const listingRecommendations = await getListingRecommendations(messages);

  const listings = await getListings(listingRecommendations.listingIds);

  response.status(200).json({
    listings,
    openAiResponse: listingRecommendations.openAiResponse,
  });
};

export default handler;
