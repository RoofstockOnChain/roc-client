import { FC } from 'react';
import { MintMembershipTokenBanner } from '../components/membership/MintMembershipTokenBanner';
import { useMembershipToken } from '../hooks/useMembershipToken';
import { Helmet } from 'react-helmet-async';
import { MembershipCta } from '../components/membership/MembershipCta';

export const Membership: FC = () => {
  const { isMember } = useMembershipToken();

  return (
    <>
      <Helmet>
        <title>Roofstock onChain - Membership</title>
      </Helmet>
      <MembershipCta showLearnMoreButton={false} />
      {/*<Features />*/}
      {/*<MembershipDescription />*/}
      {!isMember && <MintMembershipTokenBanner />}
    </>
  );
};
