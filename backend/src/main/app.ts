import express from "express";
import { configureExpress } from "../config/express.config";

const app = express();

configureExpress(app);

export default app;