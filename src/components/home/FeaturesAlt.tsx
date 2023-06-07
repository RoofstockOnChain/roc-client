import { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';

export const FeaturesAlt: FC = () => {
  return (
    <Box
      bgcolor={(theme) => theme.palette.slate.p800}
      color="#fff"
      component="section"
      paddingTop="100px"
      paddingBottom="100px"
    >
      <Container maxWidth="xl">
        <Typography component="h2" variant="h4" align="center">
          Benefits of purchasing a Home onChain
        </Typography>
        <Box
          marginTop="4rem"
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          columnGap="1.5rem"
          rowGap="4rem"
        >
          <Box width={{ md: '50%' }}>
            <Box
              bgcolor="#FDA761"
              borderRadius="26px"
              display="flex"
              justifyContent="center"
              padding="0.25rem"
            >
              <Typography
                color={(theme) => theme.palette.slate.p800}
                component="h3"
                textAlign="center"
                variant="subtitle2"
              >
                POPULAR WITH REAL ESTATE INVESTORS
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap="1.5rem"
              marginTop="3rem"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap="2rem"
                width={{ sm: '50%' }}
              >
                <Box height="80px">
                  <img
                    src="/images/home/three-percent.svg"
                    alt="Three percent"
                    width="114px"
                    height="65px"
                  />
                </Box>
                <Typography component="h4" variant="h6">
                  Transaction fee
                </Typography>
                <Typography component="p" variant="subtitle2">
                  Immediate savings with a low flat fee of 3% on all purchases
                  and sales. No hidden costs.
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="2rem"
                width={{ sm: '50%' }}
              >
                <Box height="80px">
                  <img
                    src="/images/home/instant-ownership.svg"
                    alt="Instant Ownership"
                    width="46px"
                    height="74px"
                  />
                </Box>
                <Typography component="h4" variant="h6">
                  Instant ownership
                </Typography>
                <Typography component="p" variant="subtitle2">
                  Purchase with one-click. Take ownership immediately without
                  the hassles of traditional real estate closings.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box width={{ md: '50%' }}>
            <Box
              bgcolor="rgb(147, 223, 194)"
              borderRadius="26px"
              display="flex"
              justifyContent="center"
              padding="0.25rem"
            >
              <Typography
                color={(theme) => theme.palette.slate.p800}
                component="h3"
                textAlign="center"
                variant="subtitle2"
              >
                POPULAR WITH CRYPTO HOLDERS
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap="1.5rem"
              marginTop="3rem"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap="2rem"
                width={{ sm: '50%' }}
              >
                <Box height="80px">
                  <img
                    src="/images/home/web3-enabled.svg"
                    alt="Web3 Enabled"
                    width="93px"
                    height="78px"
                  />
                </Box>
                <Typography component="h4" variant="h6">
                  Web3 enabled
                </Typography>
                <Typography component="p" variant="subtitle2">
                  Pay for your home using crypto. Trade as an NFT on your
                  favorite NFT marketplace.
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="2rem"
                width={{ sm: '50%' }}
              >
                <Box height="80px">
                  <img
                    src="/images/home/diversify-your-portfolio.svg"
                    alt="Diversify your portfolio"
                    width="78px"
                    height="78px"
                  />
                </Box>
                <Typography component="h4" variant="h6">
                  Diversification
                </Typography>
                <Typography component="p" variant="subtitle2">
                  Balance your portfolio with real world assets, stable values
                  and income in crypto when you rent out.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
