import { FC, useEffect, useState } from 'react';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { Box, Card, Container, Grid, styled, Tab } from '@mui/material';
import { Membership } from '@/components/profile/Membership';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { MyHomes } from '@/components/profile/MyHomes';

const StyledTabPanel = styled(TabPanel)`
  padding: 0;
`;

const Profile: FC = () => {
  const [selectedTab, setSelectedTab] = useState<'my-homes' | 'membership'>(
    'my-homes'
  );
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected]);

  return (
    <>
      <Head>
        <title>Roofstock onChain - Profile</title>
      </Head>
      <Box
        component="section"
        sx={{
          backgroundAttachment: 'fixed',
          backgroundPosition: 'top -30px center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundImage: `url(/images/home/hero-background.jpg)`,
          '@keyframes bg-slide-up': {
            '0%': { backgroundPositionY: 'top' },
            '100%': { backgroundPositionY: 'top -30px' },
          },
          animation: 'bg-slide-up 2s',
          paddingY: '1rem',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <TabContext value={selectedTab}>
              <Grid item xs={12} md={3}>
                <Card>
                  <TabList
                    onChange={(_, newValue) => setSelectedTab(newValue)}
                    orientation="vertical"
                  >
                    <Tab label="My Homes" value="my-homes" />
                    <Tab label="Membership" value="membership" />
                  </TabList>
                </Card>
              </Grid>
              <Grid item xs={12} md={9}>
                <StyledTabPanel value="my-homes">
                  <MyHomes />
                </StyledTabPanel>
                <StyledTabPanel value="membership">
                  <Membership />
                </StyledTabPanel>
              </Grid>
            </TabContext>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
