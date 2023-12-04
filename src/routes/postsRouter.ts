import { Router } from "express";
import PostController from "../controllers/PostController";

const router = Router();

router.get("/posts", PostController.getAllPosts);
router.post("/posts", PostController.createPost);

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

// register routes
/* router.get("/users", async function (req: Request, res: Response) {
	const users = await myDataSource.getRepository(User).find();
	res.json(users);
});

router.get("/users/:id", async function (req: Request, res: Response) {
	const results = await myDataSource.getRepository(User).findOneBy({
		id: +req.params.id,
	});
	return res.send(results);
});

router.post("/users", async function (req: Request, res: Response) {
	const user = await myDataSource.getRepository(User).create(req.body);
	const results = await myDataSource.getRepository(User).save(user);
	return res.send(results);
});


router.put("/users/:id", async function (req: Request, res: Response) {
	const user = await myDataSource.getRepository(User).findOneBy({
		id: +req.params.id,
	});
	myDataSource.getRepository(User).merge(user, req.body);
	const results = await myDataSource.getRepository(User).save(user);
	return res.send(results);
});

router.delete("/users/:id", async function (req: Request, res: Response) {
	const results = await myDataSource.getRepository(User).delete(req.params.id);
	return res.send(results);
}); */
