import { FC } from 'react';
import { MembershipCta, MembershipDescription } from '@/components/membership';
import Head from 'next/head';

const Membership: FC = () => {
  return (
    <>
      <Head>
        <title>Roofstock onChain - Membership</title>
      </Head>
      <MembershipCta showLearnMoreButton={false} />
      <MembershipDescription />
    </>
  );
};

export default Membership;
