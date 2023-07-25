export const config: RocClientConfig = {
  homeOnChainContractAddress:
    process.env.NEXT_PUBLIC_HOME_ON_CHAIN_CONTRACT_ADDRESS!,
  marketplaceUrl: process.env.NEXT_PUBLIC_MARKETPLACE_URL!,
  faqsUrl: process.env.NEXT_PUBLIC_FAQS_URL!,
  howItWorksUrl: process.env.NEXT_PUBLIC_HOW_IT_WORKS_URL!,
  learnUrl: process.env.NEXT_PUBLIC_LEARN_URL!,
  rsOnChainTwitterUrl: process.env.NEXT_PUBLIC_RS_ON_CHAIN_TWITTER_URL!,
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  roofstockMembershipContractAddress: process.env
    .NEXT_PUBLIC_ROOFSTOCK_MEMBERSHIP_CONTRACT_ADDRESS! as `0x${string}`,
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
  quadrataVerifyIdentityLink: 'https://www.google.com', // TODO: Update this with the actual link
};

type RocClientConfig = {
  homeOnChainContractAddress: string;
  marketplaceUrl: string;
  faqsUrl: string;
  howItWorksUrl: string;
  learnUrl: string;
  rsOnChainTwitterUrl: string;
  walletConnectProjectId: string;
  roofstockMembershipContractAddress: `0x${string}`;
  alchemyApiKey: string;
  documents: Document[];
  quadrataVerifyIdentityLink: string;
};

export type Document = {
  name: string;
  url: string;
};
