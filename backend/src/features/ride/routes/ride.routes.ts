import { Router } from "express";
import { estimate, getRides } from "../../travelController";

export const rideRoutes = () => {
  const router = Router();

  router.post('/estimate', estimate);
  router.patch('/confirm', estimate);
  router.get('/:customer_id', getRides)

  return router;
};