import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { rideEstimate } from '../services/rideService';

const TravelRequestPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !origin || !destination) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    RideEstimate()
  };

  function RideEstimate(){
    setError(null);

    rideEstimate(userId, origin, destination).then((rideEstimateResult)=>{
      navigate('/options', { state: {rideEstimateResult, userId, origin, destination} });
    }).catch((error)=>{
      setError(error.response.data.error_description);
    })
  }

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: '0 auto',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Solicitação de Viagem
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="ID do Usuário"
          variant="outlined"
          fullWidth
          value={userId}
          onChange={(e: any) => setUserId(e.target.value)}
          required
        />

        <TextField
          label="Endereço de Origem"
          variant="outlined"
          fullWidth
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />

        <TextField
          label="Endereço de Destino"
          variant="outlined"
          fullWidth
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />

        {error && (
          <Alert
            severity="error"
            onClose={() => setError(null)}
            sx={{
              position: "fixed",
              bottom: 20,
              zIndex: 10,
              minWidth: "300px",
            }}
          >
            {error}
          </Alert>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Estimar valor da viagem
        </Button>
      </form>
    </Box>
  );
};

export default TravelRequestPage;
