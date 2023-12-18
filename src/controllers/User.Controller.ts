import { Request, Response } from "express";
import UserService from "../services/UserService";

const service = new UserService();

class UserController {
  async login(req: Request, res: Response) {
    const { login, password } = req.body;
    const userData = await service.login(login, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  }

  async newAccessToken(req: Request, res: Response) {
    console.log(req.headers.cookie)
    const refreshToken = req.headers.cookie.replace("refreshToken=", "");
    console.log(refreshToken)
    const login = req.body.login;
    console.log(login)
    const userData = await service.newAccessToken(login, refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  }
}

export default UserController;
