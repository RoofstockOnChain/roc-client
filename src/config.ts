export const config: RocClientConfig = {
  homeOnChainContractAddress:
    process.env.NEXT_PUBLIC_HOME_ON_CHAIN_CONTRACT_ADDRESS!,
  marketplaceUrl: process.env.NEXT_PUBLIC_MARKETPLACE_URL!,
  faqsUrl: process.env.NEXT_PUBLIC_FAQS_URL!,
  howItWorksUrl: process.env.NEXT_PUBLIC_HOW_IT_WORKS_URL!,
  learnUrl: process.env.NEXT_PUBLIC_LEARN_URL!,
  rsOnChainTwitterUrl: process.env.NEXT_PUBLIC_RS_ON_CHAIN_TWITTER_URL!,
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  alchemyApiKey: process.env.ALCHEMY_API_KEY!,
  documents: [
    {
      name: 'Purchase and Sale Agreement',
      url: 'https://ipfs.io/ipfs/QmUWMB55arnbjQvmdNFcdVEwm3VfAi8XFnNMzKmYqVAFcW/hoc-documents/forms/purchase-and-sale-agreement.pdf',
    },
    {
      name: 'LLC Agreement',
      url: 'https://ipfs.io/ipfs/QmUWMB55arnbjQvmdNFcdVEwm3VfAi8XFnNMzKmYqVAFcW/hoc-documents/forms/llc-agreement.pdf',
    },
    {
      name: 'LLC Admin Agreement',
      url: 'https://ipfs.io/ipfs/QmUWMB55arnbjQvmdNFcdVEwm3VfAi8XFnNMzKmYqVAFcW/hoc-documents/forms/llc-admin-agreement.pdf',
    },
    {
      name: 'Token Admin Agreement',
      url: 'https://ipfs.io/ipfs/QmUWMB55arnbjQvmdNFcdVEwm3VfAi8XFnNMzKmYqVAFcW/hoc-documents/forms/token-admin-agreement.pdf',
    },
  ],
  quadrataVerifyIdentityLink:
    process.env.NEXT_PUBLIC_QUADRATA_VERIFY_IDENTITY_LINK!,
  roofstockOnChainKycContractAddress: process.env
    .NEXT_PUBLIC_ROOFSTOCK_ON_CHAIN_KYC_CONTRACT_ADDRESS! as `0x${string}`,
  azureOpenAiEndpoint: process.env.AZURE_OPEN_AI_ENDPOINT!,
  azureOpenAiApiKey: process.env.AZURE_OPEN_AI_API_KEY!,
  azureOpenAiDeploymentId: process.env.AZURE_OPEN_AI_DEPLOYMENT_ID!,
  azureSearchServiceEndpoint: process.env.AZURE_SEARCH_SERVICE_ENDPOINT!,
  azureSearchServiceApiKey: process.env.AZURE_SEARCH_SERVICE_API_KEY!,
  azureSearchServiceIndex: process.env.AZURE_SEARCH_SERVICE_INDEX!,
  showSearchLink: process.env.NEXT_PUBLIC_SHOW_SEARCH_LINK
    ? process.env.NEXT_PUBLIC_SHOW_SEARCH_LINK === 'true'
    : false,
  mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!,
};

type RocClientConfig = {
  homeOnChainContractAddress: string;
  marketplaceUrl: string;
  faqsUrl: string;
  howItWorksUrl: string;
  learnUrl: string;
  rsOnChainTwitterUrl: string;
  walletConnectProjectId: string;
  alchemyApiKey: string;
  documents: Document[];
  quadrataVerifyIdentityLink: string;
  roofstockOnChainKycContractAddress: `0x${string}`;
  azureOpenAiEndpoint: string;
  azureOpenAiApiKey: string;
  azureOpenAiDeploymentId: string;
  azureSearchServiceEndpoint: string;
  azureSearchServiceApiKey: string;
  azureSearchServiceIndex: string;
  showSearchLink: boolean;
  mapboxAccessToken: string;
};

export type Document = {
  name: string;
  url: string;
};
