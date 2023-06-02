export const config: RocClientConfig = {
  verifiedSmartContract: process.env.REACT_APP_VERIFIED_SMART_CONTRACT!,
  marketplaceUrl: process.env.REACT_APP_MARKETPLACE_URL!,
};

type RocClientConfig = {
  verifiedSmartContract: string;
  marketplaceUrl: string;
};
