import myDataSource from "../app-data-source";
import { Request, Response } from "express";
import Image from "../entity/images.entity";

class PostController {
	async getAllPosts(req: Request, res: Response) {
		try {
			const posts = await myDataSource.getRepository(Image).find();
			res.json(posts);
		} catch (e) {
			res.json({ sucess: true, message: e.message });
		}
	}

	async createPost(req: Request, res: Response) {
		try {
			const post = await myDataSource.getRepository(Image).create(req.body);
			const results = await myDataSource.getRepository(Image).save(post);
			return res.send({ sucess: true, message: results });
		} catch (e) {
			res.json({ sucess: true, message: e.message });
		}
	}

	async deletePost(req: Request, res: Response) {
		try {
			//find post with same id
			const post = await myDataSource.getRepository(Image).findOneBy({
				id: +req.params.id,
			});
			if (!post) {
				return res
					.status(404)
					.json({ sucess: false, message: "Пост не найден" });
			}
			const results = await myDataSource
				.getRepository(Image)
				.delete(req.params.id);
			return res.send({ sucess: true, message: results });
		} catch (e) {
			res.json({ sucess: true, message: e.message });
		}
	}
}
export default PostController;
