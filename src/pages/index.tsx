import { FC } from 'react';
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
} from '@/components/home';
import Head from 'next/head';

const Index: FC = () => {
  return (
    <>
      <Head>
        <title>Roofstock onChain</title>
      </Head>
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

export default Index;
