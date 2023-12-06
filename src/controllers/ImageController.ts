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
			console.log(result);
			res.json(result);
		} catch (e) {
			res.json({ sucess: false, message: e.message });
		}
	}

	async uploadImage(req: CustomRequest, res: Response) {
		try {
			const result = await service.uploadImage(req.files.file);
			return res.send({ sucess: true, message: result });
		} catch (e) {
			res.json({ sucess: true, message: e.message });
		}
	}

	async deleteImage(req: Request, res: Response) {
		try {
			//find post with same id
			const id = +req.params.id;
			const result = await service.deleteImage({ id: id });
			res.json(result);
		} catch (e) {
			res.json({ sucess: true, message: e.message });
		}
	}
}
export default ImageController;
