import { Request, Response } from "express";
import DocService from "../services/DocService";

const service = new DocService();

interface CustomRequest extends Request {
  files?: any;
}

class DocController {
  async getAllPdfs(req: Request, res: Response) {
    try {
      const result = await service.getAll();
      res.json(result);
    } catch (e) {
      res.json({ sucess: false, message: e.message });
    }
  }

  async uploadPdf(req: CustomRequest, res: Response) {
    try {
      const result = await service.upload(req.files.file);
      return res.send({ sucess: true, message: result });
    } catch (e) {
      res.json({ sucess: true, message: e.message });
    }
  }

  async deletePdf(req: Request, res: Response) {
    try {
      //find post with same id
      const id = +req.params.id;
      const result = await service.delete({ id: id });
      res.json(result);
    } catch (e) {
      res.json({ sucess: true, message: e.message });
    }
  }
}

export default DocController;
