export const convertIpfsToHttps = (ipfs: string) => {
  if (!ipfs.includes('ipfs://')) {
    return ipfs;
  }
  return ipfs.replace('ipfs://', 'https://ipfs.io/ipfs/');
};
