import { Router } from "express";
import { confirmRide, estimate, getRidesByCustomer } from "../controllers/ride.controller";

export const rideRoutes = () => {
  const router = Router();

  router.post('/estimate', estimate);
  router.patch('/confirm', confirmRide);
  router.get('/:customer_id', getRidesByCustomer)

  return router;
};