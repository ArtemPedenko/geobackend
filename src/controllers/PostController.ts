import { Request, Response } from "express";
import PostService from "../services/PostService";
import {decodeToken} from "../utils/jwt";

const service = new PostService();

class PostController {
  async getAll(req: Request, res: Response) {
    const result = await service.getAll();
    return res.json(result);
  }

  async getOne(req: Request, res: Response) {
    const results = await service.getOne(+req.params.id);
    return res.send(results);
  }

  async create(req: Request, res: Response) {
    const decodedToken = decodeToken(req.headers.cookie);
    const results = await service.create(req.body, decodedToken.login);
    return res.send(results);
  }

  async change(req: Request, res: Response) {
    const id = +req.params.id;
    const results = await service.change({ id: id }, req.body);
    return res.json(results);
  }

  async delete(req: Request, res: Response) {
    const id = +req.params.id;
    const result = await service.delete({ id: id });
    return res.json(result);
  }
}

export default PostController;
