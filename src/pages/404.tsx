import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Box, Container, Typography } from '@mui/material';
import { Seo } from '../components/layout/Seo';

const NotFoundPage: FC<PageProps> = () => {
  return (
    <Container maxWidth="xl">
      <Box padding="1rem">
        <Typography variant="h1">Page Not Found</Typography>
      </Box>
    </Container>
  );
};
export default NotFoundPage;

export const Head: HeadFC = () => <Seo title="Roofstock onChain - Not Found" />;
