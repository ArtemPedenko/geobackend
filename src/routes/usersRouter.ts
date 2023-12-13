import { Router } from "express";
import UserController from "../controllers/User.Controller";
import handler from "../middlewares/handler";

const usersRouter = Router();

const controller = new UserController();

usersRouter.post("/login", handler(controller.login));
usersRouter.post("/refresh-token", handler(controller.newAccessToken));

export default usersRouter;
