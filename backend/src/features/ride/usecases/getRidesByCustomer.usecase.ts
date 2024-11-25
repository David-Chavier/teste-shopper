import { RideRepository } from "../../../database/ride.repository";
import { RideModel } from "../../../models/ride.model";
import { RideDTO } from "../../ride/dtos/ride.dto";

export const getRidesByCustomerUsecase = async (customer_id: string, driver_id?: number) => {
  try {
    const rides: RideModel[] = await RideRepository.findRidesByCustomer(customer_id, driver_id);

    if (!rides.length) {
      return {
        code: 404,
        data: {
          error_code: "NO_RIDES_FOUND",
          error_description: "Nenhum registro encontrado.",
        },
      };
    }

    const ridesDTO: RideDTO[] = rides.map((ride) => ({
      id: ride.id,
      date: ride.date,
      destination: ride.destination,
      distance: ride.distance,
      driver: {
        id: ride.driver_id,
        name: ride.driver_name
      },
      duration: ride.duration,
      origin: ride.origin,
      value: ride.value
    }));

    return {
      code: 200,
      data: {
        customer_id,
        ridesDTO,
      },
    };
  } catch (error: any) {

    return {
      code: 500,
      data: {
        error_code: "SERVER_ERROR",
        error_description: "Erro inesperado ao buscar corridas.",
      },
    };
  }
};
