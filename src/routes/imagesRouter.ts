import { Router } from "express";
import ImageController from "../controllers/ImageController";

const imagesRouter = Router();

const controller = new ImageController();

imagesRouter.get("/", controller.getAllImgaes);
//postsRouter.get("/posts/:id", controller.getOnePost);
imagesRouter.post("/", controller.uploadImage);
//postsRouter.put("/posts/:id", controller.changePost);
//postsRouter.delete("/posts/:id", controller.deletePost);

export default imagesRouter;
