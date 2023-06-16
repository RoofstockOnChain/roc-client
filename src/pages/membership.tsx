import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { MembershipCta, MembershipDescription } from '../components/membership';
import { Seo } from '../components/layout/Seo';

const MembershipPage: FC<PageProps> = () => {
  return (
    <>
      <MembershipCta showLearnMoreButton={false} />
      <MembershipDescription />
    </>
  );
};
export default MembershipPage;

export const Head: HeadFC = () => (
  <Seo title="Roofstock onChain - Membership" />
);
