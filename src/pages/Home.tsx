import { FC } from 'react';
import { MintMembershipTokenBanner } from '../components/membership/MintMembershipTokenBanner';
import { useMembershipToken } from '../hooks/useMembershipToken';
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

export const Home: FC = () => {
  const { isMember } = useMembershipToken();

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
      {!isMember && <MintMembershipTokenBanner />}
    </>
  );
};
