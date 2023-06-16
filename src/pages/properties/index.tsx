import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Box, Container, Grid, styled, Typography } from '@mui/material';
import { Loading } from '../../components/Loading';
import { PropertyCard } from '../../components/properties/PropertyCard';
import { useProperties } from '../../hooks/useProperties';
import { Seo } from '../../components/layout/Seo';

const Orange = styled('span')`
  color: #fd9d4f;
`;

const PropertiesPage: FC<PageProps> = () => {
  const { properties, isLoading } = useProperties();

  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        justifyContent="center"
        color="#fff"
        sx={{ py: '2rem' }}
      >
        <Typography textAlign="center" variant="subtitle1">
          Real-world houses titled under individual LLCs as{' '}
          <Orange>Home onChain Tokens.</Orange>
          <br />
          Buy the token, become the single owner of the corresponding LLC -
          instantly.
        </Typography>
      </Box>
      {isLoading && <Loading />}
      {!isLoading && (
        <Grid container spacing={2} sx={{ px: 0 }} padding="1rem">
          {properties.map((property, index) => (
            <Grid key={index} item xs={12} md={4}>
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
export default PropertiesPage;

export const Head: HeadFC = () => (
  <Seo title="Roofstock onChain - Properties" />
);
