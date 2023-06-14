import { FC } from 'react';
import { Typography } from '@mui/material';

interface VideoTourProps {
  videoUrl: string;
}

export const VideoTour: FC<VideoTourProps> = ({ videoUrl }) => {
  return (
    <>
      <Typography variant="h2">Video Tour</Typography>
      <iframe
        src={videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: 'none', height: '50vh', width: '100%' }}
      ></iframe>
    </>
  );
};
