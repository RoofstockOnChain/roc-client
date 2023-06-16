import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
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
    <Layout>
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
    </Layout>
  );
};
export default IndexPage;

export const Head: HeadFC = () => <Seo title="Roofstock onChain" />;
