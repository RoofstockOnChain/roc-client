import { FC } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { MintMembershipTokenBanner } from '../components/MintMembershipTokenBanner';
import { useMembershipToken } from '../hooks/useMembershipToken';

export const Home: FC = () => {
  const { isMember } = useMembershipToken();

  return (
    <>
      <Jumbotron />
      <Features />
      {/*<FeaturedTransaction />*/}
      {/*<FeaturesAlt />*/}
      {/*<Highlight />*/}
      {/*<MembershipCta />*/}
      {/*<TheTeam />*/}
      {/*<Partners />*/}
      {/*<Faqs />*/}
      {!isMember && <MintMembershipTokenBanner />}
    </>
  );
};

const Jumbotron: FC = () => {
  const theme = useTheme();
  const isLargerThanSmallBreakpoint = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      aria-labelledby="title"
      component="section"
      height="100vh"
      sx={{
        backgroundAttachment: 'fixed',
        backgroundPosition: 'top -30px center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: `url(/images/home/hero-background.jpg)`,
        '@keyframes bg-slide-up': {
          '0%': { backgroundPositionY: 'top' },
          '100%': { backgroundPositionY: 'top -30px' },
        },
        animation: 'bg-slide-up 2s',
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(/images/home/gradient-top.png)`,
          backgroundSize: '100% 600px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container maxWidth="xl">
          <Box height="100vh" paddingTop="88px">
            <Typography
              color="#fff"
              variant={isLargerThanSmallBreakpoint ? 'h1' : 'h3'}
              gutterBottom
              sx={{
                '@keyframes fade-in-heading': {
                  '0%': { opacity: 0, marginTop: '30px' },
                  '100%': { opacity: 1 },
                },
                animation: 'fade-in-heading 2s',
              }}
            >
              Find a home for your crypto
            </Typography>
            <Typography
              color={(theme) => theme.palette.slate.p800}
              variant="subtitle1"
              sx={{
                '@keyframes fade-in-subtitle': {
                  '0%': { opacity: 0, marginTop: '60px' },
                  '100%': { opacity: 1 },
                },
                animation: 'fade-in-subtitle 2s',
              }}
            >
              Real-world homes on blockchain that you can buy with one-click
            </Typography>
            <Box marginTop="2rem">
              <Button
                href="/properties"
                color="primary"
                variant="contained"
                size="large"
              >
                View Homes onChain
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

const Features: FC = () => {
  const features = [
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
    <Box
      component="section"
      paddingTop="100px"
      paddingBottom="100px"
      color="#fff"
    >
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          gap="3rem"
          alignItems="center"
        >
          <Box maxWidth="1000px">
            <Typography component="h2" textAlign="center" variant="h4">
              We simplify buying and owning property for the web3 generation
            </Typography>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns={{ sm: '1fr 1fr', md: '1fr 1fr 1fr' }}
            gap="5rem"
            justifyContent="flex-start"
            maxWidth="1350px"
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box display="flex" alignItems="center" height="165px">
                  <img
                    src={feature.imageUrl}
                    alt={feature.imageAlt}
                    width="127px"
                    height="113px"
                  />
                </Box>
                <Typography
                  marginTop="2rem"
                  textAlign="center"
                  variant="subtitle1"
                >
                  {feature.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
