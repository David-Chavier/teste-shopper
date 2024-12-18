import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography, Grid, Alert } from '@mui/material';
import StaticMap from './components/StaticMap';
import { rideConfirm } from '../../services/rideService';
import { LocationState, RideCreateType } from '../../types/rideTypes';

const TravelOptionsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState;

  const { rideEstimateResult, userId, origin, destination } = state;

  const [error, setError] = useState<string | null>(null);

  const handleChooseDriver = async (driverId: number, driverName: string, driverValue: number) => {

    const newRide: RideCreateType = {
      customer_id: userId,
      destination: destination,
      distance: rideEstimateResult.distance,
      driver: {
        id: driverId, 
        name: driverName
      },
      duration: rideEstimateResult.duration,
      origin: origin,
      value: driverValue
    }

    rideConfirm(newRide).then((result)=>{
      navigate('/history', { state: rideEstimateResult.options });
    }).catch((error)=>{
      setError(error.response.data.error_description);
    })
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Opções de Viagem
      </Typography>

      <StaticMap encodedPath={rideEstimateResult.route.overview_polyline.points} />

      <Grid container spacing={2}>
        {rideEstimateResult.options.map((driver) => (
          <Grid item xs={12} sm={6} md={4} key={driver.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{driver.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {driver.description}
                </Typography>
                <Typography variant="body2">Veículo: {driver.vehicle}</Typography>
                <Typography variant="body2">Avaliação: {driver.review?.rating}/5</Typography>
                <Typography variant="body1" fontWeight="bold">
                  Valor: R$ {driver.value}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleChooseDriver(driver.id, driver.name, driver.value)}
                  sx={{ marginTop: 2 }}
                >
                  Escolher
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {error && (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{
            position: "fixed",
            bottom: 20,
            zIndex: 10,
            width: "300px",
          }}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default TravelOptionsPage;
