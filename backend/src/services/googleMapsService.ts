import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


export interface DistanceResponse {
  distance: string;
  duration: string;
}

export async function calcularDistancia(origem: string, destino: string): Promise<DistanceResponse> {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY não está definida no arquivo .env");
  }

  // URL para chamar a API Distance Matrix
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origem}&destinations=${destino}&key=${apiKey}`;

  try {
    const resposta = await axios.get(url);
    
    // Extrair dados de distância e duração
    const distancia = resposta.data.rows[0].elements[0].distance.text; // Exemplo: '10 km'
    const duracao = resposta.data.rows[0].elements[0].duration.text; // Exemplo: '1h 30min'

    return { distance: distancia, duration: duracao };
  } catch (error) {
    console.error('Erro ao calcular a distância:', error);
    throw new Error('Não foi possível calcular a distância.');
  }
}