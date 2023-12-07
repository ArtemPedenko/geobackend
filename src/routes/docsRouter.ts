import { Router } from "express";
import DocController from "../controllers/DocController";

const pdfsRouter = Router();

const controller = new DocController();

pdfsRouter.get("/", controller.getAllPdfs);
pdfsRouter.post("/", controller.uploadPdf);
pdfsRouter.delete("/:id", controller.deletePdf);

export default pdfsRouter;
