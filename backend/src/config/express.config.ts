import express, { Express } from "express";
import { rideRoutes } from "../features/ride/routes/ride.routes";
// import cors from "cors";

export const configureExpress = (app: Express): void => {
//   app.use(cors());
  app.use(express.json());

  app.use('/ride', rideRoutes());
};
