export const useMembershipToken = () => {
  const mint = () => {};
  const isMember = false;
  const isIdentityVerified = false;
  const isDocumentsDownloaded = false;

  return {
    mint,
    isMember,
    isIdentityVerified,
    isDocumentsDownloaded,
    isBuyerVerified: isMember && isIdentityVerified && isDocumentsDownloaded,
  };
};
