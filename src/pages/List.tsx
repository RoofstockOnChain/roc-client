import { Grid } from '@mui/material';
import { FC } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { useGetProperties } from '../hooks/useGetProperties';

export const List: FC = () => {
  const { properties } = useGetProperties();

  return (
    <>
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
