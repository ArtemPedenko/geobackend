import { Router } from "express";
import DocController from "../controllers/DocController";

const docsRouter = Router();

const controller = new DocController();

docsRouter.get("/", controller.getAll);
docsRouter.post("/", controller.upload);
docsRouter.delete("/:id", controller.delete);

export default docsRouter;
