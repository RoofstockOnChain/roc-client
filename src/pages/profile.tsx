import { FC, useEffect, useState } from 'react';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import { useRoofstockOnChainKyc } from '@/hooks/useRoofstockOnChainKyc';
import { RoofstockOnChainModal } from '@/components/RoofstockOnChainModal';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RefreshIcon from '@mui/icons-material/Refresh';
import { config } from '@/config';

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

const Profile: FC = () => {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected]);

  return (
    <>
      <Head>
        <title>Roofstock onChain - Profile</title>
      </Head>
      <Box
        component="section"
        sx={{
          backgroundAttachment: 'fixed',
          backgroundPosition: 'top -30px center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundImage: `url(/images/home/hero-background.jpg)`,
          '@keyframes bg-slide-up': {
            '0%': { backgroundPositionY: 'top' },
            '100%': { backgroundPositionY: 'top -30px' },
          },
          animation: 'bg-slide-up 2s',
          paddingY: '1rem',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Card>
                <List>
                  <ListItem>
                    <ListItemText primary="Membership" />
                  </ListItem>
                </List>
              </Card>
            </Grid>
            <Grid item xs={12} md={9}>
              <Membership />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const Membership: FC = () => {
  const { isAllowed, isIdentityVerified, isDocumentsAcknowledged, refresh } =
    useRoofstockOnChainKyc();
  const [verifyIdentityModalOpen, setVerifyIdentityModalOpen] =
    useState<boolean>(false);
  const [downloadDocumentsModalOpen, setDownloadDocumentsModalOpen] =
    useState<boolean>(false);

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
          {isAllowed && (
            <Box display="flex" flexDirection="column" justifyContent="center">
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

export default Profile;

interface VerifyIdentityModalProps {
  open: boolean;
  onClose: () => void;
}

const VerifyIdentityModal: FC<VerifyIdentityModalProps> = ({
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

interface DownloadDocumentsModalProps {
  open: boolean;
  onClose: () => void;
}

const DownloadDocumentsModal: FC<DownloadDocumentsModalProps> = ({
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
