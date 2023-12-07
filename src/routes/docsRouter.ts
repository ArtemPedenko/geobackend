import { Router } from "express";
import DocController from "../controllers/DocController";

const docsRouter = Router();

const controller = new DocController();

docsRouter.get("/", controller.getAllPdfs);
docsRouter.post("/", controller.uploadPdf);
docsRouter.delete("/:id", controller.deletePdf);

export default docsRouter;
