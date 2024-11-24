import { Request, Response } from "express";
import { googleMapsClient, getGoogleMapsAPIKey } from "../../../config/googleMaps.config";
import {driversMock} from "../../../shared/constants/drivers.constants";
import { Driver } from "../../../models/driver.model";
import { RideRepository } from "../../../database/ride.repository";

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
    res.status(500).json({
      error_code: "SERVER_ERROR",
      error_description: "Ocorreu um erro ao calcular a estimativa. Tente novamente mais tarde.",
    });
  }
};

export const confirmRide = async (req: Request, res: Response) => {
  try {
    const { customer_id, origin, destination, distance, duration, driver, value } = req.body;

    if (!customer_id || !origin || !destination || !distance || !driver || !value) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Todos os campos obrigatórios devem ser informados.",
      });
    }

    if (origin === destination) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Os endereços de origem e destino não podem ser iguais.",
      });
    }

    const selectedDriver: Driver | undefined = driversMock.find((d) => d.id === driver.id && d.name === driver.name);
    if (!selectedDriver) {
      return res.status(404).json({
        error_code: "DRIVER_NOT_FOUND",
        error_description: "O motorista informado não foi encontrado.",
      });
    }

    if (distance < selectedDriver.minKm) {
      return res.status(406).json({
        error_code: "INVALID_DISTANCE",
        error_description: `A quilometragem (${distance} km) é menor do que o mínimo aceito pelo motorista (${selectedDriver.minKm} km).`,
      });
    }

    await RideRepository.saveRide({
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver_id: driver.id,
      driver_name: driver.name,
      value,
    });

    return res.status(200).json({success: true});

  } catch (error: any) {
    if (error.message === "DATABASE_ERROR") {
      return res.status(500).json({
        error_code: "SERVER_ERROR",
        error_description: "Erro ao salvar os dados da viagem.",
      });
    }

    return res.status(500).json({
      error_code: "SERVER_ERROR",
      error_description: "Ocorreu um erro interno no servidor.",
    });
  }
};

export const getRidesByCustomer = async (req: Request, res: Response) => {
  try {
    const { customer_id } = req.params;
    const { driver_id } = req.query;

    if (!customer_id) {
      return res.status(400).json({
        error_code: "INVALID_CUSTOMER",
        error_description: "O id do usuário não pode estar em branco.",
      });
    }

    if (driver_id && isNaN(Number(driver_id))) {
      return res.status(400).json({
        error_code: "INVALID_DRIVER",
        error_description: "O id do motorista informado é inválido.",
      });
    }

    const rides = await RideRepository.findRidesByCustomer(
      customer_id,
      driver_id ? Number(driver_id) : undefined
    );

    if (rides.length === 0) {
      return res.status(404).json({
        error_code: "NO_RIDES_FOUND",
        error_description: "Nenhum registro encontrado.",
      });
    }

    return res.status(200).json({
      customer_id,
      rides,
    });
  } catch (error) {
    return res.status(500).json({
      error_code: "INTERNAL_ERROR",
      error_description: "Erro ao processar a solicitação.",
    });
  }
};