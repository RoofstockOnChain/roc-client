import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import { MembershipCta, MembershipDescription } from '../components/membership';
import { Seo } from '../components/layout/Seo';

const MembershipPage: FC<PageProps> = () => {
  return (
    <Layout>
      <MembershipCta showLearnMoreButton={false} />
      <MembershipDescription />
    </Layout>
  );
};
export default MembershipPage;

export const Head: HeadFC = () => (
  <Seo title="Roofstock onChain - Membership" />
);
