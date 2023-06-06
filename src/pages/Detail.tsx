import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useHocToken } from '../hooks/useHocToken';
import { Property } from '../models/Property';

export const Detail: FC = () => {
  const [property, setProperty] = useState<Property>();
  const { contractAddress, token } = useParams();
  const { getProperty } = useHocToken();

  useEffect(() => {
    const property = getProperty(contractAddress!, Number(token));
    setProperty(property);
  }, [getProperty, contractAddress, token]);

  if (!property) {
    return <></>;
  }

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
