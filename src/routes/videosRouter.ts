import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import handler from "../middlewares/handler";
import VideoController from "../controllers/VideoController";

const videosRouter = Router();

const controller = new VideoController();

videosRouter.get("/", handler(controller.getAll));
videosRouter.get("/:id", handler(controller.getOne));
videosRouter.post("/", auth, handler(controller.create));
videosRouter.put("/:id", auth, handler(controller.change));
videosRouter.delete("/:id", auth, handler(controller.delete));

export default videosRouter;
