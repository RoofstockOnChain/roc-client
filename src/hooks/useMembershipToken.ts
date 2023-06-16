import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { roofstockMembershipAbi } from '../abis/RoofstockMembershipAbi';
import { config } from '../config';

export const useMembershipToken = () => {
  const { address } = useAccount();
  const { writeAsync } = useContractWrite({
    address: config.roofstockMembershipContractAddress,
    abi: roofstockMembershipAbi,
    functionName: 'mint',
  });
  const { data: balanceOf } = useContractRead({
    address: config.roofstockMembershipContractAddress,
    abi: roofstockMembershipAbi,
    functionName: 'balanceOf',
    args: [address],
    enabled: Boolean(address),
  });

  const mint = async () => {
    try {
      await writeAsync();
    } catch (ex) {
      console.error(ex);
    }
  };

  return {
    mint,
    isMember: (balanceOf as number) > 0,
  };
};
