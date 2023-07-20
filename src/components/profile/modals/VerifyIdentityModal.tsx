import { FC } from 'react';
import { RoofstockOnChainModal } from '@/components/RoofstockOnChainModal';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, styled, Typography } from '@mui/material';

const StyledButton = styled(Button)`
  border-color: #fff !important;
  color: #fff;
  text-transform: none;
  white-space: nowrap;
`;

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
        <StyledButton
          variant="outlined"
          fullWidth
          endIcon={<OpenInNewIcon />}
          onClick={() => {
            // TODO: Open Quadrata in new tab
            onClose();
          }}
        >
          Verify Identity with Quadrata
        </StyledButton>
      }
    >
      <Typography variant="body1" paddingY="1rem">
        You will verify your identity with Quadrata . . .
      </Typography>
    </RoofstockOnChainModal>
  );
};
