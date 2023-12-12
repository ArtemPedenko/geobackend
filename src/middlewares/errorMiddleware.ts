import { Request, Response, NextFunction } from "express";
import ApiError from "../exceptions/apiError";
import logger from "../logger/logger";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ error: err.message, errors: err.errors });
  }

  // Если это не ApiError, обрабатываем как обычную ошибку сервера (например, 500 Internal Server Error)
  console.error(err);
  return res.status(500).json({ error: "Internal Server Error" });
};
