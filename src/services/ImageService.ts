import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import myDataSource from "../app-data-source";
import Image from "../entity/images.entity";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as fs from "fs";
import { DeepPartial } from "typeorm/common/DeepPartial";

class ImageService {
	async getAllImages() {
		const result = await myDataSource.getRepository(Image).find();
		return result;
	}

	async uploadImage(file: { mv: (arg0: string) => void }) {
		const fileName = uuidv4() + ".png";
		const filePath = path.resolve("public/images", fileName);
		file.mv(filePath);
		const imageObject: DeepPartial<Image> = {
			name: fileName,
		};
		const post = myDataSource.getRepository(Image).create(imageObject);
		const results = await myDataSource.getRepository(Image).save(post);
		return results;
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
