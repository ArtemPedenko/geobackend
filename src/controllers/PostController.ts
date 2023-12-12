import { Request, Response, NextFunction } from "express";
import PostService from "../services/PostService";

const service = new PostService();

class PostController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getAll();
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await service.getOne(+req.params.id);
      return res.send(results);
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userLogin: string = req.headers.user as string;
      const results = await service.create(req.body, userLogin);
      return res.send(results);
    } catch (e) {
      next(e);
    }
  }

  async change(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const results = await service.change({ id: id }, req.body);
      res.json(results);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      //find post with same id
      const id = +req.params.id;
      const result = await service.delete({ id: id });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default PostController;
