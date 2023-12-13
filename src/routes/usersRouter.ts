import { Router } from "express";
import UserController from "../controllers/User.Controller";

const usersRouter = Router();

const controller = new UserController();

usersRouter.post("/login", controller.login);
usersRouter.post("/refresh-token", controller.newAccessToken);

export default usersRouter;
