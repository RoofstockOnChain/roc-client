import { Box, Container, Typography } from '@mui/material';
import { FC } from 'react';

export const Partners: FC = () => {
  return (
    <Box
      bgcolor={(theme) => theme.palette.custom.slate}
      component="section"
      paddingTop="100px"
      paddingBottom="100px"
    >
      <Container>
        <Typography variant="h6" textAlign="center" color="#fff">
          Partners and collabs
        </Typography>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          flexWrap="wrap"
          columnGap="2rem"
          rowGap="3rem"
          alignItems="center"
          justifyContent="center"
          marginTop="3rem"
        >
          <Box>
            <img
              src="/images/partners/cypher-logo.png"
              alt="Cypher Accelerator logo"
              style={{ width: '163px', height: '58px' }}
            />
          </Box>
          <Box>
            <img
              src="/images/partners/cowboy-labs-logo.png"
              alt="Cowboy Labs logo"
              style={{ width: '66px', height: '68px' }}
            />
          </Box>
          <Box>
            <img
              src="/images/partners/origin-logo.png"
              alt="Origin logo"
              style={{ width: '118px', height: '27px' }}
            />
          </Box>
          <Box>
            <img
              src="/images/partners/teller-logo.png"
              alt="Teller logo"
              style={{ width: '162px', height: '51px' }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
