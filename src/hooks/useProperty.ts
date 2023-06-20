import { properties } from '@/data/properties';

export const useProperty = (contractAddress: string, token: string) => {
  const property = properties.filter(
    (x) => x.contractAddress === contractAddress && x.token === token
  )[0];

  return {
    property,
    isLoading: false,
  };
};
