import { Router } from "express";
import ImageController from "../controllers/ImageController";

const imagesRouter = Router();

const controller = new ImageController();

imagesRouter.get("/", controller.getAll);
imagesRouter.post("/", controller.upload);
imagesRouter.delete("/:id", controller.delete);

export default imagesRouter;
