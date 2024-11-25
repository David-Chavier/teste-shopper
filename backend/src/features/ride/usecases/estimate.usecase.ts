import { googleMapsClient } from "../../../config/googleMaps.config";
import { DriverModel } from "../../../models/driver.model";

export const calculateEstimateUsecase = async (
  origin: string,
  destination: string,
  driversMock: DriverModel[]
) => {
  try {
    const routeResponse = await googleMapsClient.get("/directions/json", {
      params: { origin, destination, key: process.env.GOOGLE_API_KEY },
    });

    if (!routeResponse.data?.routes?.length) {
      return {
        code: 400,
        data: {
          error_code: "INVALID_DATA",
          error_description: "Não foi possível calcular a rota com os dados fornecidos.",
        },
      };
    }

    const route = routeResponse.data.routes[0];
    const { legs } = route;
    const { distance, duration, start_location, end_location } = legs[0];
    const distanceInKm = parseFloat(distance.value) / 1000;

    const options = driversMock
      .filter((driver) => distanceInKm >= driver.minKm)
      .map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: driver.review,
        value: parseFloat((distanceInKm * driver.ratePerKm).toFixed(2)),
      }))
      .sort((a, b) => a.value - b.value);

    return {
      code: 200,
      data: {
        origin: { latitude: start_location.lat, longitude: start_location.lng },
        destination: { latitude: end_location.lat, longitude: end_location.lng },
        distance: distanceInKm,
        duration: duration.text,
        options,
        route,
      },
    };
  } catch (error: any) {
    if (error.response) {
      return {
        code: error.response.status || 500,
        data: {
          error_code: "GOOGLE_MAPS_ERROR",
          error_description: error.response.data.error_message || "Erro ao acessar o serviço do Google Maps.",
        },
      };
    }

    return {
      code: 500,
      data: {
        error_code: "SERVER_ERROR",
        error_description: "Erro inesperado ao calcular a estimativa.",
      },
    };
  }
};
