import { Router } from "express";
import PostController from "../controllers/PostController";
import { authenticate } from "../middlewares/authMiddleware";

const postsRouter = Router();

const controller = new PostController();
//pattern comander
//postsRouter.get("/", authenticate, controller.getAllPosts);
postsRouter.get("/", controller.getAll);
postsRouter.get("/:id", controller.getOne);
postsRouter.post("/", controller.create);
postsRouter.put("/:id", controller.change);
postsRouter.delete("/:id", controller.delete);

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
