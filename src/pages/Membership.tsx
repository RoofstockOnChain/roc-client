import { FC } from 'react';
import { useMembershipToken } from '../hooks/useMembershipToken';
import { Helmet } from 'react-helmet-async';
import {
  MembershipCta,
  MembershipDescription,
  MintMembershipTokenBanner,
} from '../components/membership';

export const Membership: FC = () => {
  const { isMember } = useMembershipToken();
  return (
    <>
      <Helmet>
        <title>Roofstock onChain - Membership</title>
      </Helmet>
      <MembershipCta showLearnMoreButton={false} />
      <MembershipDescription />
      {!isMember && <MintMembershipTokenBanner />}
    </>
  );
};
