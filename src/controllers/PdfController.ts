import { Request, Response } from "express";
import PdfService from "../services/PdfService";

const service = new PdfService();

interface CustomRequest extends Request {
	files?: any;
}

class PdfController {
	async getAllPdfs(req: Request, res: Response) {
		try {
			const result = await service.getAllPdfs();
			res.json(result);
		} catch (e) {
			res.json({ sucess: false, message: e.message });
		}
	}

	async uploadPdf(req: CustomRequest, res: Response) {
		try {
			const result = await service.uploadPdf(req.files.file);
			return res.send({ sucess: true, message: result });
		} catch (e) {
			res.json({ sucess: true, message: e.message });
		}
	}

	async deletePdf(req: Request, res: Response) {
		try {
			//find post with same id
			const id = +req.params.id;
			const result = await service.deletePdf({ id: id });
			res.json(result);
		} catch (e) {
			res.json({ sucess: true, message: e.message });
		}
	}
}
export default PdfController;
