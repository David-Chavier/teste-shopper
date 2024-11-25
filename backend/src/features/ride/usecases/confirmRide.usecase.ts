import { RideRepository } from "../../../database/ride.repository";
import { RideCreateType } from "../../../types/ride.Type";

export const confirmRideUsecase = async (rideData: RideCreateType) => {
  try {
    await RideRepository.saveRide(rideData);
    return {
      code: 200,
      data: {
        success: true
      },
    };
  } catch (error: any) {
    return {
      code: 500,
      data: {
        error_code: "SERVER_ERROR",
        error_description: "Erro ao salvar a viagem no banco de dados.",
      },
    };
  }
};
