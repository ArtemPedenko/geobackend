import { Request, Response } from "express";
import PostService from "../services/PostService";

const service = new PostService();

class PostController {
  async getAll(req: Request, res: Response) {
    try {
      const result = await service.getAll();
      return res.json(result);
    } catch (e) {
      res.json(e.message);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const results = await service.getOne(+req.params.id);
      return res.send(results);
    } catch (e) {
      res.json(e.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const results = await service.create(req.body);
      return res.send(results);
    } catch (e) {
      res.json(e.message);
    }
  }

  async change(req: Request, res: Response) {
    try {
      const id = +req.params.id;
      const results = await service.change({ id: id }, req.body);
      res.json(results);
    } catch (e) {
      res.json(e.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      //find post with same id
      const id = +req.params.id;
      const result = await service.delete({ id: id });
      res.json(result);
    } catch (e) {
      res.json(e.message);
    }
  }
}

export default PostController;
