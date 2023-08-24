import { FC, useState } from 'react';
import Head from 'next/head';
import {
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

const Search: FC = () => {
  const [market, setMarket] = useState<string>('Columbia, SC');
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [desiredPrice, setDesiredPrice] = useState<number>(220000);
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
  });
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
          <Grid container spacing={2}>
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
                <Select size="small" value={bedrooms} disabled>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Bathrooms</InputLabel>
                <Select size="small" value={bathrooms} disabled>
                  <MenuItem value={2}>2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                size="small"
                label="Desired Price"
                value={desiredPrice}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                onClick={async () => await clearListingRecommendations()}
                fullWidth
              >
                Clear Data and Restart
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
                  <Button fullWidth variant="contained" onClick={() => next()}>
                    See Next Property Based on Feedback
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Search;
