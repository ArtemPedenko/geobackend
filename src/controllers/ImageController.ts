import { Request, Response } from "express";
import ImageService from "../services/ImageService";
import {decodeToken} from "../utils/jwt";

const service = new ImageService();

interface CustomRequest extends Request {
  files?: any;
}

class ImageController {
  async getAll(req: Request, res: Response) {
    console.log('image controller get all');
    const result = await service.getAll();
    return res.json(result);
  }

  async upload(req: CustomRequest, res: Response) {
   const decodedToken = decodeToken(req.headers.cookie);
    const result = await service.upload(req.files.file, req.body.alt,  decodedToken.login);
    return res.send(result);
  }

  async delete(req: Request, res: Response) {
    const id = +req.params.id;
    const result = await service.delete({ id: id });
    return res.json(result);
  }
}

export default ImageController;
