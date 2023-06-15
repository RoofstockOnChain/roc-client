export const config: RocClientConfig = {
  verifiedSmartContract: process.env.REACT_APP_VERIFIED_SMART_CONTRACT!,
  marketplaceUrl: process.env.REACT_APP_MARKETPLACE_URL!,
  faqsUrl: process.env.REACT_APP_FAQS_URL!,
  howItWorksUrl: process.env.REACT_APP_HOW_IT_WORKS_URL!,
  learnUrl: process.env.REACT_APP_LEARN_URL!,
  rsOnChainTwitterUrl: process.env.REACT_APP_RS_ON_CHAIN_TWITTER_URL!,
  walletConnectProjectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID!,
  roofstockMembershipContractAddress: process.env
    .REACT_APP_ROOFSTOCK_MEMBERSHIP_CONTRACT_ADDRESS! as `0x${string}`,
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
