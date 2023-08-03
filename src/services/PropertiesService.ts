import { Property } from '@/models/Property';
import { Alchemy, Network, Nft, OwnedNft } from 'alchemy-sdk';
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

  return response.nfts.map(nftToProperty);
};

export const getProperty = async (
  contractAddress: string,
  token: string
): Promise<Property> => {
  const nft = await getAlchemy().nft.getNftMetadata(contractAddress, token);

  return nftToProperty(nft);
};

export const getMyProperties = async (
  walletAddress: `0x${string}` | undefined
): Promise<Property[]> => {
  if (!walletAddress) {
    return [];
  }

  const response = await getAlchemy().nft.getNftsForOwner(walletAddress, {
    contractAddresses: [config.homeOnChainContractAddress],
  });

  return response.ownedNfts.map(nftToProperty);
};

const nftToProperty = (nft: Nft | OwnedNft): Property => {
  return {
    contractAddress: nft.contract.address,
    token: nft?.tokenId,
    name: nft.rawMetadata?.name,
    description: nft.rawMetadata?.description,
    imageUrl: nft.media.length > 0 ? nft.media[0].gateway : undefined,
    attributes: nft.rawMetadata?.attributes ?? [],
    images:
      nft.rawMetadata?.images?.map(
        (image: any) =>
          ({
            imageUrl: convertIpfsToHttps(image.image_url),
            description: image.description,
          } as Image)
      ) ?? [],
    documents:
      nft.rawMetadata?.documents?.map((document: any) => ({
        category: document.category,
        name: document.name,
        documentType: document.document_type,
        documentUrl: convertIpfsToHttps(document.document_url),
      })) ?? [],
    videoWalkthroughUrl: nft.rawMetadata?.video_walkthrough_url ?? null,
    threeDTourUrl: nft.rawMetadata?.three_d_tour_url ?? null,
  } as Property;
};
