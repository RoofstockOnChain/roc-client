import { FC } from 'react';
import { MintMembershipTokenBanner } from '../../components/MintMembershipTokenBanner';
import { useMembershipToken } from '../../hooks/useMembershipToken';

export const Mint: FC = () => {
  const { isMember } = useMembershipToken();

  return (
    <>
      {/*<MembershipJumbotron />*/}
      {/*<Features />*/}
      {/*<MembershipDescription />*/}
      {!isMember && <MintMembershipTokenBanner />}
    </>
  );
};
