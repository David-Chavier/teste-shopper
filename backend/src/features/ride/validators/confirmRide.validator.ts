import { DriverModel } from "../../../models/driver.model";

export const validateConfirmRideValidator = (
  customer_id: string,
  origin: string,
  destination: string,
  distance: number,
  driver: DriverModel,
  driversMock: DriverModel[],
  value: number
) => {
  if (!customer_id) {
    return {
      code: 400,
      data: {
        error_code: "INVALID_DATA",
        error_description: "Customer ID é obrigatório.",
      },
    };
  }

  if (origin === destination) {
    return {
      code: 400,
      data: {
        error_code: "INVALID_DATA",
        error_description: "Os endereços de origem e destino não podem ser iguais.",
      },
    };
  }

  const selectedDriver = driversMock.find((d) => d.id === driver.id && d.name === driver.name);
  if (!selectedDriver) {
    return {
      code: 404,
      data: {
        error_code: "DRIVER_NOT_FOUND",
        error_description: "O motorista informado não foi encontrado.",
      },
    };
  }

  if (distance < selectedDriver.minKm) {
    return {
      code: 406,
      data: {
        error_code: "INVALID_DISTANCE",
        error_description: `A quilometragem (${distance} km) é menor do que o mínimo aceito pelo motorista (${selectedDriver.minKm} km).`,
      },
    };
  }

  return null;
};
