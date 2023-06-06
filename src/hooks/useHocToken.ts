import { properties } from '../data/properties';

export const useHocToken = () => {
  const getProperties = () => properties;
  const getProperty = (contractAddress: string, token: number) =>
    properties.filter(
      (x) => x.contractAddress === contractAddress && x.token === token
    )[0];

  return {
    getProperties,
    getProperty,
  };
};
