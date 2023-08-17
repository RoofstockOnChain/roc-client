import { FC, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Grid, Stack, TextField } from '@mui/material';
import { ListingShowcase } from '@/components/listings/ListingShowcase';
import { useListingRecommendationEngine } from '@/hooks/useListingRecommendationEngine';

const Search: FC = () => {
  const { listing, getNextListing } = useListingRecommendationEngine();
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
                <ListingShowcase listing={listing} />
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
                <Button fullWidth variant="outlined" onClick={() => next()}>
                  Next
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
