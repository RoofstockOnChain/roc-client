export const config: RocClientConfig = {
  verifiedSmartContract: process.env.GATSBY_VERIFIED_SMART_CONTRACT!,
  marketplaceUrl: process.env.GATSBY_MARKETPLACE_URL!,
  faqsUrl: process.env.GATSBY_FAQS_URL!,
  howItWorksUrl: process.env.GATSBY_HOW_IT_WORKS_URL!,
  learnUrl: process.env.GATSBY_LEARN_URL!,
  rsOnChainTwitterUrl: process.env.GATSBY_RS_ON_CHAIN_TWITTER_URL!,
  walletConnectProjectId: process.env.GATSBY_WALLET_CONNECT_PROJECT_ID!,
  roofstockMembershipContractAddress: process.env
    .GATSBY_ROOFSTOCK_MEMBERSHIP_CONTRACT_ADDRESS! as `0x${string}`,
};

type RocClientConfig = {
  verifiedSmartContract: string;
  marketplaceUrl: string;
  faqsUrl: string;
  howItWorksUrl: string;
  learnUrl: string;
  rsOnChainTwitterUrl: string;
  walletConnectProjectId: string;
  roofstockMembershipContractAddress: `0x${string}`;
};
