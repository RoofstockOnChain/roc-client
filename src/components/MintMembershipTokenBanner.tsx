import { Box, Button, Container, Typography } from '@mui/material';
import { FC } from 'react';
import { useMembershipToken } from '../hooks/useMembershipToken';

export const MintMembershipTokenBanner: FC = () => {
  const { mint } = useMembershipToken();

  return (
    <Box paddingTop="2rem" paddingBottom="2rem" textAlign="center">
      <Container>
        <Button
          sx={{
            padding: '1rem',
            border: '2px solid',
            borderImage:
              'linear-gradient(90deg, #62D4EE 8.65%, #C98BC2 53.12%, #F89DFC 93.5%) 1',
            '&:hover': {
              borderImage:
                'linear-gradient(90deg, #62D4EE 8.65%, #C98BC2 53.12%, #F89DFC 93.5%) 1',
            },
          }}
          onClick={() => mint()}
          variant="outlined"
        >
          <Typography
            color="transparent"
            fontSize="1.125rem"
            fontWeight={800}
            sx={{
              background:
                'linear-gradient(to right, #9CB9E2, #C98BC2, #F89DFC)',
              backgroundClip: 'text',
            }}
          >
            Mint membership token
          </Typography>
        </Button>
      </Container>
    </Box>
  );
};
