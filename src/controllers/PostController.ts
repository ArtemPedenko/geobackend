import myDataSource from "../app-data-source";
import Post from "../entity/post.entity";
import { Request, Response } from "express";

class PostController {
	async getAllPosts(req: Request, res: Response) {
		try {
			const users = await myDataSource.getRepository(Post).find();
			res.json(users);
		} catch (e) {
			res.json(e.message);
		}
	}
}
export default new PostController();

/* 
router.post("/posts", async function (req: Request, res: Response) {
	const user = await myDataSource.getRepository(Post).create(req.body);
	const results = await myDataSource.getRepository(Post).save(user);
	return res.send(results);
}); 
*/
