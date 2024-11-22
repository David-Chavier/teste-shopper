import { Request, Response } from 'express';
import { calcularDistancia } from '../services/googleMapsService';

export const calculateDistance = async (req: Request, res: Response) => {
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
};

export const getTravels = (req: Request, res: Response) => {
  // Implemente lógica para retornar viagens do banco
  res.json({ message: 'Lista de viagens' });
};

export const confirmTravel = (req: Request, res: Response) => {
  // Implemente lógica para confirmar a viagem
  res.json({ message: 'Viagem confirmada' });
};
