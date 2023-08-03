import { FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Paper,
} from '@mui/material';
import { useHomesOnChainToken } from '@/hooks/useHomesOnChainToken';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Loading } from '@/components/Loading';
import RefreshIcon from '@mui/icons-material/Refresh';

export const MyHomes: FC = () => {
  const { myProperties, myPropertiesLoading, myPropertiesRefresh } =
    useHomesOnChainToken();

  return (
    <Card>
      <CardHeader
        title="My Homes"
        action={
          <>
            <IconButton onClick={async () => await myPropertiesRefresh()}>
              <RefreshIcon />
            </IconButton>
          </>
        }
      />
      <CardContent>
        {myPropertiesLoading && <Loading />}
        {!myPropertiesLoading && (
          <>
            {myProperties?.length === 0 && <>No properties found</>}
            {myProperties != null && myProperties.length > 0 && (
              <Grid container spacing={2} sx={{ px: 0 }} padding="1rem">
                {myProperties.map((property, index) => (
                  <Grid key={index} item xs={12} md={4}>
                    <PropertyCard property={property} />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
