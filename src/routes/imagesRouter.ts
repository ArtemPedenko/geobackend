import { Router } from "express";
import ImageController from "../controllers/ImageController";

const imagesRouter = Router();

const controller = new ImageController();

imagesRouter.get("/", controller.getAllImgaes);
imagesRouter.post("/", controller.uploadImage);
imagesRouter.delete("/:id", controller.deleteImage);

export default imagesRouter;
