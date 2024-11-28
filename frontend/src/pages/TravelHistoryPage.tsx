import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, Button, Typography, Grid, Paper, Alert } from '@mui/material';
import { ridesGet } from '../services/rideService';
import { useLocation } from 'react-router-dom';
import { Driver } from '../types/rideTypes';

const TravelHistoryPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as Driver[];

  const drivers = state;

  const [userId, setUserId] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<string | undefined>();
  const [travelHistory, setTravelHistory] = useState<any | undefined>();
  const [error, setError] = useState<string | null>(null);

  function handleFilter(){
    setError(null);

    if(userId == ""){
      return setError("ID do usuário é obrigatório");
    }

    ridesGet(userId, selectedDriver).then((rideEstimateResult)=>{
      setTravelHistory(rideEstimateResult)
    }).catch((error)=>{
      setError(error.response.data.error_description);
    })
  }

  function formatDateTimeSimple(isoString: string): string {
    const date = new Date(isoString);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Histórico de Viagens
      </Typography>

      <Box display="flex" gap={2} alignItems="center" marginBottom={4}>
      <TextField
        label="ID do Usuário"
        variant="outlined"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        fullWidth
      />
      <Select
        value={selectedDriver}
        onChange={(e) => setSelectedDriver(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="">Mostrar Todos</MenuItem>
        {drivers.map((driver) => (
          <MenuItem key={driver.id} value={driver.id}>
            {driver.name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={handleFilter}>
        Aplicar Filtro
      </Button>
    </Box>

      <Grid container spacing={2}>
        {travelHistory?.rides.map((travel: any) => (
          <Grid item xs={12} key={travel.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {formatDateTimeSimple(travel.date)}
              </Typography>
              <Typography>Motorista: {travel.driver.name}</Typography>
              <Typography>Origem: {travel.origin}</Typography>
              <Typography>Destino: {travel.destination}</Typography>
              <Typography>Distância: {travel.distance}</Typography>
              <Typography>Tempo: {travel.duration}</Typography>
              <Typography>Valor: R$ {Number(travel.value).toFixed(2)}</Typography>
            </Paper>
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

export default TravelHistoryPage;
