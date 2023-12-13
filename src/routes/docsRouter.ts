import { Router } from "express";
import DocController from "../controllers/DocController";
import handler from "../middlewares/handler";

const docsRouter = Router();

const controller = new DocController();

docsRouter.get("/", handler(controller.getAll));
docsRouter.post("/", handler(controller.upload));
docsRouter.delete("/:id", handler(controller.delete));

export default docsRouter;
