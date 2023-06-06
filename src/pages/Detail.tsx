import { FC } from 'react';
import { useGetProperty } from '../hooks/useGetProperty';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export const Detail: FC = () => {
  const { contractAddress, token } = useParams();
  const { property } = useGetProperty(contractAddress!, Number(token));

  return (
    <>
      <Helmet>
        <title>Roofstock onChain - {property.name}</title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardMedia
              component="img"
              image={property.imageUrl}
              alt={property.name}
              height="100%"
              width="100%"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h3">{property.name}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
