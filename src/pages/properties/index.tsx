import { Box, Container, Grid, styled, Typography } from '@mui/material';
import { FC } from 'react';
import { PropertyCard } from '@/components/properties/PropertyCard';
import Head from 'next/head';
import { Property } from '@/models/Property';
import { GetStaticProps } from 'next';
import { getProperties } from '@/services/PropertiesService';

const Orange = styled('span')`
  color: ${(props) => props.theme.palette.custom.orange};
`;

interface PropertiesProps {
  properties: Property[];
}

const Properties: FC<PropertiesProps> = ({ properties }) => {
  return (
    <>
      <Head>
        <title>Roofstock onChain - Properties</title>
      </Head>
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
        <Grid container spacing={2} sx={{ px: 0 }} padding="1rem">
          {properties.map((property, index) => (
            <Grid key={index} item xs={12} md={4}>
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<PropertiesProps> = async () => {
  const properties = await getProperties();

  return {
    props: {
      properties,
    },
  };
};

export default Properties;
