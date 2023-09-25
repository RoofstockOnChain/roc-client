import React, { FC, useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { ListingShowcase } from '@/components/listings/ListingShowcase';
import { useListingRecommendationEngine } from '@/hooks/useListingRecommendationEngine';
import { Loading } from '@/components/Loading';
import { getListingFeedbackForUser } from '@/services/ListingFeedbackService';
import { TypeAnimation } from 'react-type-animation';
import { Map, Marker, useMap } from 'react-map-gl';
import { config } from '@/config';
import { useListings } from '@/hooks/useListings';
import { Listing } from '@/models/Listing';
import numeral from 'numeral';
import { getMapBounds } from '@/helpers/MapHelper';
import { LngLatBounds } from 'mapbox-gl';

const Search: FC = () => {
  const [mode, setMode] = useState<
    'cta' | 'buy-box-builder' | 'search-results'
  >('cta');
  const [market, setMarket] = useState<string>('Columbia, SC');

  return (
    <>
      <Head>
        <title>Roofstock onChain - Search</title>
      </Head>
      <Stack spacing={2}>
        {mode === 'cta' && (
          <SearchCta
            onStartBuyBoxBuilder={() => setMode('buy-box-builder')}
            onSkipBuyBoxBuilder={() => setMode('search-results')}
          />
        )}
        {mode === 'buy-box-builder' && (
          <BuyBoxBuilder
            market={market}
            onRestart={() => setMode('cta')}
            onSkip={() => setMode('search-results')}
          />
        )}
        {mode === 'search-results' && (
          <SearchResults market={market} onRestart={() => setMode('cta')} />
        )}
      </Stack>
    </>
  );
};

const StyledTypography = styled(Typography)``;

interface SearchCtaProps {
  onStartBuyBoxBuilder: () => void;
  onSkipBuyBoxBuilder: () => void;
}

const SearchCta: FC<SearchCtaProps> = ({
  onStartBuyBoxBuilder,
  onSkipBuyBoxBuilder,
}) => {
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
        <Box width={{ sm: '70%' }} paddingTop="100px" paddingBottom="100px">
          <StyledTypography variant="h3">
            <TypeAnimation
              sequence={[
                "I'm looking for 2 bed, 1 bath homes around 200K",
                1000,
              ]}
              repeat={Infinity}
            />
          </StyledTypography>
          <Box paddingTop="1rem">
            <Button variant="outlined" onClick={onStartBuyBoxBuilder}>
              Try it now
            </Button>
            <Button onClick={onSkipBuyBoxBuilder}>Skip</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

interface BuyBoxBuilderProps {
  market: string;
  onRestart: () => void;
  onSkip: () => void;
}

const BuyBoxBuilder: FC<BuyBoxBuilderProps> = ({
  market,
  onRestart,
  onSkip,
}) => {
  const [tone, setTone] = useState<string>('professional');
  const {
    listing,
    getNextListing,
    explanation,
    clearListingRecommendations,
    loading,
  } = useListingRecommendationEngine({
    market,
    tone,
  });
  const [feedback, setFeedback] = useState<string>('');
  const next = async () => {
    await getNextListing({
      mlsListingId: listing?.mlsListingId!,
      feedback,
    });
    setFeedback('');
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} paddingY={2}>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
          <Button
            variant="outlined"
            onClick={async () => {
              onRestart();
              await clearListingRecommendations();
            }}
            fullWidth
          >
            Restart
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="outlined" fullWidth onClick={() => onSkip()}>
            Skip
          </Button>
        </Grid>
        {loading && (
          <Grid item xs={12}>
            <Loading />
          </Grid>
        )}
        {!loading && listing && (
          <>
            <Grid item xs={12} md={3}>
              <Card style={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography>
                      Why did RoofusAI recommend this property?
                    </Typography>
                    <Divider />
                    <Typography>{explanation}</Typography>
                    <TextField
                      multiline
                      rows={4}
                      fullWidth
                      label="Tell us what you like and dislike about this property"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => next()}
                    >
                      See Next Property Based on Feedback
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={9}>
              <ListingShowcase listing={listing} />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <RecommendationLog />
        </Grid>
      </Grid>
    </Container>
  );
};

const RecommendationLog: FC = () => {
  const listingFeedbackForUser = getListingFeedbackForUser();

  if (listingFeedbackForUser.length === 0) {
    return null;
  }

  return (
    <>
      <Typography>RoofusAI's Recommendation Log</Typography>
      {listingFeedbackForUser.map((listingFeedback, index) => (
        <Card key={index}>
          <CardHeader title={`#${index + 1}`} />
          <CardContent>{listingFeedback.feedback}</CardContent>
        </Card>
      ))}
    </>
  );
};

const MapWrapper = styled(Box)`
  height: 900px;
  width: 100%;
`;

interface SearchResultsProps {
  market: string;
  onRestart: () => void;
}

const SearchResults: FC<SearchResultsProps> = ({ market, onRestart }) => {
  const { mapboxAccessToken } = config;
  const { listingsMap } = useMap();
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [desiredPrice, setDesiredPrice] = useState<number>(250000);

  const { listings, loading } = useListings({
    market,
    bedrooms,
    bathrooms,
    desiredPrice,
  });

  useEffect(() => {
    if (listingsMap && listings?.length > 0) {
      const listingPositions = listings.map((x) => ({
        latitude: x.latitude,
        longitude: x.longitude,
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
          <Grid item xs={12} md={4}>
            <Button variant="outlined" fullWidth onClick={() => onRestart()}>
              Try the BuyBox Builder
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <MapWrapper>
              <Map
                id="listingsMap"
                mapboxAccessToken={mapboxAccessToken}
                mapStyle="mapbox://styles/mapbox/streets-v12"
              >
                {listings.map((listing, index) => (
                  <Marker
                    key={index}
                    latitude={listing.latitude}
                    longitude={listing.longitude}
                  />
                ))}
              </Map>
            </MapWrapper>
          </Grid>
          <Grid container item xs={12} md={6} spacing={1}>
            {loading && (
              <Grid item xs={12}>
                <Loading />
              </Grid>
            )}
            {!loading && (
              <>
                {listings.map((listing, index) => (
                  <Grid key={index} item xs={12} md={6}>
                    <ListingCard listing={listing} />
                  </Grid>
                ))}
                {listings.length === 0 && (
                  <Grid item xs={12}>
                    No results found.
                  </Grid>
                )}
              </>
            )}
          </Grid>
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
        height="184px"
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
