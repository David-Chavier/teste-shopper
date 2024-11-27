import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, Button, Typography, Grid, Paper } from '@mui/material';

interface TravelHistory {
  id: string;
  date: string;
  driverName: string;
  origin: string;
  destination: string;
  distance: string;
  time: string;
  price: number;
}

const TravelHistoryPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('all');
  const [travelHistory, setTravelHistory] = useState<TravelHistory[]>([
    {
      id: '1',
      date: '2024-11-25 15:30',
      driverName: 'João',
      origin: 'Rua A, 123',
      destination: 'Av. B, 456',
      distance: '10 km',
      time: '15 min',
      price: 35.5,
    },
    {
      id: '2',
      date: '2024-11-24 10:00',
      driverName: 'Maria',
      origin: 'Praça C',
      destination: 'Rua D',
      distance: '8 km',
      time: '12 min',
      price: 30.0,
    },
  ]);

  const handleFilter = () => {
    console.log(`Filtrando viagens para o usuário ${userId} e motorista ${selectedDriver}`);
    // Simular um filtro com base nos critérios (aqui seria feita a chamada à API)
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Histórico de Viagens
      </Typography>

      {/* Filtros */}
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
          <MenuItem value="all">Mostrar Todos</MenuItem>
          <MenuItem value="João">João</MenuItem>
          <MenuItem value="Maria">Maria</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Aplicar Filtro
        </Button>
      </Box>

      {/* Lista de Viagens */}
      <Grid container spacing={2}>
        {travelHistory.map((travel) => (
          <Grid item xs={12} key={travel.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {travel.date}
              </Typography>
              <Typography>Motorista: {travel.driverName}</Typography>
              <Typography>Origem: {travel.origin}</Typography>
              <Typography>Destino: {travel.destination}</Typography>
              <Typography>Distância: {travel.distance}</Typography>
              <Typography>Tempo: {travel.time}</Typography>
              <Typography>Valor: R$ {travel.price.toFixed(2)}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TravelHistoryPage;
