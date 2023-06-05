import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
} from '@mui/material';
import { config } from '../config';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useWeb3Auth } from '../hooks/useWeb3Auth';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const StyledAppBar = styled(AppBar)`
  background-color: #151920;
  justify-content: center;
  min-height: 100px;
`;

const DividerStyled = styled(Divider)`
  background-color: #fff;
`;

const StyledButton = styled(Button)`
  border-color: #fff !important;
  color: #fff;
  text-transform: none;
  white-space: nowrap;
`;

const StyledIconButton = styled(IconButton)`
  color: #fff;
`;

export const TopBar = () => {
  const { howItWorksUrl, faqsUrl } = config;
  const [learnMenuAnchorEl, setLearnMenuAnchorEl] =
    useState<HTMLElement | null>();
  const learnMenuOpen = Boolean(learnMenuAnchorEl);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<HTMLElement | null>();
  const profileMenuOpen = Boolean(profileMenuAnchorEl);
  const { marketplaceUrl } = config;
  const { isAuthenticated, logout } = useWeb3Auth();

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
            <StyledButton
              endIcon={<ArrowDropDownIcon />}
              onClick={(event) => setLearnMenuAnchorEl(event.currentTarget)}
            >
              Learn
            </StyledButton>
          </Stack>
          <Menu
            anchorEl={learnMenuAnchorEl}
            open={learnMenuOpen}
            onClose={() => setLearnMenuAnchorEl(null)}
          >
            <MenuItem component={Link} href="/mint">
              Become a member
            </MenuItem>
            <MenuItem component="a" href={howItWorksUrl}>
              How it works
            </MenuItem>
            <MenuItem component="a" href={faqsUrl}>
              FAQs
            </MenuItem>
          </Menu>
          <Box textAlign="end" width="100%">
            {!isAuthenticated && (
              <StyledButton variant="outlined">Connect Wallet</StyledButton>
            )}
            {isAuthenticated && (
              <>
                <StyledIconButton
                  onClick={(event) =>
                    setProfileMenuAnchorEl(event.currentTarget)
                  }
                >
                  <AccountCircleOutlinedIcon />
                </StyledIconButton>
                <Menu
                  anchorEl={profileMenuAnchorEl}
                  open={profileMenuOpen}
                  onClose={() => setProfileMenuAnchorEl(null)}
                >
                  <MenuItem component={Link} href="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};
