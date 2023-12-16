import { Router } from "express";
import DocController from "../controllers/DocController";
import handler from "../middlewares/handler";
import { auth } from "../middlewares/authMiddleware";

const docsRouter = Router();

const controller = new DocController();

docsRouter.get("/", auth, handler(controller.getAll));
docsRouter.post("/", auth, handler(controller.upload));
docsRouter.delete("/:id", auth, handler(controller.delete));

export default docsRouter;
