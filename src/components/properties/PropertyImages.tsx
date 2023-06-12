import { Image } from '../../models/Image';
import { FC } from 'react';
import { Grid } from '@mui/material';

interface PropertyImagesProps {
  images?: Image[];
}

export const PropertyImages: FC<PropertyImagesProps> = ({ images }) => {
  if (!images) {
    return <></>;
  }

  return (
    <Grid container spacing={2}>
      {images.map((image, index) => (
        <Grid key={index} item xs={12} md={3}>
          <img
            src={image.imageUrl}
            alt={image.description}
            height="100%"
            width="100%"
          />
        </Grid>
      ))}
    </Grid>
  );
};
