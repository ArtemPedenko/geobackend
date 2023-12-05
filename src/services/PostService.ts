import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import myDataSource from "../app-data-source";
import Post from "../entity/post.entity";
import { DeepPartial } from "typeorm";

class PostService {
	async getAllPosts() {
		const result = await myDataSource.getRepository(Post).find();
		return result;
	}

	async getOnePost(id: number) {
		const results = await myDataSource.getRepository(Post).findOneBy({
			id: id,
		});
		return results;
	}

	async createPost(payload: Post) {
		const post = myDataSource.getRepository(Post).create(payload);
		const results = await myDataSource.getRepository(Post).save(post);
		return results;
	}

	async changePost(id: FindOptionsWhere<Post>, payload: DeepPartial<Post>) {
		//find post with same id
		const post = await myDataSource.getRepository(Post).findOneBy(id);
		if (!post) {
			return { sucess: false, message: "Пост не найден" };
		}
		//merge it with request
		myDataSource.getRepository(Post).merge(post, payload);
		//save changed post
		const results = await myDataSource.getRepository(Post).save(post);
		return results;
	}

	async deletePost(id: FindOptionsWhere<Post>) {
		//find post with same id
		const post = await myDataSource.getRepository(Post).findOneBy(id);
		if (!post) {
			return { sucess: false, message: "Пост не найден" };
		}
		//delete post
		const results = await myDataSource.getRepository(Post).delete(id);
		return results;
	}
}

export default PostService;
