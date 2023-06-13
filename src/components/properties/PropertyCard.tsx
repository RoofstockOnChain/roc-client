import { FC } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Link,
  styled,
  Typography,
} from '@mui/material';
import { Property } from '../../models/Property';

const StyledCard = styled(Card)`
  height: 100%;
`;

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link href={`/properties/${property.contractAddress}/${property.token}`}>
      <StyledCard>
        <CardMedia
          component="img"
          image={property.imageUrl}
          alt={property.name}
          height="200px"
        />
        <CardContent>
          <Typography fontFamily="Roboto Mono">
            TOKEN ID: {property.token}
          </Typography>
          <Typography>{property.name}</Typography>
        </CardContent>
      </StyledCard>
    </Link>
  );
};
