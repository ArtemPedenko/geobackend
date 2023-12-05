import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import myDataSource from "../app-data-source";
import Image from "../entity/images.entity";

class ImageService {
	async getAllImages() {
		const result = await myDataSource.getRepository(Image).find();
		return result;
	}

	async uploadImage(payload: any) {
		/* const post = myDataSource.getRepository(Post).create(payload);
		const results = await myDataSource.getRepository(Post).save(post);
		return results; */
	}

	/* 
	async deleteImage(id: FindOptionsWhere<Post>) {
		//find post with same id
		const post = await myDataSource.getRepository(Post).findOneBy(id);
		if (!post) {
			return { sucess: false, message: "Пост не найден" };
		}
		//delete post
		const results = await myDataSource.getRepository(Post).delete(id);
		return results;
	} */
}

export default ImageService;
