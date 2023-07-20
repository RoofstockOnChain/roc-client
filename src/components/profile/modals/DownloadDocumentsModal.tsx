import { FC } from 'react';
import { useRoofstockOnChainKyc } from '@/hooks/useRoofstockOnChainKyc';
import { RoofstockOnChainModal } from '@/components/RoofstockOnChainModal';
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import { config } from '@/config';

const StyledButton = styled(Button)`
  border-color: #fff !important;
  color: #fff;
  text-transform: none;
  white-space: nowrap;
`;

interface DownloadDocumentsModalProps {
  open: boolean;
  onClose: () => void;
}

export const DownloadDocumentsModal: FC<DownloadDocumentsModalProps> = ({
  open,
  onClose,
}) => {
  const { acknowledgeDocuments } = useRoofstockOnChainKyc();

  return (
    <RoofstockOnChainModal
      headerText="Download & Acknowledge Documents"
      open={open}
      onClose={onClose}
      footer={
        <StyledButton
          variant="outlined"
          fullWidth
          onClick={async () => {
            await acknowledgeDocuments();
            onClose();
          }}
        >
          Acknowledge with Wallet
        </StyledButton>
      }
    >
      <Typography variant="body1" paddingY="1rem">
        Please review the following documents:
      </Typography>
      <List disablePadding>
        {config.documents.map((document, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component="a" href={document.url} target="_blank">
              <ListItemText primary={document.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </RoofstockOnChainModal>
  );
};
