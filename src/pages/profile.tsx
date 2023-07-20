import { FC, useEffect } from 'react';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Membership } from '@/components/profile/Membership';

const Profile: FC = () => {
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
            <Grid item xs={12} md={3}>
              <Card>
                <List>
                  <ListItem>
                    <ListItemText primary="Membership" />
                  </ListItem>
                </List>
              </Card>
            </Grid>
            <Grid item xs={12} md={9}>
              <Membership />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
