import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai/index';
import { config } from '@/config';
import { listings } from '@/data/listings';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const openAi = new OpenAI({
    apiKey: config.openAiApiKey,
  });

  const listingFeedbackForUser =
    request.body.listingFeedbackForUser ?? ([] as ListingFeedback[]);
  const market = request.body.market;
  const desiredPrice = request.body.desiredPrice;
  const bedrooms = request.body.bedrooms;
  const bathrooms = request.body.bathrooms;
  const mlsListingIdsToExclude =
    request.body.mlsListingIdsToExclude ?? ([] as string[]);

  let initialUserInstruction = 'I am looking for an investment property.';
  if (market) {
    initialUserInstruction += ` Property should be in the ${market} market.`;
  }
  if (desiredPrice) {
    initialUserInstruction += ` Property should be in about $${desiredPrice}.`;
  }
  if (bedrooms) {
    initialUserInstruction += ` Property should have ${bedrooms} bedrooms.`;
  }
  if (bathrooms) {
    initialUserInstruction += ` Property should have ${bathrooms} bathrooms.`;
  }

  const params: OpenAI.Chat.CompletionCreateParams = {
    messages: [
      {
        role: 'system',
        content: JSON.stringify(listings.slice(0, 40)),
      },
      {
        role: 'system',
        content: `Recommend an investment property for the user. Format it as JSON with the following properties:
            - mlsListingId
            - explanation
          `,
      },
      {
        role: 'system',
        content: `Exclude properties with the following MLS Listing IDs: ${mlsListingIdsToExclude.join(
          ', '
        )}`,
      },
      {
        role: 'user',
        content: initialUserInstruction,
      },
    ],
    model: 'gpt-4',
  };

  listingFeedbackForUser.forEach((listingFeedback: ListingFeedback) => {
    params.messages.push({
      role: 'user',
      content: `Feedback for MLS Listing ID ${listingFeedback.mlsListingId}: ${listingFeedback.feedback}`,
    });
  });

  const completion = (await openAi.chat.completions.create(
    params
  )) as OpenAI.Chat.ChatCompletion;
  if (completion.choices.length > 0 && completion.choices[0].message.content) {
    const listingRecommendation = JSON.parse(
      completion.choices[0].message.content
    );
    const recommendedMlsListingId = listingRecommendation.mlsListingId;
    const recommendedMlsListing = getListingByMlsListingId(
      recommendedMlsListingId
    );

    response.status(200).json({
      listing: recommendedMlsListing,
      explanation: listingRecommendation.explanation,
    });
  }
};

const getListingByMlsListingId = (mlsListingId: string) => {
  return listings.find((x) => x.mlsListingId == mlsListingId);
};

export default handler;

type ListingFeedback = {
  mlsListingId: string;
  feedback: string;
};
