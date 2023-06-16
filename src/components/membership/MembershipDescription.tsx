import { Box, Container, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

export const MembershipDescription: FC = () => {
  return (
    <Box
      bgcolor="#30394A"
      color="#fff"
      component="section"
      paddingTop="4rem"
      paddingBottom="4rem"
    >
      <Container maxWidth="xl">
        <Stack direction={{ sm: 'row' }} gap="3rem">
          <Box textAlign="center">
            <img
              src="/images/roofstock-onchain-membership.png"
              alt="Roofstock onChain membership"
              style={{ width: '245px', height: '200px' }}
            />
          </Box>
          <Box>
            <Typography
              component="h2"
              color="transparent"
              id="unique"
              variant="h4"
              sx={{
                background:
                  'linear-gradient(to right, #6FA7C5, #8992C3, #A879C0)',
                backgroundClip: 'text',
              }}
            >
              YOUR HOME ONCHAIN JOURNEY IS AS UNIQUE AS YOU ARE
            </Typography>
            <Typography marginTop="2rem" variant="subtitle1">
              Your membership starts by minting your Roofstock onChain
              membership token. You can earn and add badges to it as you get
              ready to buy homes onChain.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
