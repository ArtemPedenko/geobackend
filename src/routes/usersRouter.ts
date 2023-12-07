import { Router } from "express";
import UserController from "../controllers/User.Controller";

const usersRouter = Router();

const controller = new UserController();

usersRouter.post("/", controller.login);

export default usersRouter;
