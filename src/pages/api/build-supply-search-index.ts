import { NextApiRequest, NextApiResponse } from 'next';
import { SearchClient } from '@azure/search-documents';
import { AzureKeyCredential } from '@azure/openai';
import { config } from '@/config';
import { getListings } from '@/services/ListingService';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const searchClient = new SearchClient(
      config.azureSearchServiceEndpoint,
      config.azureSearchServiceIndex,
      new AzureKeyCredential(config.azureSearchServiceApiKey)
    );
    const listings = await getListings();
    const searchableListings = listings.map((x) => ({
      id: x.mlsListingId,
      listingDescription: `Id: ${x.mlsListingId}. This property in the Columbia, SC market and the address is ${x.address1}. It is listed for ${x.listingPrice}. This property has ${x.bedrooms} bedrooms, ${x.bathrooms} bathrooms, and was built in ${x.yearBuilt}`,
    }));
    await searchClient.uploadDocuments(searchableListings);
    response.status(200).json({
      success: true,
    });
  } catch (ex) {
    response.status(500).json({
      error: ex,
    });
  }
};

export default handler;
