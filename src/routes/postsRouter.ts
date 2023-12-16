import { Router } from "express";
import PostController from "../controllers/PostController";
import { auth } from "../middlewares/authMiddleware";
import handler from "../middlewares/handler";

const postsRouter = Router();

const controller = new PostController();
postsRouter.get("/", handler(controller.getAll));
postsRouter.get("/:id", handler(controller.getOne));
postsRouter.post("/", auth, handler(controller.create));
postsRouter.put("/:id", auth, handler(controller.change));
postsRouter.delete("/:id", auth, handler(controller.delete));

export default postsRouter;
