import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";

const service = new UserService();

class UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { login, password } = req.body;
    try {
      const userData = await service.login(login, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async newAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.headers.cookie.replace("refreshToken=", "");
      const login = req.body.login;
      const userData = await service.newAccessToken(login, refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
