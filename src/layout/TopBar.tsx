import React from 'react';
import { AppBar, Box, Button, Link, styled, Toolbar } from '@mui/material';

const StyledBox = styled(Box)`
  text-align: end;
  width: 100%;
`;

const StyledButton = styled(Button)`
  color: #fff;
`;

export const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <img
            src="/images/roofstock-onchain-logo.svg"
            alt="Roofstock onChain Logo"
          />
        </Link>
        <StyledBox>
          <StyledButton href="/mint">Mint</StyledButton>
          <StyledButton href="/burn">Burn</StyledButton>
          <StyledButton href="/admin">Administration</StyledButton>
        </StyledBox>
      </Toolbar>
    </AppBar>
  );
};
