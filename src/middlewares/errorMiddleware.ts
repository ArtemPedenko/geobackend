import { Request, Response } from "express";
import ApiError from "../exceptions/apiError";

export const errorMiddleware = (
  err,
  req: Request,
  res: Response,
  next: () => void,
) => {
  console.error(typeof err);
  if (err instanceof ApiError) {
    console.log("here");
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  console.log("there");
  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
