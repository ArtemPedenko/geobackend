import { Request, Response, NextFunction } from "express";

export default function handler(
  action: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response<any, Record<string, any>>>,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await action(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
