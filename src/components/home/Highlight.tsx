import { Box, Container, Typography } from '@mui/material';
import React, { FC } from 'react';

export const Highlight: FC = () => {
  return (
    <Box
      component="section"
      color="#fff"
      paddingTop="100px"
      paddingBottom="100px"
    >
      <Container maxWidth="xl">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography component="h2" textAlign="center" variant="h5">
            Roofstock onChain is the web3 subsidiary of real estate investing
            company{' '}
            <Typography component="span" variant="h5">
              Roofstock
            </Typography>
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap="1rem"
            alignItems="center"
            marginTop="2.5rem"
          >
            <Box>
              <img
                src="/images/home/$5-billion.png"
                alt=""
                width="105px"
                height="72px"
              />
            </Box>
            <Typography component="p" variant="subtitle2">
              Roofstock has transacted over $5 Billion of single-family homes
              since our inception in 2015
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap="1rem"
            alignItems="center"
            maxWidth="700px"
            marginTop="2.5rem"
          >
            <Box>
              <img
                src="/images/home/70+-markets.png"
                alt=""
                width="106px"
                height="67px"
              />
            </Box>
            <Typography component="p" variant="subtitle2">
              We currently serve over 70 residential markets in the US and are
              continually expanding to add new markets and services.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
