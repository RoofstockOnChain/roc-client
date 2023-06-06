export const config: RocClientConfig = {
  verifiedSmartContract: process.env.REACT_APP_VERIFIED_SMART_CONTRACT!,
  marketplaceUrl: process.env.REACT_APP_MARKETPLACE_URL!,
  faqsUrl: process.env.REACT_APP_FAQS_URL!,
  howItWorksUrl: process.env.REACT_APP_HOW_IT_WORKS_URL!,
  learnUrl: process.env.REACT_APP_LEARN_URL!,
  rsOnChainTwitterUrl: process.env.REACT_APP_RS_ON_CHAIN_TWITTER_URL!,
};

type RocClientConfig = {
  verifiedSmartContract: string;
  marketplaceUrl: string;
  faqsUrl: string;
  howItWorksUrl: string;
  learnUrl: string;
  rsOnChainTwitterUrl: string;
};
