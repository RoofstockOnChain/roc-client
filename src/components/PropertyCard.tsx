import { FC } from 'react';
import { Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { Property } from '../models/Property';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link href={`/properties/${property.contractAddress}/${property.token}`}>
      <Card>
        <CardMedia
          component="img"
          image={property.imageUrl}
          alt={property.name}
          height="200px"
        />
        <CardContent>
          <Typography>{property.name}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
