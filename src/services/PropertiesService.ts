import { Property } from '@/models/Property';
import { Alchemy, Network } from 'alchemy-sdk';
import { config } from '@/config';
import { convertIpfsToHttps } from '@/helpers/IpfsHelper';
import { Image } from '@/models/Image';

const getAlchemy = () => {
  return new Alchemy({
    apiKey: config.alchemyApiKey,
    network: Network.ETH_MAINNET,
  });
};

export const getProperties = async (): Promise<Property[]> => {
  const response = await getAlchemy().nft.getNftsForContract(
    config.homeOnChainContractAddress
  );

  return response.nfts.map(
    (nft) =>
      ({
        contractAddress: nft.contract.address,
        token: nft.tokenId,
        name: nft.rawMetadata?.name,
        imageUrl: nft.media.length > 0 ? nft.media[0].gateway : undefined,
      } as Property)
  );
};

export const getProperty = async (
  contractAddress: string,
  token: string
): Promise<Property> => {
  const response = await getAlchemy().nft.getNftMetadata(
    contractAddress,
    token
  );

  return {
    contractAddress: response.contract.address,
    token: response?.tokenId,
    name: response.rawMetadata?.name,
    description: response.rawMetadata?.description,
    imageUrl: response.media.length > 0 ? response.media[0].gateway : undefined,
    attributes: response.rawMetadata?.attributes ?? [],
    images:
      response.rawMetadata?.images.map(
        (image: any) =>
          ({
            imageUrl: convertIpfsToHttps(image.image_url),
            description: image.description,
          } as Image)
      ) ?? [],
    documents:
      response.rawMetadata?.documents.map((document: any) => ({
        category: document.category,
        name: document.name,
        documentType: document.document_type,
        documentUrl: convertIpfsToHttps(document.document_url),
      })) ?? [],
    videoWalkthroughUrl: response.rawMetadata?.video_walkthrough_url ?? null,
    threeDTourUrl: response.rawMetadata?.three_d_tour_url ?? null,
  } as Property;
};
