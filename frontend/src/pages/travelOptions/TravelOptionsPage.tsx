import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import StaticMap from './components/StaticMap';

const TravelOptionsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const travelOptions = location.state; 

  console.log(travelOptions)
  const handleChooseDriver = async (driverId: string) => {
    try {
      // Simular requisição para confirmar a viagem
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um delay da API
      alert(`Viagem confirmada com o motorista ID: ${driverId}`);
      navigate('/history'); // Redireciona para o histórico de viagens
    } catch (error) {
      alert('Erro ao confirmar a viagem. Tente novamente.');
    }
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Opções de Viagem
      </Typography>

      <StaticMap encodedPath={travelOptions.route.overview_polyline.points} />

      {/* Lista de Motoristas */}
      <Grid container spacing={2}>
        {travelOptions.options.map((driver: any) => (
          <Grid item xs={12} sm={6} md={4} key={driver.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{driver.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {driver.description}
                </Typography>
                <Typography variant="body2">Veículo: {driver.vehicle}</Typography>
                <Typography variant="body2">Avaliação: {driver.review.rating}/5</Typography>
                <Typography variant="body2">Comentario: {driver.review.comment}</Typography>
                <Typography variant="body1" fontWeight="bold">
                  Valor: R$ {driver.value}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleChooseDriver(driver.id)}
                  sx={{ marginTop: 2 }}
                >
                  Escolher
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TravelOptionsPage;
