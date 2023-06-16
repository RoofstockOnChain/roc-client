import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import {
  Faqs,
  FeaturedTransaction,
  Features,
  FeaturesAlt,
  GradientDivider,
  Highlight,
  Jumbotron,
  MembershipCta,
  Partners,
} from '../components/home';
import { Seo } from '../components/layout/Seo';

const IndexPage: FC<PageProps> = () => {
  return (
    <>
      <Jumbotron />
      <Features />
      <FeaturedTransaction />
      <FeaturesAlt />
      <GradientDivider />
      <Highlight />
      <MembershipCta />
      <Partners />
      <GradientDivider />
      <Faqs />
    </>
  );
};
export default IndexPage;

export const Head: HeadFC = () => <Seo title="Roofstock onChain" />;
