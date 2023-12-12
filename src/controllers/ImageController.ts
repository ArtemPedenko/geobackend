import { NextFunction, Request, Response } from "express";
import ImageService from "../services/ImageService";

const service = new ImageService();

interface CustomRequest extends Request {
  files?: any;
}

class ImageController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getAll();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async upload(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userLogin: string = req.headers.user as string;
      const result = await service.upload(req.files.file, userLogin);
      return res.send(result);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const result = await service.delete({ id: id });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default ImageController;
