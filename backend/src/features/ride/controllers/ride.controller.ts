import { Request, Response } from "express";
import { googleMapsClient, getGoogleMapsAPIKey } from "../../../config/googleMaps.config";
import {driversMock} from "../../../shared/constants/drivers.constants";
import { Driver } from "../../../models/driver.model";

export const estimate = async (req: Request, res: Response) => {
  try {
    const { customer_id, origin, destination } = req.body;

    if (!customer_id || !origin || !destination) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Customer ID, origin e destination são obrigatórios.",
      });
    }

    if (origin === destination) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Origin e destination não podem ser iguais.",
      });
    }

    const apiKey = getGoogleMapsAPIKey();

    const routeResponse = await googleMapsClient.get("/directions/json", {
      params: {
        origin,
        destination,
        key: apiKey,
      },
    });

    if (!routeResponse.data || !routeResponse.data.routes || routeResponse.data.routes.length === 0) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Não foi possível calcular a rota com os dados fornecidos.",
      });
    }

    const route = routeResponse.data.routes[0];
    const { legs } = route;
    const { distance, duration, start_location, end_location } = legs[0];

    const distanceInKm = parseFloat(distance.value) / 1000;

    const options = driversMock
      .filter((driver: Driver) => distanceInKm >= driver.minKm) 
      .map((driver: Driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: driver.review,
        value: parseFloat((distanceInKm * driver.ratePerKm).toFixed(2)),
      }))
      .sort((a, b) => a.value - b.value);

    res.status(200).json({
      origin: {
        latitude: start_location.lat,
        longitude: start_location.lng,
      },
      destination: {
        latitude: end_location.lat,
        longitude: end_location.lng,
      },
      distance: distanceInKm,
      duration: duration.text,
      options,
      routeResponse: route,
    });
  } catch (error) {
    console.error("Erro no endpoint /ride/estimate:", error);
    res.status(500).json({
      error_code: "SERVER_ERROR",
      error_description: "Ocorreu um erro ao calcular a estimativa. Tente novamente mais tarde.",
    });
  }
};
