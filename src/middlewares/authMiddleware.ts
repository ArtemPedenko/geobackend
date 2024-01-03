import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response } from "express";

interface CustomRequest extends Request {
  user?: any;
}

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

export const auth = (req: CustomRequest, res: Response, next: () => void) => {
  //const token = req.headers.authorization;
  const accessToken = req.headers.cookie.split(';');
  console.log(req.headers.cookie)
  const token = accessToken.filter((word => word.indexOf('accessToken')> -1))[0].split('=')[1]

  console.log(token)

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
};
