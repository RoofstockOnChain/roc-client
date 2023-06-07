import { FC } from 'react';
import { useMembershipToken } from '../hooks/useMembershipToken';
import { Helmet } from 'react-helmet-async';
import {
  MembershipCta,
  MembershipDescription,
  MintMembershipTokenBanner,
} from '../components/membership';
import { Features } from '../components/home';
import { Feature } from '../models/Feature';

export const Membership: FC = () => {
  const { isMember } = useMembershipToken();
  const features: Feature[] = [
    {
      imageUrl: '/images/membership/discord.png',
      imageAlt: 'Discord',
      text: 'Gain access to our private Discord channel',
    },
    {
      imageUrl: '/images/membership/real-estate-course.svg',
      imageAlt: 'Real estate course',
      text: 'Receive a curated, blockchain-focused real estate course worth $200',
    },
    {
      imageUrl: '/images/membership/verified-buyer.svg',
      imageAlt: 'Verified Buyer',
      text: 'Get ready to purchase a Home onChain',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Roofstock onChain - Membership</title>
      </Helmet>
      <MembershipCta showLearnMoreButton={false} />
      <Features
        cta="Why should I mint my membership token?"
        features={features}
      />
      <MembershipDescription />
      {!isMember && <MintMembershipTokenBanner />}
    </>
  );
};
