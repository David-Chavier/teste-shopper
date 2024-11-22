import express, { Request, Response } from 'express';
import { calcularDistancia } from './googleMapsService';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Rota para calcular a distância
app.post('/calcular-distancia', async (req: Request, res: Response) => {
  const { origem, destino } = req.body;

  if (!origem || !destino) {
    return res.status(400).json({ error: 'Origem e destino são obrigatórios.' });
  }

  try {
    const { distance, duration } = await calcularDistancia(origem, destino);
    return res.json({ distance, duration });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
