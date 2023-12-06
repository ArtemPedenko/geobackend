import { Router } from "express";
import PdfController from "../controllers/PdfController";

const pdfsRouter = Router();

const controller = new PdfController();

pdfsRouter.get("/", controller.getAllPdfs);
pdfsRouter.post("/", controller.uploadPdf);
pdfsRouter.delete("/:id", controller.deletePdf);

export default pdfsRouter;
