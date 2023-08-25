import { FC, useState } from 'react';
import Head from 'next/head';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ListingShowcase } from '@/components/listings/ListingShowcase';
import { useListingRecommendationEngine } from '@/hooks/useListingRecommendationEngine';
import { Loading } from '@/components/Loading';
import { ViewFavoritesModal } from '@/components/search/ViewFavoritesModal';

const Search: FC = () => {
  const [market, setMarket] = useState<string>('Columbia, SC');
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [desiredPrice, setDesiredPrice] = useState<number>(250000);
  const [tone, setTone] = useState<string>('professional');
  const {
    listing,
    getNextListing,
    explanation,
    clearListingRecommendations,
    loading,
  } = useListingRecommendationEngine({
    market,
    bedrooms,
    bathrooms,
    desiredPrice,
    tone,
  });
  const [feedback, setFeedback] = useState<string>('');
  const [viewFavoritesModalOpen, setViewFavoritesModalOpen] =
    useState<boolean>(false);

  const next = async () => {
    await getNextListing({
      mlsListingId: listing?.mlsListingId!,
      feedback,
    });
    setFeedback('');
  };

  return (
    <>
      <Head>
        <title>Roofstock onChain - Search</title>
      </Head>
      <Container maxWidth="xl">
        <Box padding="1rem">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert severity="warning">
                RoofusAI is in alpha. He is not yet ready to be used to find the
                investment property of your dreams.
              </Alert>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Market</InputLabel>
                <Select size="small" value={market} disabled>
                  <MenuItem value="Columbia, SC">Columbia, SC</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Bedrooms</InputLabel>
                <Select
                  size="small"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Bathrooms</InputLabel>
                <Select
                  size="small"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                >
                  <MenuItem value={2}>2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                size="small"
                label="Desired Price"
                value={desiredPrice}
                onChange={(e) => setDesiredPrice(Number(e.target.value))}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Tone</InputLabel>
                <Select
                  size="small"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="comedic">Comedic</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="outlined"
                onClick={async () => setViewFavoritesModalOpen(true)}
                fullWidth
              >
                Favorites
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="outlined"
                onClick={async () => await clearListingRecommendations()}
                fullWidth
              >
                Restart
              </Button>
            </Grid>
            {loading && (
              <Grid item xs={12}>
                <Loading />
              </Grid>
            )}
            {!loading && listing && (
              <>
                <Grid item xs={12} md={9}>
                  <ListingShowcase listing={listing} />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card style={{ height: '100%' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography>
                          Why did RoofusAI recommend this property?
                        </Typography>
                        <Divider />
                        <Typography>{explanation}</Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    label="Tell us what you like and dislike about this property"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" onClick={() => next()}>
                    See Next Property Based on Feedback
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Container>
      <ViewFavoritesModal
        open={viewFavoritesModalOpen}
        onClose={() => setViewFavoritesModalOpen(false)}
      />
    </>
  );
};

export default Search;
