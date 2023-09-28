import React, { FC, useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
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

const Search: FC = () => {
  const [market, setMarket] = useState<Market>();

  return (
    <>
      <Head>
        <title>Roofstock onChain - Search</title>
      </Head>
      <Stack spacing={2}>
        {!market && <SearchCta markets={markets} selectMarket={setMarket} />}
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
          'linear-gradient(94deg, #93DFC2 0%, #FBE35A 100%), linear-gradient(32deg, #62D4EE 0%, rgba(98, 212, 238, 0) 93%), linear-gradient(117deg, #232A35 0%, rgba(0, 0, 0, 0) 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Box paddingTop="100px" paddingBottom="100px">
          <Stack direction="row" spacing={2}>
            <Autocomplete
              options={markets}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Market" />}
              getOptionLabel={(option) => option.displayName}
              onChange={(_, newValue) => {
                if (newValue) {
                  setMarket(newValue);
                }
              }}
              style={{ maxWidth: '600px' }}
            />
            <Button variant="outlined" onClick={search} disabled={!market}>
              Search
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

const MapWrapper = styled(Box)`
  height: 900px;
  width: 100%;
`;

const StyledStack = styled(Stack)`
  height: 900px;
  overflow-y: auto;
`;

interface SearchResultsProps {
  market: Market;
}

const SearchResults: FC<SearchResultsProps> = ({ market: defaultMarket }) => {
  const { mapboxAccessToken } = config;
  const { listingsMap } = useMap();
  const [market, setMarket] = useState<Market>(defaultMarket);

  const { listings, loading } = useListings({
    market: market.name,
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
          {loading && (
            <Grid item xs={12}>
              <Loading />
            </Grid>
          )}
          {!loading && (
            <>
              <Grid item xs={12}>
                <ListingFilter market={market} setMarket={setMarket} />
              </Grid>
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
                      <Grid key={index} item xs={12} md={6}>
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

interface ListingFilterProps {
  market: Market;
  setMarket: (market: Market) => void;
}

const ListingFilter: FC<ListingFilterProps> = ({ market, setMarket }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          size="small"
          options={markets}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Market" />}
          value={market}
          getOptionLabel={(option) => option.displayName}
          onChange={(_, newValue) => {
            if (newValue) {
              setMarket(newValue);
            }
          }}
        />
      </Grid>
    </Grid>
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
        <Typography>
          {listing.bedrooms} Beds | {listing.bathrooms} Baths|{' '}
          {numeral(listing.homeSizeSquareFoot).format()} Sq. Ft.
        </Typography>
        <Typography>{listing.address1}</Typography>
      </CardContent>
    </Card>
  );
};

export default Search;
