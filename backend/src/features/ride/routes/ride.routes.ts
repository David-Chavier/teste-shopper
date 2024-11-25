import { Router } from "express";
import { confirmRideController, estimateController, getRidesByCustomerController } from "../controllers/ride.controller";

export const rideRoutes = () => {
  const router = Router();

  router.post('/estimate', estimateController);
  router.patch('/confirm', confirmRideController);
  router.get('/:customer_id', getRidesByCustomerController)

  return router;
};