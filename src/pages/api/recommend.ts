import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai/index';
import { config } from '@/config';
import { listings } from '@/data/listings';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const openAi = new OpenAI({
    apiKey: config.openAiApiKey,
  });

  const requestBody = JSON.parse(request.body);
  const listingFeedbackForUser = (requestBody.listingFeedbackForUser ??
    []) as ListingFeedback[];
  const market = requestBody.market;
  const desiredPrice = requestBody.desiredPrice;
  const bedrooms = requestBody.bedrooms;
  const bathrooms = requestBody.bathrooms;
  const mlsListingIdsToExclude = (requestBody.mlsListingIdsToExclude ??
    []) as string[];
  const tone = (requestBody.tone ?? 'professional') as string;

  const getListingData = () => JSON.stringify(listings.slice(0, 40));

  let systemPrompt = getListingData();
  systemPrompt += "Primarily consider the user's feedback in your response.";
  systemPrompt += `Use a ${tone} tone.`;

  const params: OpenAI.Chat.CompletionCreateParams = {
    messages: [
      {
        role: 'system',
        content: systemPrompt,
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

  params.messages.push({
    role: 'user',
    content: `Exclude properties with the following MLS Listing IDs: ${mlsListingIdsToExclude.join(
      ', '
    )}`,
  });

  let initialUserInstruction = 'Recommend a single investment property for me.';
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
  params.messages.push({
    role: 'user',
    content: initialUserInstruction,
  });

  params.messages.push({
    role: 'user',
    content:
      'The response should be only a JSON object in this format: { mlsListingId: string, explanation: string }',
  });

  const completion = (await openAi.chat.completions.create(
    params
  )) as OpenAI.Chat.ChatCompletion;
  if (
    completion?.choices.length > 0 &&
    completion?.choices[0].message?.content
  ) {
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
