import { FC, useEffect, useState } from 'react';
import { useRoofstockOnChainKyc } from '@/hooks/useRoofstockOnChainKyc';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DownloadDocumentsModal } from '@/components/profile/modals/DownloadDocumentsModal';
import { VerifyIdentityModal } from '@/components/profile/modals/VerifyIdentityModal';

const StyledListItem = styled(ListItem)`
  border: 1px solid #fff;
  border-radius: 4px;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const StyledButton = styled(Button)`
  border-color: #fff !important;
  color: #fff;
  text-transform: none;
  white-space: nowrap;
`;

export const Membership: FC = () => {
  const { isAllowed, isIdentityVerified, isDocumentsAcknowledged, refresh } =
    useRoofstockOnChainKyc();
  const [verifyIdentityModalOpen, setVerifyIdentityModalOpen] =
    useState<boolean>(false);
  const [downloadDocumentsModalOpen, setDownloadDocumentsModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(async () => {
      await refresh();
    }, 10 * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Card>
        <CardHeader
          action={
            <>
              {!isAllowed && (
                <IconButton onClick={async () => await refresh()}>
                  <RefreshIcon />
                </IconButton>
              )}
            </>
          }
        />
        <CardContent>
          <>
            {isAllowed && (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Box display="flex" justifyContent="center">
                  <img
                    src="/images/roofstock-onchain-membership-token.gif"
                    alt="Spinning Roofstock onChain Membership token"
                    height="500px"
                  />
                </Box>
                <Typography variant="h5" textAlign="center">
                  Congratulations, you are ready to purchase a Web3 Home.
                </Typography>
              </Box>
            )}
            {!isAllowed && (
              <List>
                <StyledListItem
                  secondaryAction={
                    <>
                      {isIdentityVerified && (
                        <Chip label="Complete" color="success" />
                      )}
                      {!isIdentityVerified && (
                        <StyledButton
                          variant="outlined"
                          onClick={() => setVerifyIdentityModalOpen(true)}
                        >
                          Start
                        </StyledButton>
                      )}
                    </>
                  }
                >
                  <ListItemText>Verify your Identity</ListItemText>
                </StyledListItem>
                <StyledListItem
                  secondaryAction={
                    <>
                      {isDocumentsAcknowledged && (
                        <Chip label="Complete" color="success" />
                      )}
                      {!isDocumentsAcknowledged && (
                        <StyledButton
                          variant="outlined"
                          onClick={() => setDownloadDocumentsModalOpen(true)}
                        >
                          Start
                        </StyledButton>
                      )}
                    </>
                  }
                >
                  <ListItemText>Download & Acknowledge Documents</ListItemText>
                </StyledListItem>
              </List>
            )}
          </>
        </CardContent>
      </Card>
      <VerifyIdentityModal
        open={verifyIdentityModalOpen}
        onClose={() => setVerifyIdentityModalOpen(false)}
      />
      <DownloadDocumentsModal
        open={downloadDocumentsModalOpen}
        onClose={() => setDownloadDocumentsModalOpen(false)}
      />
    </>
  );
};
