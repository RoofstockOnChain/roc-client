import { FC } from 'react';
import { RoofstockOnChainModal } from '@/components/RoofstockOnChainModal';
import { Button, Typography } from '@mui/material';

interface ViewFavoritesModalProps {
  open: boolean;
  onClose: () => void;
}

export const ViewFavoritesModal: FC<ViewFavoritesModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <RoofstockOnChainModal
      headerText="View Favorites"
      open={open}
      onClose={onClose}
      footer={
        <>
          <Button onClick={() => onClose()}>Close</Button>
        </>
      }
    >
      <Typography variant="body1" paddingY="1rem">
        No properties have been favorited.
      </Typography>
    </RoofstockOnChainModal>
  );
};
