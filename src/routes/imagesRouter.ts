import { Router } from "express";
import ImageController from "../controllers/ImageController";
import handler from "../middlewares/handler";

const imagesRouter = Router();

const controller = new ImageController();

imagesRouter.get("/", handler(controller.getAll));
imagesRouter.post("/", handler(controller.upload));
imagesRouter.delete("/:id", handler(controller.delete));

export default imagesRouter;
