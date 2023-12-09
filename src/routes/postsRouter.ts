import { Router } from "express";
import PostController from "../controllers/PostController";
import { authenticate } from "../middlewares/authMiddleware";

const postsRouter = Router();

const controller = new PostController();
//pattern comander
postsRouter.get("/", authenticate, controller.getAllPosts);
postsRouter.get("/:id", controller.getOnePost);
postsRouter.post("/", controller.createPost);
postsRouter.put("/:id", controller.changePost);
postsRouter.delete("/:id", controller.deletePost);

export default postsRouter;

//routes for posts
//router.get("/posts/:table", PostController.getAllPosts);
//router.get("/posts/:table/:id", PostController.getPost);
//router.post("/posts/:table", PostController.createPost);
//router.put("/posts/:table/:id", PostController.updatePost);
//router.delete("/posts/:table/:id", PostController.deletePost);

//routes for files
//tables: post videos images pdfs
//router.post("/files/:table", FileController.addFile);
//router.get("/files/:table", FileController.getAllFiles);
//router.delete("/files/:table/:name", FileController.deleteFile);

//router.get("/alo", UserController.alo);
//router.post("/login", UserController.login);
