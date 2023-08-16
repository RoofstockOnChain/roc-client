import { Image } from '../../models/Image';
import { FC } from 'react';
import { Grid } from '@mui/material';

interface PropertyImagesProps {
  images?: Image[];
  threeDTourUrl?: string;
}

export const PropertyImages: FC<PropertyImagesProps> = ({
  images,
  threeDTourUrl,
}) => {
  if (!images) {
    return <></>;
  }

  return (
    <Grid container spacing={2}>
      {threeDTourUrl && (
        <Grid item xs={12} md={3}>
          <iframe
            title="3D Tour"
            src={threeDTourUrl}
            allowFullScreen
            allow="xr-spatial-tracking"
            style={{
              border: 'none',
              height: '100%',
              minHeight: '200px',
              width: '100%',
            }}
          ></iframe>
        </Grid>
      )}
      {images.length === 0 && <>No images found</>}
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
