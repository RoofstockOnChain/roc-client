import { NextApiRequest, NextApiResponse } from 'next';
import { SearchClient } from '@azure/search-documents';
import { AzureKeyCredential } from '@azure/openai';
import { config as rocConfig } from '@/config';
import { getAllListings } from '@/services/ListingService';

export const config = {
  maxDuration: 300,
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const searchClient = new SearchClient(
      rocConfig.azureSearchServiceEndpoint,
      rocConfig.azureSearchServiceIndex,
      new AzureKeyCredential(rocConfig.azureSearchServiceApiKey)
    );
    const listings = await getAllListings();
    const searchableListings = listings.map((x) => ({
      id: x.mlsListingId,
      address1: x.address1,
      city: x.city,
      state: x.state,
      zip: x.zip,
      mainImageUrl: x.mainImageUrl,
      bedrooms: x.bedrooms,
      bathrooms: x.bathrooms,
      homeSizeSquareFoot: x.homeSizeSquareFoot,
      lotSizeSquareFoot: x.lotSizeSquareFoot,
      yearBuilt: x.yearBuilt,
      listingPrice: x.listingPrice,
      market: x.market,
      listingDescription: `Id: ${x.mlsListingId}. This property in the ${x.market} market and the address is ${x.address1}. It is listed for ${x.listingPrice}. This property has ${x.bedrooms} bedrooms, ${x.bathrooms} bathrooms, and was built in ${x.yearBuilt}. The square footage of the home is ${x.homeSizeSquareFoot}.`,
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
