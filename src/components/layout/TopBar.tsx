import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
} from '@mui/material';
import { config } from '../../config';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';

const StyledAppBar = styled(AppBar)`
  background-color: #151920;
  justify-content: center;
  min-height: 100px;
`;

const StyledToolbar = styled(Toolbar)`
  padding-left: 0;
  padding-right: 0;
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

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    background-color: rgb(35, 42, 53);
    width: 350px;
  }
`;

const StyledListItemText = styled(ListItemText)`
  color: #fff;
`;

const StyledDivider = styled(Divider)`
  background-color: #fff;
`;

export const TopBar = () => {
  const { howItWorksUrl, faqsUrl, learnUrl } = config;
  const [learnMenuAnchorEl, setLearnMenuAnchorEl] =
    useState<HTMLElement | null>();
  const learnMenuOpen = Boolean(learnMenuAnchorEl);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const { marketplaceUrl } = config;
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnectAsync } = useDisconnect();

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <StyledToolbar>
          <Link href="/">
            <img
              src="/images/roofstock-onchain-logo.svg"
              alt="Roofstock onChain Logo"
            />
          </Link>
          <Hidden mdDown>
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
              <MenuItem component={Link} href="/membership">
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
              {!isConnected && (
                <StyledButton
                  variant="outlined"
                  onClick={async () => await open()}
                >
                  Connect Wallet
                </StyledButton>
              )}
              {isConnected && (
                <StyledButton
                  variant="outlined"
                  onClick={async () => await disconnectAsync()}
                >
                  Disconnect
                </StyledButton>
              )}
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box textAlign="end" width="100%">
              <StyledIconButton onClick={(event) => setMobileDrawerOpen(true)}>
                <MenuIcon />
              </StyledIconButton>
            </Box>
            <StyledDrawer
              open={mobileDrawerOpen}
              onClose={() => setMobileDrawerOpen(false)}
            >
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                padding="1rem"
              >
                <Box>
                  <img
                    src="/images/roofstock-onchain-logo.svg"
                    alt="Roofstock onChain logo"
                    width="134px"
                    height="25px"
                  />
                </Box>
                <StyledIconButton onClick={() => setMobileDrawerOpen(false)}>
                  <CloseIcon />
                </StyledIconButton>
              </Stack>
              <List>
                <ListItem disablePadding>
                  <ListItemButton href="/properties">
                    <StyledListItemText primary="View Homes onChain" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href={marketplaceUrl}>
                    <StyledListItemText primary="Buy on Marketplace" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href="/membership">
                    <StyledListItemText primary="Become a member" />
                  </ListItemButton>
                </ListItem>
              </List>
              <StyledDivider />
              <List>
                <ListItem disablePadding>
                  <ListItemButton href={howItWorksUrl}>
                    <StyledListItemText primary="How it works" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href={faqsUrl}>
                    <StyledListItemText primary="FAQs" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href={learnUrl}>
                    <StyledListItemText primary="Learn" />
                  </ListItemButton>
                </ListItem>
              </List>
              <Stack padding="1rem">
                {!isConnected && (
                  <StyledButton
                    variant="outlined"
                    onClick={async () => {
                      await open();
                      setMobileDrawerOpen(false);
                    }}
                    fullWidth
                  >
                    Connect Wallet
                  </StyledButton>
                )}
                {isConnected && (
                  <StyledButton
                    variant="outlined"
                    onClick={async () => await disconnectAsync()}
                    fullWidth
                  >
                    Disconnect
                  </StyledButton>
                )}
              </Stack>
            </StyledDrawer>
          </Hidden>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};
