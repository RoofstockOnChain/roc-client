import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
} from '@mui/material';
import { config } from '../config';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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

export const TopBar = () => {
  const { howItWorksUrl, faqsUrl } = config;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
  const open = Boolean(anchorEl);
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
            <StyledButton
              endIcon={<ArrowDropDownIcon />}
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              Learn
            </StyledButton>
          </Stack>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
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
            <StyledButton variant="outlined">Connect Wallet</StyledButton>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};
