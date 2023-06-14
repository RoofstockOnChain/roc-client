import { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';

export const NotFound: FC = () => {
  return (
    <Container maxWidth="xl">
      <Box padding="1rem">
        <Typography variant="h1">Page Not Found</Typography>
      </Box>
    </Container>
  );
};
