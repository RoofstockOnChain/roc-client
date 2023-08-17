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

const Search: FC = () => {
  const { listing, getNextListing } = useListingRecommendationEngine();
  const [market, setMarket] = useState<string>('columbia-sc');
  const [likes, setLikes] = useState<string>('');
  const [dislikes, setDislikes] = useState<string>('');

  const next = () => {
    setLikes('');
    setDislikes('');
    getNextListing();
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
                  <Button variant="outlined">Clear Data and Restart</Button>
                </Stack>
              </Grid>
              <Grid item xs={10}>
                <ListingShowcase listing={listing} />
              </Grid>
              <Grid item xs={2}>
                <Card style={{ height: '100%' }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Select value={market} label="Market" disabled>
                        <MenuItem value="columbia-sc">Columbia, SC</MenuItem>
                      </Select>
                      <Typography>
                        Why did we recommend this property?
                      </Typography>
                      <Divider />
                      <Typography>
                        This is a random selection based on your basic filters.
                        As we learn more about what you are looking for,
                        recommendations will improve.
                      </Typography>
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
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Search;
