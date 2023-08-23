import { FC, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ListingShowcase } from '@/components/listings/ListingShowcase';
import { useListingRecommendationEngine } from '@/hooks/useListingRecommendationEngine';
import { Loading } from '@/components/Loading';

const Search: FC = () => {
  const {
    listing,
    getNextListing,
    explanation,
    clearListingRecommendations,
    loading,
  } = useListingRecommendationEngine();
  const [market, setMarket] = useState<string>('columbia-sc');
  const [likes, setLikes] = useState<string>('');
  const [dislikes, setDislikes] = useState<string>('');

  const next = async () => {
    await getNextListing({
      mlsListingId: listing?.mlsListingId!,
      pros: likes,
      cons: dislikes,
    });
    setLikes('');
    setDislikes('');
  };

  return (
    <>
      <Head>
        <title>Roofstock onChain - Search</title>
      </Head>
      <Container maxWidth="xl">
        <Box padding="1rem">
          {listing && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="end">
                  <Button
                    variant="outlined"
                    onClick={async () => await clearListingRecommendations()}
                  >
                    Clear Data and Restart
                  </Button>
                </Stack>
              </Grid>
              {loading && (
                <Grid item xs={12}>
                  <Loading />
                </Grid>
              )}
              {!loading && (
                <>
                  <Grid item xs={12} md={9}>
                    <ListingShowcase listing={listing} />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Card style={{ height: '100%' }}>
                      <CardContent>
                        <Stack spacing={2}>
                          <Select value={market} label="Market" disabled>
                            <MenuItem value="columbia-sc">
                              Columbia, SC
                            </MenuItem>
                          </Select>
                          <Typography>
                            Why did we recommend this property?
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
                      label="Tell us what you like about this property"
                      value={likes}
                      onChange={(e) => setLikes(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={4}
                      fullWidth
                      label="Tell us what you dislike about this property"
                      value={dislikes}
                      onChange={(e) => setDislikes(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => next()}
                    >
                      See Next Property Based on Feedback
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Search;
