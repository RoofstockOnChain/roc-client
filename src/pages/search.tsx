import { FC } from 'react';
import Head from 'next/head';
import { Box, Container, IconButton } from '@mui/material';
import { ListingShowcase } from '@/components/listings/ListingShowcase';
import { useListingRecommendationEngine } from '@/hooks/useListingRecommendationEngine';

const Search: FC = () => {
  const { listing, getNextListing } = useListingRecommendationEngine();

  return (
    <>
      <Head>
        <title>Roofstock onChain - Search</title>
      </Head>
      <Container maxWidth="xl">
        <Box padding="1rem">
          {listing && (
            <ListingShowcase
              listing={listing}
              onNextClick={() => getNextListing()}
            />
          )}
        </Box>
      </Container>
    </>
  );
};

export default Search;
