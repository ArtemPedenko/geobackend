import { Request, Response } from "express";
import ImageService from "../services/ImageService";

const service = new ImageService();

interface CustomRequest extends Request {
  files?: any;
}

class ImageController {
  async getAll(req: Request, res: Response) {
    const result = await service.getAll();
    return res.json(result);
  }

  async upload(req: CustomRequest, res: Response) {
    const userLogin: string = req.headers.user as string;
    const result = await service.upload(req.files.file, userLogin);
    return res.send(result);
  }

  async delete(req: Request, res: Response) {
    const id = +req.params.id;
    const result = await service.delete({ id: id });
    return res.json(result);
  }
}

export default ImageController;
