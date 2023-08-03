import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { getMyProperties } from '@/services/PropertiesService';
import { Property } from '@/models/Property';

export const useHomesOnChainToken = () => {
  const [myPropertiesLoading, setMyPropertiesLoading] =
    useState<boolean>(false);
  const [myProperties, setMyProperties] = useState<Property[]>();
  const { address } = useAccount();

  const updateMyProperties = async () => {
    setMyPropertiesLoading(true);
    const myProperties = await getMyProperties(address);
    setMyProperties(myProperties);
    setMyPropertiesLoading(false);
  };

  useEffect(() => {
    updateMyProperties();
  }, [address]);

  return {
    myProperties,
    myPropertiesLoading,
    myPropertiesRefresh: updateMyProperties,
  };
};
