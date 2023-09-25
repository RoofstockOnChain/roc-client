import { LngLatBounds } from 'mapbox-gl';

export const getMapBounds = (
  positions: { latitude: number; longitude: number }[]
): LngLatBounds | null => {
  if (positions.length === 0) {
    return null;
  }
  const latitudes = positions.map((x) => {
    return x.latitude;
  });
  const maxLat: number = Math.max(...latitudes);
  const minLat: number = Math.min(...latitudes);
  const longitudes = positions.map((x) => {
    return x.longitude;
  });
  const maxLong: number = Math.max(...longitudes);
  const minLong: number = Math.min(...longitudes);
  const southwesternCorner: [number, number] = [minLong, minLat];
  const northeasternCorner: [number, number] = [maxLong, maxLat];
  return new LngLatBounds(southwesternCorner, northeasternCorner);
};
