import { Box, styled } from '@mui/material';
import React, { FC } from 'react';

const StyledImg = styled('img')`
  height: 58px;
  width: 100%;
`;

export const GradientDivider: FC = () => {
  return (
    <Box height="58px">
      <StyledImg
        src="/images/home/background-gradient.png"
        alt="Background gradient"
      />
    </Box>
  );
};
