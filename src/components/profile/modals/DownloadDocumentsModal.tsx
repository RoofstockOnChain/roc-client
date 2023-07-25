import { FC, useState } from 'react';
import { useRoofstockOnChainKyc } from '@/hooks/useRoofstockOnChainKyc';
import { RoofstockOnChainModal } from '@/components/RoofstockOnChainModal';
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { config, Document } from '@/config';
import DoneIcon from '@mui/icons-material/Done';
import Link from 'next/link';

interface DownloadDocumentsModalProps {
  open: boolean;
  onClose: () => void;
}

export const DownloadDocumentsModal: FC<DownloadDocumentsModalProps> = ({
  open,
  onClose,
}) => {
  const { acknowledgeDocuments } = useRoofstockOnChainKyc();
  const [documentsWithStatus, setDocumentsWithStatus] = useState<
    { document: Document; isViewed: boolean }[]
  >(
    config.documents.map((document) => ({
      document: document,
      isViewed: false,
    }))
  );

  const markDocumentWithStatusAsViewed = (index: number) => {
    const newDocumentsWithStatus = [...documentsWithStatus];
    newDocumentsWithStatus[index].isViewed = true;
    setDocumentsWithStatus(newDocumentsWithStatus);
  };

  return (
    <RoofstockOnChainModal
      headerText="Download & Acknowledge Documents"
      open={open}
      onClose={onClose}
      footer={
        <Button
          variant="outlined"
          fullWidth
          onClick={async () => {
            await acknowledgeDocuments();
            onClose();
          }}
          disabled={documentsWithStatus.some((x) => !x.isViewed)}
        >
          Acknowledge with Wallet
        </Button>
      }
    >
      <Typography variant="body1" paddingY="1rem">
        Please download and review the following documents:
      </Typography>
      <List disablePadding>
        {documentsWithStatus.map((documentWithStatus, index) => (
          <ListItem
            key={index}
            disablePadding
            secondaryAction={<>{documentWithStatus.isViewed && <DoneIcon />}</>}
          >
            <ListItemButton
              component={Link}
              href={documentWithStatus.document.url}
              target="_blank"
              onClick={() => markDocumentWithStatusAsViewed(index)}
            >
              <ListItemText primary={documentWithStatus.document.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Stack display="flex" alignContent="center">
        <Typography
          variant="body1"
          paddingY="1rem"
          maxWidth="500px"
          textAlign="center"
        >
          Once you have finished downloading, click the button below to
          acknowledge that you have reviewed these documents. You will need to
          use your wallet to complete this step.
        </Typography>
      </Stack>
    </RoofstockOnChainModal>
  );
};
