import { googleMapsClient, getGoogleMapsAPIKey } from "../../../config/googleMaps.config";

interface RouteData {
  distance: string; // Distância formatada (ex: "5 km")
  duration: string; // Duração formatada (ex: "15 mins")
  points: string;   // Linha codificada (polyline) para o trajeto
}

/**
 * Calcula a rota entre a origem e o destino usando a API Directions do Google Maps.
 * @param origin Local de origem no formato "latitude,longitude" ou endereço.
 * @param destination Local de destino no formato "latitude,longitude" ou endereço.
 * @returns Dados da rota: distância, duração e pontos (trajeto).
 */
export const calculateRoute = async (
  origin: string,
  destination: string
): Promise<RouteData> => {
  try {
    const apiKey = getGoogleMapsAPIKey(); // Obtém a API Key configurada

    // Faz a requisição para a API Directions
    const response = await googleMapsClient.get('/directions/json', {
      params: {
        origin,         // Origem (latitude, longitude ou endereço)
        destination,    // Destino (latitude, longitude ou endereço)
        mode: 'driving', // Tipo de transporte (opcional: walking, bicycling, transit)
        key: apiKey,    // API Key do Google Maps
      },
    });

    const data = response.data;

    // Verifica se a API retornou sucesso
    if (data.status !== 'OK') {
      throw new Error(
        `Erro ao calcular rota: ${data.error_message || data.status}`
      );
    }

    // Extrai dados relevantes da resposta
    const route = data.routes[0]; // Primeira rota encontrada
    const leg = route.legs[0];    // Primeira "perna" da viagem (etapa)

    return {
      distance: leg.distance.text,     // Distância formatada
      duration: leg.duration.text,     // Duração formatada
      points: route.overview_polyline.points, // Trajeto codificado (polyline)
    };
  } catch (error: any) {
    console.error('Erro ao calcular rota:', error.message);
    throw new Error('Não foi possível calcular a rota. Verifique os dados e tente novamente.');
  }
};
