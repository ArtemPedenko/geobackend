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
		const image = myDataSource.getRepository(Image).create(imageObject);
		const results = await myDataSource.getRepository(Image).save(image);
		return results;
	}

	async deleteImage(id: FindOptionsWhere<Image>) {
		//find image with same id
		const image = await myDataSource.getRepository(Image).findOneBy(id);
		if (!image) {
			return { sucess: false, message: "Картинка не найдена" };
		}
		//delete image
		const fileName = image.name;
		const filePath = path.resolve("public/images", fileName);
		fs.unlink(filePath, (error) => {
			if (error) {
				return error;
			}
		});
		const results = await myDataSource.getRepository(Image).delete(id);
		return results;
	}
}

export default ImageService;
