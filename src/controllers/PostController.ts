import { Request, Response } from "express";
import PostService from "../services/PostService";

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
    const userLogin: string = req.headers.user as string;
    const results = await service.create(req.body, userLogin);
    return res.send(results);
  }

  async change(req: Request, res: Response) {
    const id = +req.params.id;
    const results = await service.change({ id: id }, req.body);
    return res.json(results);
  }

  async delete(req: Request, res: Response) {
    //find post with same id
    const id = +req.params.id;
    const result = await service.delete({ id: id });
    return res.json(result);
  }
}

export default PostController;
