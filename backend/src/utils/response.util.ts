import { Response } from "express";

export const sendResponse = (res: Response, statusCode: number, error: any) => {
  res.status(statusCode).json(error);
};
