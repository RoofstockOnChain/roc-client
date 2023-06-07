import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { PropertyCard } from '../components/properties/PropertyCard';
import { Helmet } from 'react-helmet-async';
import { useHocToken } from '../hooks/useHocToken';
import { Property } from '../models/Property';

export const List: FC = () => {
  const { getProperties } = useHocToken();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const properties = getProperties();
    setProperties(properties);
  }, [getProperties]);

  return (
    <>
      <Helmet>
        <title>Roofstock onChain - Properties</title>
      </Helmet>
      <Grid container spacing={2} padding="1rem">
        {properties.map((property, index) => (
          <Grid key={index} item xs={12} md={4}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
