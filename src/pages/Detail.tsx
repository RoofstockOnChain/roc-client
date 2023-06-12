import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useProperty } from '../hooks/useProperty';
import { Loading } from '../components/Loading';
import { MarketSection } from '../components/properties/MarketSection';
import { NeighborhoodSection } from '../components/properties/NeighborhoodSection';
import { PropertyDocuments } from '../components/properties/PropertyDocuments';
import { PropertyImages } from '../components/properties/PropertyImages';
import { PropertyManagementSection } from '../components/properties/PropertyManagementSection';

export const Detail: FC = () => {
  const [selectedTab, setSelectedTab] = useState<'images' | 'documents'>(
    'images'
  );
  const { contractAddress, token } = useParams();
  const { property, isLoading } = useProperty(contractAddress!, token!);

  if (!property) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Roofstock onChain - {property.name}</title>
      </Helmet>
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
            <Grid item xs={12}>
              <TabContext value={selectedTab}>
                <TabList onChange={(_, newValue) => setSelectedTab(newValue)}>
                  <Tab label="Images" value="images" />
                  <Tab label="Documents" value="documents" />
                </TabList>
                <TabPanel value="images">
                  <PropertyImages images={property.images} />
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
    </>
  );
};
