import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { ClientOnly } from '@/components/nextjs/ClientOnly';
import { useRoofstockOnChainKyc } from '@/hooks/useRoofstockOnChainKyc';

interface MembershipCtaProps {
  showLearnMoreButton?: boolean;
}

export const MembershipCta: FC<MembershipCtaProps> = ({
  showLearnMoreButton = true,
}) => {
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { isAllowed } = useRoofstockOnChainKyc();

  return (
    <Box
      component="section"
      color="#fff"
      sx={{ background: 'linear-gradient(to bottom, #6EA7C5, #A878BF)' }}
    >
      <Container maxWidth="xl">
        <Stack direction={{ xs: 'column', sm: 'row' }} gap="2rem">
          <Box width={{ sm: '70%' }} paddingTop="100px" paddingBottom="100px">
            <Typography variant="h3">
              Become a Roofstock onChain member
            </Typography>
            <Typography marginTop="1rem" variant="subtitle1">
              Mint your unique membership token. Enjoy exclusive access to
              events, real estate courses, and participation in our growing web3
              real estate community.
            </Typography>
            <Box marginTop="2rem">
              <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap="1rem"
              >
                <ClientOnly>
                  {!isConnected && (
                    <Button
                      variant="contained"
                      onClick={async () => await open()}
                      size="large"
                    >
                      Connect Wallet
                    </Button>
                  )}
                  {isConnected && !isAllowed && (
                    <Button variant="contained" size="large" href="/profile">
                      Mint membership token
                    </Button>
                  )}
                </ClientOnly>
                {showLearnMoreButton && (
                  <Box>
                    <Button
                      href="/membership"
                      variant="outlined"
                      color="inherit"
                      size="large"
                    >
                      Learn more
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            overflow="hidden"
            paddingTop={{ sm: '4rem' }}
            width={{ sm: '25%' }}
            textAlign={{ sm: 'center' }}
            maxHeight="400px"
          >
            <img
              src="/images/mint-become-a-member.png"
              alt="Become a member"
              style={{ width: '121px', height: '460px' }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
