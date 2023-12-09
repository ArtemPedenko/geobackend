import { Request, Response } from "express";
import DocService from "../services/DocService";

const service = new DocService();

interface CustomRequest extends Request {
  files?: any;
}

class DocController {
  async getAll(req: Request, res: Response) {
    try {
      const result = await service.getAll();
      res.json(result);
    } catch (e) {
      res.json(e.message);
    }
  }

  async upload(req: CustomRequest, res: Response) {
    try {
      const result = await service.upload(req.files.file);
      return res.send(result);
    } catch (e) {
      res.json(e.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = +req.params.id;
      const result = await service.delete({ id: id });
      res.send(result);
    } catch (e) {
      res.status(404).json(e.message);
    }
  }
}

export default DocController;
