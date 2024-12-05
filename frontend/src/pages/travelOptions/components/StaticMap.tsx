import React from 'react';
import { decode, encode } from '@googlemaps/polyline-codec';
import simplify from 'simplify-js';
import { Typography, Paper } from '@mui/material';

const googleMapsApiKey = process.env.GOOGLE_API_KEY;

interface MapProps {
  encodedPath: string;
}

const MAX_URL_LENGTH = 135;

const generateSimplifiedEncodedPath = (encodedPath: string): string => {
  let coordinates = decode(encodedPath);

  let tolerance = 0.0001;
  let simplifiedCoordinates = simplify(
    coordinates.map(([lat, lng]) => ({ x: lat, y: lng })),
    tolerance
  ).map(({ x, y }) => [x, y]);

  let simplifiedEncodedPath = encode(simplifiedCoordinates);
  let url = `https://maps.googleapis.com/maps/api/staticmap?size=1000x400&path=enc:${simplifiedEncodedPath}&key=${googleMapsApiKey}`;

  while (url.length > MAX_URL_LENGTH) {
    tolerance += 0.05;
    simplifiedCoordinates = simplify(
      coordinates.map(([lat, lng]) => ({ x: lat, y: lng })),
      tolerance
    ).map(({ x, y }) => [x, y]);

    simplifiedEncodedPath = encode(simplifiedCoordinates);
    url = `https://maps.googleapis.com/maps/api/staticmap?size=1000x400&path=enc:${simplifiedEncodedPath}&key=${googleMapsApiKey}`;
  }

  return simplifiedEncodedPath;
};

const StaticMap: React.FC<MapProps> = ({ encodedPath }) => {

  const simplifiedEncodedPath = generateSimplifiedEncodedPath(encodedPath);

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=1000x400&path=enc:${simplifiedEncodedPath}&key=${googleMapsApiKey}`;

  return (
    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Rota Estimada
      </Typography>
      <img
        src={staticMapUrl}
        alt="Mapa Estático da Rota"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </Paper>
  );
};

export default StaticMap;
