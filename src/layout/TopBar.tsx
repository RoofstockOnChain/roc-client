import React from 'react';
import { AppBar, Box, Button, Link, styled, Toolbar } from '@mui/material';

const StyledAppBar = styled(AppBar)`
  background-color: #151920;
  justify-content: center;
  min-height: 100px;
`;

const StyledImg = styled('img')`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const StyledButton = styled(Button)`
  color: #fff;
  text-transform: none;
`;

export const TopBar = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Link href="/">
          <StyledImg
            src="/images/roofstock-onchain-logo.svg"
            alt="Roofstock onChain Logo"
          />
        </Link>
        <Box display="flex">
          <StyledButton href="/properties">Properties</StyledButton>
          <StyledButton href="/mint">Mint</StyledButton>
          <StyledButton href="/burn">Burn</StyledButton>
          <StyledButton href="/admin">Administration</StyledButton>
        </Box>
        <Box textAlign="end" width="100%">
          <StyledButton>Connect Wallet</StyledButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};
