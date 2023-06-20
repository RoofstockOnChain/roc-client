import { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Feature } from '../../models/Feature';

export const Features: FC = () => {
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
    <Box
      component="section"
      paddingTop="100px"
      paddingBottom="100px"
      color="#fff"
    >
      <Container maxWidth="xl">
        <Box
          display="flex"
          flexDirection="column"
          gap="3rem"
          alignItems="center"
        >
          <Typography component="h2" textAlign="center" variant="h4">
            We simplify buying and owning property for the web3 generation
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={{ sm: '1fr 1fr', md: '1fr 1fr 1fr' }}
            gap="5rem"
            justifyContent="flex-start"
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
                    style={{ width: '127px', height: '113px' }}
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
