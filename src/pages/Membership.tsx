import { FC } from 'react';
import { MintMembershipTokenBanner } from '../components/MintMembershipTokenBanner';
import { useMembershipToken } from '../hooks/useMembershipToken';
import { Helmet } from 'react-helmet-async';

export const Membership: FC = () => {
  const { isMember } = useMembershipToken();

  return (
    <>
      <Helmet>
        <title>Roofstock onChain - Membership</title>
      </Helmet>
      {/*<MembershipJumbotron />*/}
      {/*<Features />*/}
      {/*<MembershipDescription />*/}
      {!isMember && <MintMembershipTokenBanner />}
    </>
  );
};
