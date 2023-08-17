import { FC } from 'react';
import numeral from 'numeral';
import { Listing } from '@/models/Listing';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

interface ListingShowcaseProps {
  listing: Listing;
  onNextClick: () => void;
}

export const ListingShowcase: FC<ListingShowcaseProps> = ({
  listing,
  onNextClick,
}) => {
  return (
    <Card>
      <CardHeader
        title={`${listing.address1}, ${listing.city}, ${listing.state} ${listing.zip}`}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              src={listing.mainImageUrl}
              alt={`${listing.address1}, ${listing.city}, ${listing.state} ${listing.zip}`}
              width="100%"
            />
          </Grid>
          <Grid container item xs={12} md={6}>
            <Grid item xs={12}>
              <Typography>Description</Typography>
              <Typography>{listing.listingDescription}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Bedrooms</Typography>
              <Typography>{listing.bedrooms}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Bathrooms</Typography>
              <Typography>{listing.bathrooms}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Home Size</Typography>
              <Typography>
                {numeral(listing.homeSizeSquareFoot).format()} sq ft
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Lot Size</Typography>
              <Typography>
                {numeral(listing.lotSizeSquareFoot).format()} sq ft
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Year Built</Typography>
              <Typography>{listing.yearBuilt}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Listing Price</Typography>
              <Typography>
                {numeral(listing.listingPrice).format('$0,0')}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={5} fullWidth label="Feedback" />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined" onClick={onNextClick}>
              Next
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
