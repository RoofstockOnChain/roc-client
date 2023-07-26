import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { roofstockOnChainKycAbi } from '../abis/RoofstockOnChainKycAbi';
import { config } from '@/config';

export const useRoofstockOnChainKyc = () => {
  const { address } = useAccount();
  const { data: isAllowed, refetch: isAllowedRefetch } = useContractRead({
    address: config.roofstockOnChainKycContractAddress,
    abi: roofstockOnChainKycAbi,
    functionName: 'isAllowed',
    args: [address],
    enabled: Boolean(address),
  });
  const { data: isIdentityVerified, refetch: isIdentityVerifiedRefetch } =
    useContractRead({
      address: config.roofstockOnChainKycContractAddress,
      abi: roofstockOnChainKycAbi,
      functionName: 'isIdentityVerified',
      args: [address],
      enabled: Boolean(address),
    });
  const {
    data: isDocumentsAcknowledged,
    refetch: isDocumentsAcknowledgedRefetch,
  } = useContractRead({
    address: config.roofstockOnChainKycContractAddress,
    abi: roofstockOnChainKycAbi,
    functionName: 'hasAcknowlegedDocuments',
    args: [address],
    enabled: Boolean(address),
  });
  const { writeAsync } = useContractWrite({
    address: config.roofstockOnChainKycContractAddress,
    abi: roofstockOnChainKycAbi,
    functionName: 'acknowledgeDocuments',
  });

  return {
    isAllowed,
    isIdentityVerified,
    isDocumentsAcknowledged,
    acknowledgeDocuments: async () => {
      try {
        await writeAsync();
      } catch (ex) {
        console.error(ex);
      }
    },
    refresh: async () => {
      await isAllowedRefetch();
      await isIdentityVerifiedRefetch();
      await isDocumentsAcknowledgedRefetch();
    },
  };
};
