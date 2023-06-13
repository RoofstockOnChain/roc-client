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
} from '../components/home';
import { Feature } from '../models/Feature';

export const Home: FC = () => {
  const features: Feature[] = [
    {
      imageUrl: '/images/home/top-rental-markets.svg',
      imageAlt: 'Top Rental Markets',
      text: 'Find move-in ready, vetted properties, in top rental markets',
    },
    {
      imageUrl: '/images/home/compliance-and-security.svg',
      imageAlt: 'Compliance and Security',
      text: 'Blockchain ownership designed for compliance and security',
    },
    {
      imageUrl: '/images/home/blockchain-financing.svg',
      imageAlt: 'Blockchain Financing',
      text: 'Blockchain financing available, up to 80% of home value',
    },
  ];

  return (
    <>
      <Jumbotron />
      <Features
        cta="We simplify buying and owning property for the web3 generation"
        features={features}
      />
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
