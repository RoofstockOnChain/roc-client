import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  styled,
  Toolbar,
} from '@mui/material';
import { config } from '../config';

const StyledAppBar = styled(AppBar)`
  background-color: #151920;
  justify-content: center;
  min-height: 100px;
`;

const DividerStyled = styled(Divider)`
  background-color: #fff;
`;

const StyledButton = styled(Button)`
  color: #fff;
  text-transform: none;
  white-space: nowrap;
`;

export const TopBar = () => {
  const { marketplaceUrl } = config;

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Link href="/">
            <img
              src="/images/roofstock-onchain-logo.svg"
              alt="Roofstock onChain Logo"
            />
          </Link>
          <Stack
            display="flex"
            columnGap="1rem"
            direction="row"
            divider={
              <DividerStyled
                flexItem
                light
                orientation="vertical"
                sx={{ alignSelf: 'center', height: '1rem' }}
              />
            }
            paddingLeft="2rem"
            paddingRight="2rem"
          >
            <StyledButton href="/properties">View Homes onChain</StyledButton>
            <StyledButton href={marketplaceUrl}>
              Buy on Marketplace
            </StyledButton>
            <StyledButton>Learn</StyledButton>
          </Stack>
          <Box textAlign="end" width="100%">
            <StyledButton>Connect Wallet</StyledButton>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};
