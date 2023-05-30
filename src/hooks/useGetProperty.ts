import { properties } from '../data/properties';

export const useGetProperty = (contractAddress: string, token: number) => {
  const property = properties.filter(
    (x) => x.contractAddress === contractAddress && x.token === token
  )[0];
  return {
    property,
  };
};
