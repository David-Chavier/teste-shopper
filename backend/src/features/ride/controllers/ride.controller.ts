import { Request, Response } from "express";
import { validateEstimateValidator } from "../validators/estimate.validator";
import { validateConfirmRideValidator } from "../validators/confirmRide.validator";
import { validateGetRidesByCustomerValidator } from "../validators/getRidesByCustomer.validator";
import { calculateEstimateUsecase } from "../usecases/estimate.usecase";
import { confirmRideUsecase } from "../usecases/confirmRide.usecase";
import { getRidesByCustomerUsecase } from "../usecases/getRidesByCustomer.usecase";
import { driversMock } from "../../../shared/constants/drivers.constants";
import { sendResponse } from "../../../utils/response.util";

export const estimateController = async (req: Request, res: Response) => {
  const { customer_id, origin, destination } = req.body;

  const validationError = validateEstimateValidator(customer_id, origin, destination);
  if (validationError) return sendResponse(res, validationError.code, validationError.data);

  const estimate = await calculateEstimateUsecase(origin, destination, driversMock);
  sendResponse(res, estimate.code, estimate.data);
};

export const confirmRideController = async (req: Request, res: Response) => {
  const { customer_id, origin, destination, distance, duration, driver, value } = req.body;

  const validationError = validateConfirmRideValidator(customer_id, origin, destination, distance, driver, driversMock, value);
  if (validationError) return sendResponse(res, validationError.code, validationError.data);

  const result = await confirmRideUsecase({ customer_id, origin, destination, distance, duration, driver, value });
  sendResponse(res, result.code, result.data);
};

export const getRidesByCustomerController = async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  const validationError = validateGetRidesByCustomerValidator(customer_id, driver_id as string);
  if (validationError) return sendResponse(res, validationError.code, validationError.data);

  const rides = await getRidesByCustomerUsecase(customer_id, driver_id ? Number(driver_id) : undefined);
  sendResponse(res, rides.code, rides.data);
}