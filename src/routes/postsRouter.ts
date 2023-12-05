import { Router } from "express";
import PostController from "../controllers/PostController";

const router = Router();

const controller = new PostController();

router.get("/posts", controller.getAllPosts);
router.get("/posts/:id", controller.getOnePost);
router.post("/posts", controller.createPost);
router.put("/posts/:id", controller.changePost);
router.delete("/posts/:id", controller.deletePost);

export default router;

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
