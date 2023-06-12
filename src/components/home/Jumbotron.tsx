import { FC } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export const Jumbotron: FC = () => {
  const theme = useTheme();
  const isLargerThanSmallBreakpoint = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      component="section"
      height="100vh"
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
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(/images/home/gradient-top.png)`,
          backgroundSize: '100% 600px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container maxWidth="xl">
          <Box height="100vh" paddingTop="88px">
            <Typography
              color="#fff"
              variant={isLargerThanSmallBreakpoint ? 'h1' : 'h3'}
              gutterBottom
              sx={{
                '@keyframes fade-in-heading': {
                  '0%': { opacity: 0, marginTop: '30px' },
                  '100%': { opacity: 1 },
                },
                animation: 'fade-in-heading 2s',
              }}
            >
              Find a home for your crypto
            </Typography>
            <Typography
              color={(theme) => theme.palette.custom.slate}
              variant="subtitle1"
              sx={{
                '@keyframes fade-in-subtitle': {
                  '0%': { opacity: 0, marginTop: '60px' },
                  '100%': { opacity: 1 },
                },
                animation: 'fade-in-subtitle 2s',
              }}
            >
              Real-world homes on blockchain that you can buy with one-click
            </Typography>
            <Box marginTop="2rem">
              <Button
                href="/properties"
                color="primary"
                variant="contained"
                size="large"
              >
                View Homes onChain
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
