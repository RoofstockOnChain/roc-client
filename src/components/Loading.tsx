import { Box, CircularProgress } from '@mui/material';
import React, { FC } from 'react';

export const Loading: FC = () => (
  <Box display="flex" justifyContent="center" padding="1rem">
    <CircularProgress />
  </Box>
);
