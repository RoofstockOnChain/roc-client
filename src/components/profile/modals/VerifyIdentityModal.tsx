import { FC } from 'react';
import { RoofstockOnChainModal } from '@/components/RoofstockOnChainModal';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, Stack, Typography } from '@mui/material';
import { config } from '@/config';
import Link from 'next/link';

interface VerifyIdentityModalProps {
  open: boolean;
  onClose: () => void;
}

export const VerifyIdentityModal: FC<VerifyIdentityModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <RoofstockOnChainModal
      headerText="Verify Identity"
      open={open}
      onClose={onClose}
      footer={
        <Button
          component={Link}
          href={config.quadrataVerifyIdentityLink}
          target="_blank"
          variant="outlined"
          fullWidth
          endIcon={<OpenInNewIcon />}
          onClick={() => {
            onClose();
          }}
        >
          Verify Identity with Quadrata
        </Button>
      }
    >
      <Stack display="flex" alignContent="center">
        <Typography
          variant="body1"
          paddingY="1rem"
          maxWidth="500px"
          textAlign="center"
        >
          You will verify your identity with Quadrata. Click the link below and
          follow the steps to verify your identity.
        </Typography>
      </Stack>
    </RoofstockOnChainModal>
  );
};
