import { NextApiRequest, NextApiResponse } from 'next';
import { getListings } from '@/services/ListingService';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    take,
    skip,
    market,
    bedrooms,
    bathrooms,
    desiredPrice,
  }: {
    take?: number;
    skip?: number;
    market?: string;
    bedrooms?: number;
    bathrooms?: number;
    desiredPrice?: number;
  } = request.query;

  const listings = await getListings(
    take,
    skip,
    market,
    bedrooms,
    bathrooms,
    desiredPrice
  );

  response.status(200).json(listings);
};

export default handler;
