export const config: RocClientConfig = {
  verifiedSmartContract: process.env.REACT_APP_VERIFIED_SMART_CONTRACT!,
};

type RocClientConfig = {
  verifiedSmartContract: string;
};
