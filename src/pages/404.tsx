import { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Head from 'next/head';

const NotFound: FC = () => {
  return (
    <>
      <Head>
        <title>Roofstock onChain - Page Not Found</title>
      </Head>
      <Container maxWidth="xl">
        <Box padding="1rem">
          <Typography variant="h1">Page Not Found</Typography>
        </Box>
      </Container>
    </>
  );
};

export default NotFound;
