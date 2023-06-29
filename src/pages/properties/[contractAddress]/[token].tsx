import { FC, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Tab,
  Typography,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Loading } from '@/components/Loading';
import { MarketSection } from '@/components/properties/MarketSection';
import { NeighborhoodSection } from '@/components/properties/NeighborhoodSection';
import { PropertyDocuments } from '@/components/properties/PropertyDocuments';
import { PropertyImages } from '@/components/properties/PropertyImages';
import { PropertyManagementSection } from '@/components/properties/PropertyManagementSection';
import { VideoTour } from '@/components/properties/VideoTour';
import Head from 'next/head';
import { Property } from '@/models/Property';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getProperties, getProperty } from '@/services/PropertiesService';

interface PropertyDetailProps {
  property: Property;
}

const PropertyDetail: FC<PropertyDetailProps> = ({ property }) => {
  const [selectedTab, setSelectedTab] = useState<'images' | 'documents'>(
    'images'
  );

  if (!property) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{`Roofstock onChain - ${property.name}`}</title>
      </Head>
      <Container maxWidth="xl">
        <Grid container spacing={2} padding="1rem">
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
            <Typography variant="h5" color="#fff" sx={{ py: '1rem' }}>
              {property.name}
            </Typography>
            <Card>
              <CardHeader title="Description" />
              <CardContent>
                <ReactMarkdown>{property.description}</ReactMarkdown>
              </CardContent>
            </Card>
          </Grid>
          {property.videoWalkthroughUrl && (
            <Grid item xs={12}>
              <VideoTour videoUrl={property.videoWalkthroughUrl} />
            </Grid>
          )}
          <Grid item xs={12}>
            <TabContext value={selectedTab}>
              <TabList onChange={(_, newValue) => setSelectedTab(newValue)}>
                <Tab label="Images" value="images" />
                <Tab label="Documents" value="documents" />
              </TabList>
              <TabPanel value="images">
                <PropertyImages
                  images={property.images}
                  threeDTourUrl={property.threeDTourUrl}
                />
              </TabPanel>
              <TabPanel value="documents">
                <PropertyDocuments documents={property.documents} />
              </TabPanel>
            </TabContext>
          </Grid>
          <Grid item xs={12}>
            <PropertyManagementSection
              propertyManagers={property.propertyManagementOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <NeighborhoodSection property={property} />
          </Grid>
          <Grid item xs={12}>
            <MarketSection cbsaCode={property.cbsaCode} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<PropertyDetailProps> = async ({
  params,
}) => {
  if (!params || !params.contractAddress || !params.token) {
    return {
      notFound: true,
    };
  }

  const property = await getProperty(
    params.contractAddress.toString(),
    params.token.toString()
  );

  if (!property) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      property,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const properties = await getProperties();

  return {
    paths: properties.map((property) => ({
      params: {
        contractAddress: property.contractAddress,
        token: property.token,
      },
    })),
    fallback: false,
  };
};

export default PropertyDetail;
