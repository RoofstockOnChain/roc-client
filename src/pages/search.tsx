import React, { FC, useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Loading } from '@/components/Loading';
import { Map, Marker, useMap } from 'react-map-gl';
import { config } from '@/config';
import { useListings } from '@/hooks/useListings';
import { Listing } from '@/models/Listing';
import numeral from 'numeral';
import { getMapBounds } from '@/helpers/MapHelper';
import { markets } from '@/data/markets';
import { Market } from '@/models/Market';
import { TypeAnimation } from 'react-type-animation';
import { Chat } from '@/components/search/Chat';
import { useAiChat } from '@/hooks/useAiChat';

const Search: FC = () => {
  const [market, setMarket] = useState<Market>();

  return (
    <>
      <Head>
        <title>Roofstock onChain - Search</title>
      </Head>
      <Stack spacing={2}>
        {!market && (
          <>
            <SearchCta markets={markets} selectMarket={setMarket} />
            <CriteriaExample />
          </>
        )}
        {market && <SearchResults market={market} />}
      </Stack>
    </>
  );
};

interface SearchCtaProps {
  markets: Market[];
  selectMarket: (market: Market) => void;
}

const SearchCta: FC<SearchCtaProps> = ({ markets, selectMarket }) => {
  const [market, setMarket] = useState<Market>();

  const search = () => {
    if (market) {
      selectMarket(market);
    }
  };

  return (
    <Box
      component="section"
      color="#fff"
      sx={{
        background:
          'linear-gradient(92deg, rgba(147, 223, 194, 0.90) 0%, rgba(255, 247, 91, 0.50) 100%), linear-gradient(122deg, #232A35 0%, rgba(35, 42, 53, 0) 100%), linear-gradient(42deg, rgba(182, 241, 202, 0.70) 0%, rgba(182, 241, 202, 0) 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2} paddingY="100px">
          <Grid item xs={12}>
            <Typography variant="h1">Meet RoofusAI!</Typography>
            <Typography variant="subtitle1" paddingY="20px">
              RoofusAI is an AI powered real estate assistant. You can have a
              chat with him about what you are looking for.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Autocomplete
                options={markets}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Market" />
                )}
                getOptionLabel={(option) => option.displayName}
                onChange={(_, newValue) => {
                  if (newValue) {
                    setMarket(newValue);
                  }
                }}
                style={{ maxWidth: '600px' }}
              />
              <Button variant="contained" onClick={search} disabled={!market}>
                Search
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const CriteriaExample: FC = () => {
  return (
    <Box style={{ backgroundColor: '#FBE35A', marginTop: 0 }}>
      <Container maxWidth="xl">
        <Stack paddingY="100px">
          <Typography
            variant="subtitle1"
            fontFamily="Roboto Mono"
            paddingY="20px"
          >
            <TypeAnimation
              sequence={[
                'I am looking for a 3 bedroom, 2 bathroom house with over 1200 sq ft.',
                1000,
                'I am looking for a 3 bedroom, 2 bathroom house with over 1500 sq ft. I prefer newer properties.  My budget is $250K.',
              ]}
            />
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

const MapWrapper = styled(Box)`
  height: 600px;
  width: 100%;
`;

const StyledStack = styled(Stack)`
  height: 600px;
  overflow-y: auto;
`;

interface SearchResultsProps {
  market: Market;
}

const SearchResults: FC<SearchResultsProps> = ({ market: defaultMarket }) => {
  const { mapboxAccessToken } = config;
  const { listingsMap } = useMap();
  const [market, setMarket] = useState<Market>(defaultMarket);
  const { messages, addUserMessage, loading: chatLoading } = useAiChat();

  const { listings, loading, refresh } = useListings({
    market: market.name,
    messages,
  });

  useEffect(() => {
    if (listingsMap && listings?.length > 0) {
      const listingPositions = listings
        .filter((x) => x.latitude && x.longitude)
        .map((x) => ({
          latitude: x.latitude!,
          longitude: x.longitude!,
        }));
      const mapBounds = getMapBounds(listingPositions);
      if (mapBounds) {
        listingsMap.fitBounds(mapBounds, { padding: 50 });
      }
    }
  }, [listingsMap, listings]);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2} paddingY={1}>
          <Grid item xs={12}>
            <Chat
              messages={messages}
              addUserMessage={addUserMessage}
              loading={chatLoading}
            />
          </Grid>
          {loading && (
            <Grid item xs={12}>
              <Loading />
            </Grid>
          )}
          {!loading && (
            <>
              <Grid item xs={12} md={6}>
                <MapWrapper>
                  <Map
                    id="listingsMap"
                    mapboxAccessToken={mapboxAccessToken}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    initialViewState={{
                      latitude: 37.0902,
                      longitude: -95.7129,
                      zoom: 4,
                    }}
                  >
                    {listings
                      .filter((x) => x.latitude && x.longitude)
                      .map((listing, index) => (
                        <Marker
                          key={index}
                          latitude={listing.latitude!}
                          longitude={listing.longitude!}
                        />
                      ))}
                  </Map>
                </MapWrapper>
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledStack>
                  <Grid container spacing={2}>
                    {listings.map((listing, index) => (
                      <Grid key={index} item xs={12} lg={6}>
                        <ListingCard listing={listing} />
                      </Grid>
                    ))}
                  </Grid>
                </StyledStack>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: FC<ListingCardProps> = ({ listing }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={listing.mainImageUrl}
        alt={listing.address1}
        height="200px"
      />
      <CardContent>
        <Typography>{numeral(listing.listingPrice).format('$0,0')}</Typography>
        <Typography fontSize="0.8rem">
          {listing.bedrooms} Beds | {listing.bathrooms} Baths |{' '}
          {numeral(listing.homeSizeSquareFoot).format()} Sq. Ft. | Built in{' '}
          {listing.yearBuilt}
        </Typography>
        <Typography fontSize="0.7rem">
          {listing.address1}, {listing.city}, {listing.state} {listing.zip}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Search;
