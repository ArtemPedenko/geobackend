import myDataSource from "../app-data-source";
import { Request, Response } from "express";
import Image from "../entity/images.entity";
import ImageService from "../services/ImageService";

const service = new ImageService();

interface CustomRequest extends Request {
	files?: any;
}

class ImageController {
	async getAllImgaes(req: Request, res: Response) {
		try {
			const result = await service.getAllImages();
			return { sucess: true, message: result };
		} catch (e) {
			res.json({ sucess: true, message: e.message });
		}
	}

	async uploadImage(req: any, res: Response) {
		try {
			console.log(req.files);
			const result = await service.uploadImage(req.files);
			return res.send({ sucess: true, message: result });
		} catch (e) {
			res.json({ sucess: true, message: e.message });
		}
	}

	async deleteImage(req: Request, res: Response) {
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
export default ImageController;
