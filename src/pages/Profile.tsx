import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { useMembershipToken } from '../hooks/useMembershipToken';
import { Helmet } from 'react-helmet-async';

const StyledCard = styled(Card)`
  background-color: ${(props) => props.theme.palette.slate.p800};
  color: #fff;
`;

const StyledDivider = styled(Divider)`
  background-color: #424c60;
`;

export const Profile: FC = () => {
  const { isBuyerVerified } = useMembershipToken();

  return (
    <>
      <Helmet>
        <title>Roofstock onChain - Profile</title>
      </Helmet>
      <Box
        component="main"
        minHeight="80vh"
        sx={{
          backgroundImage: `url(/images/home/hero-background.jpg)`,
          backgroundSize: 'cover',
        }}
      >
        <Box
          minHeight="80vh"
          sx={{
            backdropFilter: 'brightness(0.5)',
          }}
        >
          <Container maxWidth="xl">
            <Box paddingTop="2.5rem" paddingBottom="2.5rem">
              <Typography variant="h3" color="#fff">
                Welcome
              </Typography>
              <Stack direction="row" gap="0.5rem" marginTop="0.5rem">
                <ProfileStatusChips />
              </Stack>
              <Stack direction={{ sm: 'row' }} gap="1.5rem" marginTop="1.5rem">
                <Stack gap="1.5rem" width={{ sm: '50%' }}>
                  <MembershipSection />
                  <BadgesSection />
                </Stack>
                {!isBuyerVerified && (
                  <Box width={{ sm: '50%' }}>
                    <BecomeAVerifiedBuyer />
                  </Box>
                )}
              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

const ProfileStatusChips: FC = () => {
  const { isMember, isBuyerVerified } = useMembershipToken();

  return (
    <Stack direction="row" gap="0.5rem" marginTop="0.5rem">
      {isMember ? (
        <Chip label="Member" color="success" />
      ) : (
        <Chip label="Not a member" color="secondary" />
      )}
      {isBuyerVerified ? (
        <Chip label="Verified buyer" color="success" />
      ) : (
        <Chip label="Unverified buyer" color="secondary" />
      )}
    </Stack>
  );
};

const MembershipSection: FC = () => {
  return (
    <StyledCard>
      <CardHeader title="Wallet & Membership" subheader="About Membership" />
      <StyledDivider variant="middle" />
      <CardContent></CardContent>
    </StyledCard>
  );
};

const BadgesSection: FC = () => {
  const badges = [];

  return (
    <StyledCard>
      <CardHeader title="Badges" subheader="About Badges" />
      <StyledDivider variant="middle" />
      <CardContent>
        {badges.length === 0 && (
          <Typography>
            No badges to show at this time. Once you mint your membership token,
            any badges you receive will show up here.
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

const BecomeAVerifiedBuyer: FC = () => {
  return (
    <StyledCard>
      <CardHeader
        title="Add Verified Buyer status to your wallet"
        subheader="About Buyer Verification"
      />
      <StyledDivider variant="middle" />
      <CardContent></CardContent>
    </StyledCard>
  );
};
