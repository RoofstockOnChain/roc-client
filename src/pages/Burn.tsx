import { FC } from 'react';
import { Button, Stack, TextField } from '@mui/material';

export const Burn: FC = () => {
  return (
    <Stack spacing={2}>
      <TextField label="Token" variant="outlined" size="small" />
      <Button variant="outlined" type="submit">
        Preview
      </Button>
    </Stack>
  );
};
