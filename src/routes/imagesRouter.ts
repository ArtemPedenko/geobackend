import { Router } from "express";
import ImageController from "../controllers/ImageController";
import handler from "../middlewares/handler";
import { auth } from "../middlewares/authMiddleware";

const imagesRouter = Router();

const controller = new ImageController();

imagesRouter.get("/", auth, handler(controller.getAll));
imagesRouter.post("/", auth, handler(controller.upload));
imagesRouter.delete("/:id", auth, handler(controller.delete));

export default imagesRouter;
