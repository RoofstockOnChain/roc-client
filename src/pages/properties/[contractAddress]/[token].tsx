import React, { FC, useState } from 'react';
import type { PageProps } from 'gatsby';
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
import { Loading } from '../../../components/Loading';
import ReactMarkdown from 'react-markdown';
import { VideoTour } from '../../../components/properties/VideoTour';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { PropertyImages } from '../../../components/properties/PropertyImages';
import { PropertyDocuments } from '../../../components/properties/PropertyDocuments';
import { PropertyManagementSection } from '../../../components/properties/PropertyManagementSection';
import { NeighborhoodSection } from '../../../components/properties/NeighborhoodSection';
import { MarketSection } from '../../../components/properties/MarketSection';
import { useProperty } from '../../../hooks/useProperty';
import { Seo } from '../../../components/layout/Seo';
import { HeadFC } from 'gatsby';

const PropertyPage: FC<PageProps> = ({
  params: { contractAddress, token },
}) => {
  const [selectedTab, setSelectedTab] = useState<'images' | 'documents'>(
    'images'
  );
  const { property, isLoading } = useProperty(contractAddress!, token!);

  if (!property) {
    return <Loading />;
  }

  return (
    <Container maxWidth="xl">
      {isLoading && <Loading />}
      {!isLoading && (
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
      )}
    </Container>
  );
};
export default PropertyPage;

export const Head: HeadFC = () => (
  <Seo title="Roofstock onChain - Property Details" />
);
