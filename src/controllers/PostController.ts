import myDataSource from "../app-data-source";
import Post from "../entity/post.entity";
import { Request, Response } from "express";

class PostController {
	async getAllPosts(req: Request, res: Response) {
		try {
			const posts = await myDataSource.getRepository(Post).find();
			res.json(posts);
		} catch (e) {
			res.json({ sucess: true, message: e.message });
		}
	}

	async createPost(req: Request, res: Response) {
		try {
			const post = await myDataSource.getRepository(Post).create(req.body);
			const results = await myDataSource.getRepository(Post).save(post);
			return res.send({ sucess: true, message: results });
		} catch (e) {
			res.json({ sucess: true, message: e.message });
		}
	}

	async changePost(req: Request, res: Response) {
		try {
			//find post with same id
			const post = await myDataSource.getRepository(Post).findOneBy({
				id: +req.params.id,
			});
			if (!post) {
				return res
					.status(404)
					.json({ sucess: false, message: "Пост не найден" });
			}
			//merge it with request
			myDataSource.getRepository(Post).merge(post, req.body);
			//save changed post
			const results = await myDataSource.getRepository(Post).save(post);
			return res.send({ sucess: true, message: results });
		} catch (e) {
			res.json({ sucess: true, message: e.message });
		}
	}

	async deletePost(req: Request, res: Response) {
		try {
			//find post with same id
			const post = await myDataSource.getRepository(Post).findOneBy({
				id: +req.params.id,
			});
			if (!post) {
				return res
					.status(404)
					.json({ sucess: false, message: "Пост не найден" });
			}
			const results = await myDataSource
				.getRepository(Post)
				.delete(req.params.id);
			return res.send({ sucess: true, message: results });
		} catch (e) {
			res.json({ sucess: true, message: e.message });
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
