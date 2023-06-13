import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { MembershipCta, MembershipDescription } from '../components/membership';

export const Membership: FC = () => {
  return (
    <>
      <Helmet>
        <title>Roofstock onChain - Membership</title>
      </Helmet>
      <MembershipCta showLearnMoreButton={false} />
      <MembershipDescription />
    </>
  );
};
