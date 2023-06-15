import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { RoofstockMembershipAbi } from '../abis/RoofstockMembershipAbi';
import { config } from '../config';

export const useMembershipToken = () => {
  const { address } = useAccount();
  const { writeAsync } = useContractWrite({
    address: config.roofstockMembershipContractAddress,
    abi: RoofstockMembershipAbi,
    functionName: 'mint',
  });
  const { data: balanceOf } = useContractRead({
    address: config.roofstockMembershipContractAddress,
    abi: RoofstockMembershipAbi,
    functionName: 'balanceOf',
    args: [address],
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
