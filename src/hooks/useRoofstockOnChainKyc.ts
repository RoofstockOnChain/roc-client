export const useRoofstockOnChainKyc = () => {
  return {
    isAllowed: false,
    isIdentityVerified: false,
    isDocumentsAcknowledged: false,
    acknowledgeDocuments: async () => {},
    refresh: async () => {},
  };
};
