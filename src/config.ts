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
};
